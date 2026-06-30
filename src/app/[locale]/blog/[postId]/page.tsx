import { permanentRedirect } from "next/navigation";
import fs from "fs";
import path from "path";
import { fetchBlogPostSeo } from "@/features/blog/blogSeoService";
import {
  extractAndTransformFaqs,
  buildFaqJsonLd,
  type FaqPair,
} from "@/features/blog/faqTransform";
import BlogPostDetailClient from "./components/BlogPostDetailClient";

type PageProps = {
  params: Promise<{ locale: string; postId: string }>;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

async function loadMarkdownFaqs(slug: string, locale: string): Promise<FaqPair[]> {
  if (!/^[a-z0-9-]+$/i.test(slug)) return [];
  const postDir = path.join(BLOG_DIR, slug);
  const metaPath = path.join(postDir, "meta.json");
  if (!fs.existsSync(metaPath)) return [];

  const localeFile = path.join(postDir, `${locale}.md`);
  const fallbackFile = path.join(postDir, "es.md");
  const contentFile = fs.existsSync(localeFile) ? localeFile : fallbackFile;
  if (!fs.existsSync(contentFile)) return [];

  try {
    const md = fs.readFileSync(contentFile, "utf-8");
    const { marked } = await import("marked");
    const html = String(await marked(md));
    const { faqs } = extractAndTransformFaqs(html);
    return faqs;
  } catch {
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const { locale, postId } = await params;

  if (/^\d+$/.test(postId)) {
    const post = await fetchBlogPostSeo(postId, locale);
    if (post?.legacyPath) permanentRedirect(post.legacyPath);
  }

  const faqs = !/^\d+$/.test(postId)
    ? await loadMarkdownFaqs(postId, locale)
    : [];

  return (
    <>
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildFaqJsonLd(faqs)),
          }}
        />
      )}
      <BlogPostDetailClient />
    </>
  );
}
