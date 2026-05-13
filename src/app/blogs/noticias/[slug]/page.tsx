"use client";

import React from "react";
import useSWR from "swr";
import PostIdPage from "@/app/[locale]/blog/[postId]/components/PostIdPage";
import { fetchAllBlogCards } from "@/features/blog/blogService";
import type { BlogPostCard } from "@/features/blog/types";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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
      </div>
    </div>
  );
}

export default function Page({ params }: PageProps) {
  const { slug } = React.use(params);
  const { data: posts } = useSWR<BlogPostCard[]>(
    "blog-cards-es",
    () => fetchAllBlogCards("es"),
    {
      revalidateOnFocus: false,
      dedupingInterval: 600_000,
      keepPreviousData: true,
    },
  );

  if (!posts) return <DetailSkeleton />;

  return <PostIdPage allPosts={posts} currentPostSlug={slug} />;
}