import { permanentRedirect } from "next/navigation";
import { fetchBlogPostSeo } from "@/features/blog/blogSeoService";
import BlogPostDetailClient from "./components/BlogPostDetailClient";

type PageProps = {
  params: Promise<{ locale: string; postId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale, postId } = await params;

  if (/^\d+$/.test(postId)) {
    const post = await fetchBlogPostSeo(postId, locale);
    if (post?.legacyPath) permanentRedirect(post.legacyPath);
  }

  return <BlogPostDetailClient />;
}
