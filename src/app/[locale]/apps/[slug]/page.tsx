import { getProductConfig } from "./productConfig";
import ProductPageContent from "./AppClientPage";
import { getTranslations } from "next-intl/server";
import { buildSeoMetadata } from "@/shared/seo/metadata";


interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "appsShared.productTemplate" });
  const config = getProductConfig(slug);

  // Fallback for metadata if config doesn't exist
  const titleBase = slug
    .split("-")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
  const imageUrl = config?.iconUrl || config?.productImage || "/images/logo-encriptados.png";
  const buyNowText = t("buyNow");

  return buildSeoMetadata({
    title: titleBase,
    description: buyNowText,
    canonicalPath: `/${locale}/apps/${slug}`,
    locale,
    image: {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: titleBase,
    },
    keywords: [titleBase, "app encriptada", "comunicacion segura", "Encriptados"],
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, locale } = await params;
  // We don't check for config existence here anymore to allow dynamic products
  // via API even if they are not in productConfig.ts

  return <ProductPageContent slug={slug} locale={locale} initialProduct={null} />;
}
