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

type Props = {
  params: { productId: string; locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId, locale } = params;

  try {
    const product = await getProductById(productId, locale || "es");
    const productName = product?.name || "Producto";
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://encriptados.com";
    
    // Obtener la imagen del producto y asegurar que sea URL absoluta
    let productImage = product?.images?.[0]?.src || "/images/default-product.png";
    if (productImage.startsWith('/')) {
      productImage = `${baseUrl}${productImage}`;
    } else if (!productImage.startsWith('http')) {
      productImage = `${baseUrl}/${productImage}`;
    }
    
    const productPrice = product?.price || "0";
    const productDescription = `${productName} - ${productPrice} USD. Compra ahora en Encriptados.`;
    const productUrl = `${baseUrl}/our-products/${productId}`;

    return {
      title: `${productName} | Encriptados`,
      description: productDescription,
      openGraph: {
        title: productName,
        description: productDescription,
        url: productUrl,
        siteName: "Encriptados",
        images: [
          {
            url: productImage,
            width: 1200,
            height: 630,
            alt: productName,
          },
        ],
        locale: locale || "es",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: productName,
        description: productDescription,
        images: [productImage],
      },
    };
  } catch (error) {
    console.error("Error generando metadata:", error);
    return {
      title: "Producto | Encriptados",
      description: "Descubre nuestros productos de seguridad y comunicación encriptada.",
    };
  }
}

const page = () => {
  return <ProductByIdPage />;
};

export default page;
