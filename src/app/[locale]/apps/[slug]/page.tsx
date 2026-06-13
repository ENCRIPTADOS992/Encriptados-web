import { Suspense } from "react";
import { getProductConfig, getCanonicalProductSlugs } from "./productConfig";
import ProductPageContent from "./AppClientPage";
import { getTranslations } from "next-intl/server";
import { buildSeoMetadata, buildLocalizedLanguageAlternates } from "@/shared/seo/metadata";
import { getResolvedAppProduct } from "./productData";
import { SEO_LOCALES } from "@/shared/seo/constants";

/** Allow up to 30 seconds for server-side rendering (WordPress API can be slow) */
export const maxDuration = 30;

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const firstParam = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

/** Strip HTML tags and truncate to ~155 chars for meta description */
function cleanDescription(html: string | undefined, fallback: string): string {
  if (!html) return fallback;
  const text = html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
  if (!text || text.length < 10) return fallback;
  return text.length > 155 ? text.slice(0, 152) + "..." : text;
}

export async function generateMetadata({ params, searchParams }: PageProps) {
  const { slug, locale } = await params;
  const sp = searchParams ? await searchParams : {};
  const t = await getTranslations({ locale, namespace: "appsShared.productTemplate" });
  const config = getProductConfig(slug);

  // Always call with (slug, locale) only — React.cache() deduplicates with layout + page
  // The explicitProductId override is only for the client-side React Query hook
  const product = await getResolvedAppProduct(slug, locale).catch(() => null);

  const titleBase = slug
    .split("-")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
  const title = product?.name || titleBase;
  const imageUrl = product?.iconUrl || config?.iconUrl || product?.productImage || product?.image_full || product?.images?.[0]?.src || config?.productImage || "/images/logo-encriptados.png";
  const description = cleanDescription(product?.description, t("buyNow"));

  return buildSeoMetadata({
    title,
    description,
    canonicalPath: `/${locale}/apps/${slug}`,
    locale,
    languages: buildLocalizedLanguageAlternates(`/apps/${slug}`),
    image: {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: title,
    },
    keywords: [title, "app encriptada", "comunicacion segura", "Encriptados"],
  });
}

export function generateStaticParams() {
  const slugs = getCanonicalProductSlugs();
  return SEO_LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const initialProduct = await getResolvedAppProduct(slug, locale).catch(() => null);

  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </main>
    }>
      <ProductPageContent key={slug} slug={slug} locale={locale} initialProduct={initialProduct} />
    </Suspense>
  );
}
