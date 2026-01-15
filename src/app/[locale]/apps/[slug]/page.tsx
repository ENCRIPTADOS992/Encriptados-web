import { getProductById } from "@/features/products/services";
import { getProductConfig } from "./productConfig";
import ProductPageContent from "./AppClientPage";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = params;
  const config = getProductConfig(slug);
  const t = await getTranslations({ locale, namespace: "appsShared.productTemplate" });
  
  if (!config?.productId) return {};

  try {
    const product = await getProductById(String(config.productId), locale);
    if (!product) return {};

    const imageUrl = product.iconUrl || product.images?.[0]?.src || "/images/logo-encriptados.png";
    const buyNowText = t("buyNow");

    return {
      title: `${product.name} | Encriptados`,
      description: buyNowText,
      openGraph: {
        title: product.name,
        description: buyNowText,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: product.name,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for App:", error);
    return {};
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, locale } = params;
  const config = getProductConfig(slug);
  let initialProduct = null;

  if (config?.productId) {
    try {
      initialProduct = await getProductById(String(config.productId), locale);
    } catch (error) {
      console.error("Error fetching product server-side:", error);
    }
  }
  
  return <ProductPageContent slug={slug} locale={locale} initialProduct={initialProduct} />;
}
