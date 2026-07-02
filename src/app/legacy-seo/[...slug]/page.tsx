import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegacySeoArticlePage from "../components/LegacySeoArticlePage";
import { fetchLegacySeoPage } from "@/shared/seo/legacyContent";
import { buildSeoMetadata } from "@/shared/seo/metadata";
import type { SeoLocale } from "@/shared/seo/constants";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(searchParams: Record<string, string | string[] | undefined>, key: string): string | undefined {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

function normalizeLocale(value: string | undefined): SeoLocale {
  if (value === "en" || value === "fr" || value === "it" || value === "pt") return value;
  return "es";
}

async function getPageData(params: PageProps["params"], searchParams: PageProps["searchParams"]) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const locale = normalizeLocale(getParam(sp, "legacyLocale"));
  const legacyPath = getParam(sp, "legacyPath");

  if (!legacyPath) return null;

  const pageSlug = slug.join("/");
  const page = await fetchLegacySeoPage(pageSlug, locale);

  return page ? { page, locale, legacyPath } : null;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const data = await getPageData(params, searchParams);

  if (!data) {
    return buildSeoMetadata({
      title: "Encriptados",
      canonicalPath: "/",
      locale: "es",
      robots: { index: false, follow: true },
    });
  }

  const rm = data.page.rankMath;
  const title = rm?.title || data.page.title;
  const description = rm?.description || data.page.description;
  const imageUrl = rm?.openGraph.image || data.page.image;

  return buildSeoMetadata({
    title,
    description,
    canonicalPath: rm?.canonicalPath || data.legacyPath,
    locale: data.locale,
    type: "article",
    publishedTime: data.page.date,
    modifiedTime: data.page.modified,
    authors: [data.page.author],
    image: imageUrl
      ? {
          url: imageUrl,
          alt: title,
          width: 1200,
          height: 630,
        }
      : undefined,
    keywords: rm?.focusKeyword
      ? [rm.focusKeyword, "seguridad digital", "Encriptados"]
      : [title, "seguridad digital", "comunicacion segura", "Encriptados"],
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

export default async function LegacySeoPage({ params, searchParams }: PageProps) {
  const data = await getPageData(params, searchParams);
  if (!data) notFound();

  return <LegacySeoArticlePage page={data.page} locale={data.locale} legacyPath={data.legacyPath} />;
}
