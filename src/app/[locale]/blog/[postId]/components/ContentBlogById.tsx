"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import SectionWrapper from "@/shared/components/SectionWrapper";
import { fetchBlogPost } from "@/features/blog/blogService";
import type { BlogPost } from "@/features/blog/types";

const ContentBlogById = () => {
  const params = useParams();
  const locale = useLocale();
  const postId = params?.postId as string | undefined;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    setLoading(true);
    fetchBlogPost(postId, locale)
      .then((found) => {
        if (!found) throw new Error("Artículo no encontrado");
        setPost(found);
        setFetchError(null);
      })
      .catch((err) => {
        setFetchError(err.message || "Error inesperado");
        setPost(null);
      })
      .finally(() => setLoading(false));
  }, [postId, locale]);

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto bg-[#191919] rounded-2xl shadow-lg mt-8 p-6 md:p-8 lg:p-12 animate-pulse">
        <div className="w-full aspect-[1199/629] rounded-2xl bg-gray-700 mb-8" />
        <div className="h-8 bg-gray-700 rounded w-3/4 mb-6" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-2/3" />
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-4/5" />
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="w-full flex justify-center items-center py-24">
        <span className="text-red-400">{fetchError}</span>
      </div>
    );
  }

  if (!post) {
    console.log("No se encontró el post para mostrar.");
    return null;
  }

  return (
    <SectionWrapper className="w-full max-w-5xl mx-auto bg-[#191919] rounded-2xl shadow-lg mt-8 p-6 md:p-8 lg:p-12">
  <div className="relative w-full aspect-[1199/629] rounded-2xl overflow-hidden mb-8">
    <Image
      src={post.imageFull || post.image}
      alt={post.title}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 800px"
      priority
    />
  </div>

  <h2 className="text-[30px] md:text-[38px] leading-[1.3] font-bold text-white mb-6">
    {post.title}
  </h2>

  <div className="flex items-center text-gray-400 text-sm mb-8 gap-3" />

  <article
    className="prose prose-invert max-w-none text-gray-200 prose-headings:font-bold prose-h2:text-[30px] prose-h2:leading-[1.4] prose-h3:text-[24px] prose-h3:leading-[1.5] prose-p:text-base prose-p:leading-relaxed"
    dangerouslySetInnerHTML={{ __html: post.content }}
  />
</SectionWrapper>

  );
};

export default ContentBlogById;
