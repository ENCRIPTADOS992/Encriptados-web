/**
 * Página dedicada para Recarga Número Fijo (Categoría 372)
 * Reutiliza la plantilla de /apps/[slug] pero con ruta directa /recarga-numero-fijo
 */
import { getTranslations } from "next-intl/server";
import { getProductConfig } from "../apps/[slug]/productConfig";
import ProductPageContent from "../apps/[slug]/AppClientPage";
import { buildSeoMetadata } from "@/shared/seo/metadata";
import { getProductById } from "@/features/products/services";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const firstParam = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

export async function generateMetadata({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const sp = searchParams ? await searchParams : {};
  const t = await getTranslations({ locale, namespace: "appsShared.productTemplate" });
  const slug = "recarga-numero-fijo";
  const config = getProductConfig(slug);
  const productId = firstParam(sp.productId) || (config?.productId ? String(config.productId) : undefined);
  const product = productId
    ? await getProductById(productId, locale).catch(() => null)
    : null;

  const titleBase = (product as any)?.name || "Recarga Número Fijo";
  const imageUrl = (product as any)?.iconUrl || config?.iconUrl || (product as any)?.productImage || (product as any)?.image_full || (product as any)?.images?.[0]?.src || config?.productImage || "/images/logo-encriptados.png";
  const buyNowText = t("buyNow");

  return buildSeoMetadata({
    title: titleBase,
    description: buyNowText,
    canonicalPath: `/${locale}/recarga-numero-fijo`,
    locale,
    image: {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: titleBase,
    },
    keywords: ["recarga numero fijo", "numero fijo virtual", "Encriptados"],
  });
}

export default async function RecargaNumeroFijoPage({ params }: PageProps) {
  const { locale } = await params;
  const slug = "recarga-numero-fijo";

  return <ProductPageContent slug={slug} locale={locale} initialProduct={null} />;
}
