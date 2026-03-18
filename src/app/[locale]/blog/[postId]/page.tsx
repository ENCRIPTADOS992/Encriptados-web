"use client";
import React from "react";
import PostIdPage from "./components/PostIdPage";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import useSWR from "swr";
import { fetchAllBlogCards } from "@/features/blog/blogService";
import type { BlogPostCard } from "@/features/blog/types";

function DetailSkeleton() {
  return (
    <div className="w-full bg-black flex flex-col items-center py-10 md:py-16 px-4 gap-10 animate-pulse">
      <div className="w-full max-w-[1239px] flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:flex-1">
          <div className="w-full max-w-5xl mx-auto bg-[#191919] rounded-2xl p-6 md:p-8 lg:p-12">
            <div className="w-full aspect-[1199/629] rounded-2xl bg-gray-700 mb-8" />
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-6" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-5/6" />
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-2/3" />
            </div>
          </div>
        </div>
        <aside className="w-full md:w-[340px] lg:w-[380px]">
          <div className="h-6 bg-gray-700 rounded w-40 mb-8" />
          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col rounded-2xl overflow-hidden">
                <div className="w-full h-40 bg-gray-700" />
                <div className="p-4 bg-white space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

const Page = () => {
  const params = useParams();
  const locale = useLocale();
  const postId = params.postId;

  const { data: posts } = useSWR<BlogPostCard[]>(
    `blog-cards-${locale}`,
    () => fetchAllBlogCards(locale),
    {
      revalidateOnFocus: false,
      dedupingInterval: 600_000,
      keepPreviousData: true,
    },
  );

  if (!posts) return <DetailSkeleton />;

  let currentPostSlug: string = "";
  if (Array.isArray(postId)) {
    currentPostSlug = postId[0];
  } else {
    currentPostSlug = postId ?? "";
  }

  return (
    <PostIdPage
      allPosts={posts}
      currentPostSlug={currentPostSlug}
    />
  );
};

export default Page;
