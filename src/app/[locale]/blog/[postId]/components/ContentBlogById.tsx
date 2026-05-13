"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import SectionWrapper from "@/shared/components/SectionWrapper";
import { fetchBlogPost } from "@/features/blog/blogService";
import type { BlogPost } from "@/features/blog/types";
import styles from "../../components/BlogTemplate.module.css";

const ContentBlogById = () => {
  const params = useParams();
  const locale = useLocale();
  const routePostId = params?.postId ?? params?.slug;
  const postId = Array.isArray(routePostId) ? routePostId[0] : routePostId;
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
      <div className="mx-auto w-full max-w-5xl animate-pulse rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.35)] md:p-8 lg:p-10">
        <div className="mb-8 aspect-[1199/629] w-full rounded-[22px] bg-white/10" />
        <div className="mb-6 h-8 w-3/4 rounded bg-white/10" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-5/6 rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-2/3 rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-4/5 rounded bg-white/10" />
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
    <SectionWrapper className={`${styles.fadeUp} mx-auto w-full max-w-5xl rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-8 lg:p-10`}>
  <div className="group relative mb-8 aspect-[1199/629] w-full overflow-hidden rounded-[22px] bg-[#101010] shadow-[0_18px_70px_rgba(0,0,0,0.32)]">
    <Image
      src={post.imageFull || post.image}
      alt={post.title}
      fill
      className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
      sizes="(max-width: 768px) 100vw, 800px"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
  </div>

  <h2 className="mb-5 text-[30px] font-bold leading-[1.18] text-white md:text-[42px]">
    {post.title}
  </h2>

  <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-white/55">
    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-cyan-100">
      {post.author || "Equipo Encriptados"}
    </span>
    {post.date && <span>{new Date(post.date).toLocaleDateString(locale)}</span>}
  </div>

  <article
    className="prose prose-invert max-w-none text-white/78 prose-headings:font-bold prose-headings:text-white prose-h2:mt-12 prose-h2:text-[30px] prose-h2:leading-[1.25] prose-h3:text-[24px] prose-h3:leading-[1.35] prose-p:text-base prose-p:leading-8 prose-a:text-cyan-200 prose-a:no-underline hover:prose-a:text-cyan-100 prose-img:rounded-[18px] prose-img:border prose-img:border-white/10 prose-img:shadow-[0_18px_60px_rgba(0,0,0,0.28)] prose-blockquote:border-cyan-300/60 prose-blockquote:bg-white/[0.04] prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:text-white/80"
    dangerouslySetInnerHTML={{ __html: post.content }}
  />
</SectionWrapper>

  );
};

export default ContentBlogById;
