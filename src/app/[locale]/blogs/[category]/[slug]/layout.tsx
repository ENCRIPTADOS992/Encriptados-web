import type { Metadata } from "next";
import JsonLd from "@/shared/components/JsonLd/JsonLd";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/shared/components/JsonLd/articleJsonLd";
import { fetchBlogPostSeo } from "@/features/blog/blogSeoService";
import { buildSeoMetadata } from "@/shared/seo/metadata";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string; category: string; slug: string }>;
};

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const post = await fetchBlogPostSeo(slug, locale);
  const fallbackPath = `/${locale}/blogs/${category}/${slug}/`;

  if (!post) {
    return buildSeoMetadata({
      title: "Encriptados Blog",
      description: "Articles from Encriptados about privacy, encrypted communication and digital security.",
      canonicalPath: fallbackPath,
      locale,
    });
  }

  return buildSeoMetadata({
    title: post.title,
    description: post.description,
    canonicalPath: post.legacyPath ?? fallbackPath,
    locale,
    image: {
      url: post.imageFull || post.image,
      alt: post.title,
    },
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date,
    authors: [post.author],
    keywords: ["digital security", "privacy", "encrypted communication", "Encriptados"],
  });
}

export default async function LocalizedBlogPostLayout({ children, params }: LayoutProps) {
  const { locale, category, slug } = await params;
  const post = await fetchBlogPostSeo(slug, locale);

  if (!post) return <>{children}</>;

  const canonicalPath = post.legacyPath ?? `/${locale}/blogs/${category}/${slug}/`;
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