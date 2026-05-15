import { getProductConfig } from "./productConfig";
import ProductPageContent from "./AppClientPage";
import { getTranslations } from "next-intl/server";
import { buildSeoMetadata } from "@/shared/seo/metadata";
import { getProductById } from "@/features/products/services";


interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const firstParam = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

export async function generateMetadata({ params, searchParams }: PageProps) {
  const { slug, locale } = await params;
  const sp = searchParams ? await searchParams : {};
  const t = await getTranslations({ locale, namespace: "appsShared.productTemplate" });
  const config = getProductConfig(slug);
  const productId = firstParam(sp.productId) || (config?.productId ? String(config.productId) : undefined);
  const product = productId
    ? await getProductById(productId, locale).catch(() => null)
    : null;

  // Fallback for metadata if config doesn't exist
  const titleBase = slug
    .split("-")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
  const title = product?.name || titleBase;
  const imageUrl = product?.iconUrl || config?.iconUrl || product?.productImage || product?.image_full || product?.images?.[0]?.src || config?.productImage || "/images/logo-encriptados.png";
  const buyNowText = t("buyNow");

  return buildSeoMetadata({
    title,
    description: buyNowText,
    canonicalPath: `/${locale}/apps/${slug}`,
    locale,
    image: {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: title,
    },
    keywords: [title, "app encriptada", "comunicacion segura", "Encriptados"],
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, locale } = await params;
  // We don't check for config existence here anymore to allow dynamic products
  // via API even if they are not in productConfig.ts

  return <ProductPageContent slug={slug} locale={locale} initialProduct={null} />;
}
