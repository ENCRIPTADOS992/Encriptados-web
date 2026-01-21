import { getProductById, getProductBySlug } from "@/features/products/services";
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
  
  // Intentar obtener config estática primero (legacy)
  const config = getProductConfig(slug);
  let product = null;

  try {
    if (config?.productId) {
      product = await getProductById(String(config.productId), locale);
    } else {
      // Si no hay config estática, buscar por slug dinámico
      product = await getProductBySlug(slug, locale);
    }

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

  try {
    if (config?.productId) {
       // Camino A: Configuración estática existente
      initialProduct = await getProductById(String(config.productId), locale);
    } else {
      // Camino B: Búsqueda dinámica por slug
      initialProduct = await getProductBySlug(slug, locale);
    }
  } catch (error) {
    console.error("Error fetching product server-side:", error);
  }

  // Si no se encuentra producto ni por config ni por slug dinámico -> 404
  if (!initialProduct && !config) {
    notFound();
  }
  
  return <ProductPageContent slug={slug} locale={locale} initialProduct={initialProduct} />;
}

