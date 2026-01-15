import { getProductById } from "@/features/products/services";
import { getProductConfig } from "./productConfig";
import ProductPageContent from "./AppClientPage";

interface PageProps {
  params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = params;
  const config = getProductConfig(slug);
  
  if (!config?.productId) return {};

  try {
    const product = await getProductById(String(config.productId), locale);
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
    console.error("Error generating metadata for App:", error);
    return {};
  }
}

export default function ProductPage({ params }: PageProps) {
  const { slug, locale } = params;
  
  return <ProductPageContent slug={slug} locale={locale} />;
}
