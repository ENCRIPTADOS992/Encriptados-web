import type { Metadata } from "next";
import JsonLd from "@/shared/components/JsonLd/JsonLd";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/shared/components/JsonLd/articleJsonLd";
import { fetchBlogPostSeo } from "@/features/blog/blogSeoService";
import { buildSeoMetadata } from "@/shared/seo/metadata";
import { buildAbsoluteUrl } from "@/shared/seo/url";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string; category: string; slug: string }>;
};

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const post = await fetchBlogPostSeo(slug, locale);
  const fallbackPath = `/${locale}/blogs/${category}/${slug}`;

  if (!post) {
    return buildSeoMetadata({
      title: "Encriptados Blog",
      description: "Articles from Encriptados about privacy, encrypted communication and digital security.",
      canonicalPath: fallbackPath,
      locale,
    });
  }

  // Build hreflang alternates from Polylang translations
  let languages: Record<string, string> | undefined;
  if (post.translations && Object.keys(post.translations).length > 1) {
    languages = {};
    for (const [lang, ref] of Object.entries(post.translations)) {
      languages[lang] = buildAbsoluteUrl(`/${lang}/blog/${ref.slug}`);
    }
    languages["x-default"] = languages.es ?? buildAbsoluteUrl(fallbackPath);
  }

  const rm = post.rankMath;
  const title = rm?.title || post.title;
  const description = rm?.description || post.description;
  const imageUrl = rm?.openGraph.image || post.imageFull || post.image;

  return buildSeoMetadata({
    title,
    description,
    canonicalPath: rm?.canonicalPath || post.legacyPath || fallbackPath,
    locale,
    image: {
      url: imageUrl,
      alt: title,
    },
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date,
    authors: [post.author],
    keywords: rm?.focusKeyword
      ? [rm.focusKeyword, "digital security", "Encriptados"]
      : ["digital security", "privacy", "encrypted communication", "Encriptados"],
    languages,
    openGraph: rm
      ? {
          title: rm.openGraph.title,
          description: rm.openGraph.description,
          image: rm.openGraph.image ? { url: rm.openGraph.image, alt: title } : undefined,
        }
      : undefined,
    twitter: rm
      ? {
          title: rm.twitter.title,
          description: rm.twitter.description,
          image: rm.twitter.image,
          card: rm.twitter.card === "summary" ? "summary" : "summary_large_image",
        }
      : undefined,
  });
}

export default async function LocalizedBlogPostLayout({ children, params }: LayoutProps) {
  const { locale, category, slug } = await params;
  const post = await fetchBlogPostSeo(slug, locale);

  if (!post) return <>{children}</>;

  const canonicalPath = post.legacyPath ?? `/${locale}/blogs/${category}/${slug}`;
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