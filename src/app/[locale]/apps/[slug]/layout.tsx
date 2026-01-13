import { Metadata } from "next";
import { getProductById } from "@/features/products/services";
import { getProductConfig, isValidProductSlug } from "./productConfig";
import { APPS_SHARE_CONFIG, getShareConfigByProductId } from "@/shared/constants/shareConfig";

interface Props {
  params: { slug: string; locale: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { slug, locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.encriptados.net";

  try {
    // Validar slug
    if (!isValidProductSlug(slug)) {
      return {
        title: "Producto no encontrado",
        description: "El producto solicitado no existe.",
      };
    }

    // Obtener configuración del producto
    const config = getProductConfig(slug);
    if (!config) {
      return {
        title: "Producto no encontrado",
        description: "La configuración del producto no está disponible.",
      };
    }

    // Obtener datos del producto desde la API
    const product = await getProductById(String(config.productId), locale || "es");

    if (!product) {
      return {
        title: "Producto no encontrado",
        description: "El producto solicitado no está disponible.",
      };
    }

    // Obtener configuración de compartir si existe
    const shareConfig = getShareConfigByProductId(config.productId);

    // Preparar metadatos
    const productName = product.name || shareConfig?.name || "Producto";
    const productDescription = shareConfig?.description || product.description || "Descubre este producto en Encriptados";
    const productUrl = `${baseUrl}/${locale}/apps/${slug}`;

    // Imagen para Open Graph
    let metaImage = shareConfig?.metaImage;
    if (!metaImage && product.images?.[0]?.src) {
      metaImage = product.images[0].src;
    }
    if (!metaImage) {
      metaImage = "/images/apps/default-app.png";
    }

    // Asegurar que la imagen sea URL absoluta
    if (metaImage.startsWith("/")) {
      metaImage = `${baseUrl}${metaImage}`;
    } else if (!metaImage.startsWith("http")) {
      metaImage = `${baseUrl}/${metaImage}`;
    }

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
            url: metaImage,
            width: 1200,
            height: 630,
            alt: productName,
            type: "image/png",
          },
        ],
        locale: locale || "es",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: productName,
        description: productDescription,
        images: [metaImage],
      },
      alternates: {
        canonical: productUrl,
      },
    };
  } catch (error) {
    console.error("Error generando metadata para app:", error);
    return {
      title: "Producto | Encriptados",
      description: "Descubre nuestros productos de seguridad y comunicación encriptada.",
    };
  }
}

export default function AppsSlugLayout({ children }: Props) {
  return <>{children}</>;
}
