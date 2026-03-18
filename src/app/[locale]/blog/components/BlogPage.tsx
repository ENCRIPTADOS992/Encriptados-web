"use client";
import React from "react";
import { useLocale } from "next-intl";
import useSWR from "swr";
import BannerBlog from "./BannerBlog";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import ListOfPosts from "./ListOfPosts";
import {
  fetchAllBlogCards,
  fetchRemainingBlogCards,
} from "@/features/blog/blogService";
import type { BlogPostCard } from "@/features/blog/types";

const BlogPage = () => {
  const locale = useLocale();

  // First batch: 10 WP posts + all MD — loads fast
  const { data: firstBatch, isLoading } = useSWR<BlogPostCard[]>(
    `blog-cards-${locale}`,
    () => fetchAllBlogCards(locale),
    {
      revalidateOnFocus: false,
      dedupingInterval: 600_000,
      keepPreviousData: true,
    },
  );

  // Remaining WP posts — loads lazily after first batch
  const { data: remaining } = useSWR<BlogPostCard[]>(
    firstBatch ? `blog-cards-remaining-${locale}` : null,
    () => fetchRemainingBlogCards(locale),
    {
      revalidateOnFocus: false,
      dedupingInterval: 600_000,
      keepPreviousData: true,
    },
  );

  // Merge and deduplicate
  const allPosts = React.useMemo(() => {
    if (!firstBatch) return [];
    if (!remaining) return firstBatch;
    const ids = new Set(firstBatch.map((p) => p.id));
    const extra = remaining.filter((p) => !ids.has(p.id));
    const merged = [...firstBatch, ...extra];
    merged.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return merged;
  }, [firstBatch, remaining]);

  return (
    <>
      <BasicFormProvider defaultValue={{ category: "tech" }}>
        <BannerBlog />
        <ListOfPosts posts={allPosts} loading={isLoading} />
      </BasicFormProvider>
    </>
  );
};

export default BlogPage;
