import { getProductById } from "@/features/products/services";
import { getSimProductConfig } from "./simProductConfig";
import SimProductPageContent from "./SimClientPage";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = params;
  const staticConfig = getSimProductConfig(slug);
  const t = await getTranslations({ locale, namespace: "EncryptedSimPage" });
  
  if (!staticConfig?.productId) return {};

  try {
    const product = await getProductById(String(staticConfig.productId), locale);
    if (!product) return {};

    const imageUrl = product.iconUrl || product.images?.[0]?.src || "/images/logo-encriptados.png";
    const buyNowText = t("CardSim.buyNow") || "¡Compra ahora!";

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
    console.error("Error generating metadata for SIM:", error);
    return {};
  }
}

export default async function SimProductPage({ params }: PageProps) {
  const { slug, locale } = params;
  const staticConfig = getSimProductConfig(slug);
  let initialProduct = null;

  if (staticConfig?.productId) {
    try {
      initialProduct = await getProductById(String(staticConfig.productId), locale);
    } catch (error) {
       console.error("Error fetching SIM product server-side:", error);
    }
  }
  
  return <SimProductPageContent slug={slug} locale={locale} initialProduct={initialProduct} />;
}
