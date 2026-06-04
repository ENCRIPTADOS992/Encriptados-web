import { getSimProductConfig } from "./simProductConfig";
import SimProductPageContent from "./SimClientPage";
import { redirect } from "next/navigation";
import { buildSeoMetadata } from "@/shared/seo/metadata";
import { getCachedSimProduct } from "./getCachedSimProduct";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const firstParam = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

/** Fetch iconUrl directly from admin WordPress (admin.encriptados.io) */
async function fetchSimIconUrl(productId: number, locale: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://admin.encriptados.io/wp-json/encriptados/v3/store/product/${productId}?lang=${locale}`,
      { next: { revalidate: 3600 } }
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
  const product = await getCachedSimProduct(queryProductId || baseProductId, locale, simRegion);

  const title = product?.name || fallbackTitle;

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
    description: "¡Compra ahora!",
    canonicalPath: `/${locale}/sim/${slug}`,
    locale,
    image: {
      url: imageUrl,
      width: 400,
      height: 400,
      alt: title,
    },
    keywords: [title, "SIM encriptada", "eSIM", "Encriptados"],
  });
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
      initialProduct = await getCachedSimProduct(requestedProductId, locale, simRegion);
    } catch (error) {
       console.error("Error fetching SIM product server-side:", error);
    }
  }

  return <SimProductPageContent slug={slug} locale={locale} initialProduct={initialProduct} />;
}
