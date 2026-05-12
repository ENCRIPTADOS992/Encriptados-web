"use client";
import React from "react";
import { useLocale } from "next-intl";
import useSWR from "swr";
import BannerBlog from "./BannerBlog";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import ListOfPosts from "./ListOfPosts";
import { fetchAllBlogCards } from "@/features/blog/blogService";
import type { BlogPostCard } from "@/features/blog/types";

const BlogPage = () => {
  const locale = useLocale();

  const { data: posts, isLoading } = useSWR<BlogPostCard[]>(
    `blog-cards-${locale}`,
    () => fetchAllBlogCards(locale),
    {
      revalidateOnFocus: false,
      dedupingInterval: 600_000,
      keepPreviousData: true,
    },
  );

  return (
    <>
      <BasicFormProvider defaultValue={{ category: "tech" }}>
        <BannerBlog />
        <ListOfPosts posts={posts ?? []} loading={isLoading} />
      </BasicFormProvider>
    </>
  );
};

export default BlogPage;
