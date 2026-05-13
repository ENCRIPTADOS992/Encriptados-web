import type { Metadata } from "next";
import JsonLd from "@/shared/components/JsonLd/JsonLd";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/shared/components/JsonLd/articleJsonLd";
import { fetchBlogPostSeo } from "@/features/blog/blogSeoService";
import { buildSeoMetadata } from "@/shared/seo/metadata";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostSeo(slug, "es");

  if (!post) {
    return buildSeoMetadata({
      title: "Blog de seguridad digital",
      description: "Articulos de Encriptados sobre privacidad, seguridad digital y comunicaciones cifradas.",
      canonicalPath: `/blogs/noticias/${slug}/`,
      locale: "es",
    });
  }

  return buildSeoMetadata({
    title: post.title,
    description: post.description,
    canonicalPath: post.legacyPath ?? `/blogs/noticias/${slug}/`,
    locale: "es",
    image: {
      url: post.imageFull || post.image,
      alt: post.title,
    },
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date,
    authors: [post.author],
    keywords: ["seguridad digital", "privacidad", "comunicacion cifrada", "Encriptados"],
  });
}

export default async function SpanishBlogPostLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const post = await fetchBlogPostSeo(slug, "es");

  if (!post) return <>{children}</>;

  const canonicalPath = post.legacyPath ?? `/blogs/noticias/${slug}/`;
  const data = [
    buildBreadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Blog", path: "/es/blog" },
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