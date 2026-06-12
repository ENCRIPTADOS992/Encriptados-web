/**
 * Página de Producto por ID
 * 
 * ⚠️ IMPORTANTE: Esta ruta se usa SOLO para productos SIM (categoría 40)
 * 
 * Para Apps, Software y Router usar:
 * - Apps/Software: /apps/[slug]  
 * - Router: /router
 * 
 * Ver productConfig.ts para la lista de slugs disponibles
 */
import React from "react";
import { Metadata } from "next";
import { getProductById } from "@/features/products/services";
import ProductByIdPage from "./components/ProductByIdPage";
import { getCanonicalSiteUrl } from "@/shared/seo/url";
import { buildSeoMetadata, buildLocalizedLanguageAlternates } from "@/shared/seo/metadata";

type Props = {
  params: Promise<{ productId: string; locale: string }>;
};

/** Strip HTML tags and truncate to ~155 chars for meta description */
function cleanDescription(html: string | undefined, fallback: string): string {
  if (!html) return fallback;
  const text = html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
  if (!text || text.length < 10) return fallback;
  return text.length > 155 ? text.slice(0, 152) + "..." : text;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId, locale } = await params;

  try {
    const product = await getProductById(productId, locale || "es");
    const productName = product?.name || "Producto";
    const baseUrl = getCanonicalSiteUrl();
    
    // Obtener la imagen del producto y asegurar que sea URL absoluta
    let productImage = product?.images?.[0]?.src || "/images/default-product.png";
    if (productImage.startsWith('/')) {
      productImage = `${baseUrl}${productImage}`;
    } else if (!productImage.startsWith('http')) {
      productImage = `${baseUrl}/${productImage}`;
    }
    
    const description = cleanDescription(product?.description, `${productName}. Compra con envio seguro en Encriptados.`);

    return buildSeoMetadata({
      title: productName,
      description,
      canonicalPath: `/${locale}/our-products/${productId}`,
      locale,
      languages: buildLocalizedLanguageAlternates(`/our-products/${productId}`),
      image: {
        url: productImage,
        width: 1200,
        height: 630,
        alt: productName,
      },
      keywords: [productName, "producto encriptado", "comunicacion segura", "Encriptados"],
    });
  } catch (error) {
    console.error("Error generando metadata:", error);
    const baseUrl = getCanonicalSiteUrl();
    return {
      title: "Producto",
      description: "Descubre nuestros productos de seguridad y comunicacion encriptada.",
      alternates: { canonical: `${baseUrl}/${locale}/our-products/${productId}` },
    };
  }
}

const page = () => {
  return <ProductByIdPage />;
};

export default page;
