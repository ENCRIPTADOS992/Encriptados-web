"use client";

import React from "react";
import useSWR from "swr";
import { fetchAllBlogCards } from "@/features/blog/blogService";
import type { BlogPostCard } from "@/features/blog/types";
import PreviousPosts from "@/app/[locale]/blog/[postId]/components/PreviousPosts";

type Props = {
  locale: string;
  currentPostSlug: string;
};

export default function LegacyPreviousPostsClient({ locale, currentPostSlug }: Props) {
  const { data: posts } = useSWR<BlogPostCard[]>(
    `blog-cards-${locale}`,
    () => fetchAllBlogCards(locale),
    {
      revalidateOnFocus: false,
      dedupingInterval: 600_000,
      keepPreviousData: true,
    },
  );

  if (!posts) {
    return (
      <div className="w-full rounded-[22px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm md:p-6 animate-pulse">
        <div className="h-6 bg-white/10 rounded w-1/2 mb-6" />
        <div className="flex flex-col gap-5">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col rounded-2xl overflow-hidden">
              <div className="w-full h-40 bg-white/5" />
              <div className="p-4 bg-white/5 space-y-2">
                <div className="h-5 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <PreviousPosts posts={posts} currentPostSlug={currentPostSlug} />;
}
