import { Suspense } from "react";
import { getSimProductConfig, getAllSimProductSlugs } from "./simProductConfig";
import SimProductPageContent from "./SimClientPage";
import { redirect } from "next/navigation";
import { buildSeoMetadata, buildLocalizedLanguageAlternates } from "@/shared/seo/metadata";
import { getCachedSimProduct } from "./getCachedSimProduct";
import { SEO_LOCALES } from "@/shared/seo/constants";

/** Allow up to 30 seconds for server-side rendering (WordPress API can be slow) */
export const maxDuration = 30;

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
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

/** Fetch iconUrl directly from admin WordPress (admin.encriptados.io) */
async function fetchSimIconUrl(productId: number, locale: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 5_000);
    const res = await fetch(
      `https://admin.encriptados.io/wp-json/encriptados/v3/store/product/${productId}?lang=${locale}`,
      { next: { revalidate: 3600 }, signal: controller.signal }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.iconUrl || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params, searchParams }: PageProps) {
  const { slug, locale } = await params;
  const sp = await searchParams;
  const staticConfig = getSimProductConfig(slug);

  const fallbackTitle = slug === "esim-encriptada"
    ? "eSIM Encriptada"
    : slug === "tim-sim"
      ? "TIM SIM"
      : slug === "esim-tim"
        ? "TIM eSIM"
        : "SIM Encriptada";

  // Obtener nombre del producto desde la query si viene una variante
  const simRegion = firstParam(sp.regionCode) || firstParam(sp.sim_region) || null;
  const queryProductId = firstParam(sp.productId);
  const baseProductId = staticConfig?.productId ? String(staticConfig.productId) : undefined;
  const product = await getCachedSimProduct(queryProductId || baseProductId, locale, simRegion, slug);

  const title = product?.name || fallbackTitle;
  const description = cleanDescription(product?.description, "SIM y eSIM encriptadas para comunicacion privada y segura con Encriptados.");

  // Obtener iconUrl directamente desde admin.encriptados.io (fuente de verdad)
  const iconUrl = staticConfig?.productId
    ? await fetchSimIconUrl(staticConfig.productId, locale)
    : null;

  const imageUrl =
    iconUrl ||
    product?.productImage ||
    product?.image_full ||
    product?.images?.[0]?.src ||
    staticConfig?.productImage ||
    "/images/logo-encriptados.png";

  return buildSeoMetadata({
    title,
    description,
    canonicalPath: `/${locale}/sim/${slug}`,
    locale,
    languages: buildLocalizedLanguageAlternates(`/sim/${slug}`),
    image: {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: title,
    },
    keywords: [title, "SIM encriptada", "eSIM", "Encriptados"],
  });
}

export function generateStaticParams() {
  const slugs = getAllSimProductSlugs();
  return SEO_LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export default async function SimProductPage({ params, searchParams }: PageProps) {
  const { slug, locale } = await params;
  const sp = await searchParams;

  if (String(sp.productId || "") === "61588") {
    const nextParams = new URLSearchParams();
    nextParams.set("productId", "61588");
    nextParams.set("categoryId", "371");

    for (const key of ["variantId", "gb", "region", "regionCode", "flagUrl", "buy"] as const) {
      const value = sp[key];
      if (typeof value === "string" && value) nextParams.set(key, value);
    }

    redirect(`/${locale}/activar-apps?${nextParams.toString()}`);
  }

  const staticConfig = getSimProductConfig(slug);
  let initialProduct = null;

  // sim_region debe ser código de país (ej: "ca"), usar regionCode como fallback
  const simRegion = (sp.regionCode as string) || (sp.sim_region as string) || null;
  const requestedProductId =
    firstParam(sp.productId) || (staticConfig?.productId ? String(staticConfig.productId) : null);

  if (requestedProductId) {
    try {
      initialProduct = await getCachedSimProduct(requestedProductId, locale, simRegion, slug);
    } catch (error) {
       console.error("Error fetching SIM product server-side:", error);
    }
  }

  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </main>
    }>
      <SimProductPageContent key={slug} slug={slug} locale={locale} initialProduct={initialProduct} />
    </Suspense>
  );
}
