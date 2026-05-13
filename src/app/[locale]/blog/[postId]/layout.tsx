import type { Metadata } from "next";
import JsonLd from "@/shared/components/JsonLd/JsonLd";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/shared/components/JsonLd/articleJsonLd";
import { fetchBlogPostSeo, fetchMarkdownBlogPostSeo } from "@/features/blog/blogSeoService";
import { buildSeoMetadata } from "@/shared/seo/metadata";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string; postId: string }>;
};

async function getPost(postId: string, locale: string) {
  return (await fetchBlogPostSeo(postId, locale)) ?? fetchMarkdownBlogPostSeo(postId, locale);
}

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale, postId } = await params;
  const post = await getPost(postId, locale);
  const canonicalPath = `/${locale}/blog/${postId}`;

  if (!post) {
    return buildSeoMetadata({
      title: "Blog Encriptados",
      description: "Articulos de Encriptados sobre privacidad, seguridad digital y comunicaciones cifradas.",
      canonicalPath,
      locale,
    });
  }
  const keywords = "keywords" in post && Array.isArray(post.keywords) ? post.keywords : undefined;

  return buildSeoMetadata({
    title: post.title,
    description: post.description,
    canonicalPath: post.legacyPath ?? canonicalPath,
    locale,
    image: {
      url: post.imageFull || post.image,
      alt: post.title,
    },
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date,
    authors: [post.author],
    keywords,
  });
}

export default async function MarkdownBlogPostLayout({ children, params }: LayoutProps) {
  const { locale, postId } = await params;
  const post = await getPost(postId, locale);

  if (!post) return <>{children}</>;

  const canonicalPath = post.legacyPath ?? `/${locale}/blog/${postId}`;
  const data = [
    buildBreadcrumbJsonLd([
      { name: "Home", path: locale === "es" ? "/" : `/${locale}` },
      { name: "Blog", path: `/${locale}/blog` },
      { name: post.title, path: canonicalPath },
    ]),
    buildArticleJsonLd({
      title: post.title,
      description: post.description,
      canonicalPath,
      image: post.imageFull || post.image,
      author: post.author,
      datePublished: post.date,
      dateModified: post.date,
    }),
  ];

  return (
    <>
      <JsonLd data={data} />
      {children}
    </>
  );
}