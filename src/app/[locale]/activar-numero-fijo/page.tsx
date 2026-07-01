/**
 * Página dedicada para Activar Número Fijo (Categoría 372)
 * Reutiliza la plantilla de /apps/[slug] pero con ruta directa /activar-numero-fijo
 * El endpoint alimenta todo el contenido dinámicamente
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
  const slug = "activar-numero-fijo";
  const config = getProductConfig(slug);
  const productId = firstParam(sp.productId) || (config?.productId ? String(config.productId) : undefined);
  const product = productId
    ? await getProductById(productId, locale).catch(() => null)
    : null;

  const titleBase = product?.name || "Activar Número Fijo";
  const imageUrl = product?.iconUrl || config?.iconUrl || product?.productImage || product?.image_full || product?.images?.[0]?.src || config?.productImage || "/images/logo-encriptados.png";
  const buyNowText = t("buyNow");

  return buildSeoMetadata({
    title: titleBase,
    description: buyNowText,
    canonicalPath: `/${locale}/activar-numero-fijo`,
    locale,
    image: {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: titleBase,
    },
    keywords: ["activar numero fijo", "numero fijo virtual", "Encriptados"],
  });
}

export default async function ActivarNumeroFijoPage({ params }: PageProps) {
  const { locale } = await params;
  const slug = "activar-numero-fijo";

  return <ProductPageContent slug={slug} locale={locale} initialProduct={null} />;
}
