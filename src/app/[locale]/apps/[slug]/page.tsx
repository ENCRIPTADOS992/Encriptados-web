import { getProductConfig } from "./productConfig";
import ProductPageContent from "./AppClientPage";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";


interface PageProps {
  params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = params;
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

  return {
    title: `${titleBase} | Encriptados`,
    description: buyNowText,
    openGraph: {
      title: titleBase,
      description: buyNowText,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: titleBase,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, locale } = params;
  // We don't check for config existence here anymore to allow dynamic products
  // via API even if they are not in productConfig.ts

  return <ProductPageContent slug={slug} locale={locale} initialProduct={null} />;
}
