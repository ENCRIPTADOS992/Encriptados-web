import { getProductById } from "@/features/products/services";
import { getSimProductConfig } from "./simProductConfig";
import SimProductPageContent from "./SimClientPage";

interface PageProps {
  params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = params;
  const staticConfig = getSimProductConfig(slug);
  
  if (!staticConfig?.productId) return {};

  try {
    const product = await getProductById(String(staticConfig.productId), locale);
    if (!product) return {};

    const imageUrl = product.iconUrl || product.images?.[0]?.src || "/images/logo-encriptados.png";

    return {
      title: `${product.name} | Encriptados`,
      description: product.description || `Compra ${product.name} en Encriptados`,
      openGraph: {
        title: product.name,
        description: product.description,
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

export default function SimProductPage({ params }: PageProps) {
  const { slug, locale } = params;
  
  return <SimProductPageContent slug={slug} locale={locale} />;
}
