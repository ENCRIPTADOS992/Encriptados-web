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

    // Mapeo de slugs a imágenes de metadatos
    const metaImageMap: Record<string, string> = {
      // Apps
      "silent-circle": "/meta-image/apps/silent-phone.png",
      "vault-chat": "/meta-image/apps/vaultchat.png",
      "armadillo": "/meta-image/apps/armadillo.png",
      "threema": "/meta-image/apps/threema.png",
      "threema-work": "/meta-image/apps/threemawork.png",
      "vnc-lagoon": "/meta-image/apps/vnclaggon.png",
      "salt": "/meta-image/apps/salt.png",
      "nord-vpn": "/meta-image/apps/nordvpn.png",
      // Software/Sistemas
      "secure-mdm-iphone": "/meta-image/sistemas/mdm-apple.png",
      "secure-mdm-android": "/meta-image/sistemas/mdm-android.png",
      "cryptcom": "/meta-image/sistemas/cryptcom.png",
      "chat-mail": "/meta-image/sistemas/chatmail.png",
      "armadillo-v2": "/meta-image/sistemas/armadillo.png",
      "vault-chat-v2": "/meta-image/sistemas/vaultchat.png",
      "dec-secure": "/meta-image/sistemas/dec-secure.png",
      "intactphone": "/meta-image/sistemas/intactphone.png",
      "intact-phone": "/meta-image/sistemas/intactphone.png",
      "renati": "/meta-image/sistemas/renati.png",
      "securecrypt": "/meta-image/sistemas/securecrypt.png",
      "secure-crypt": "/meta-image/sistemas/securecrypt.png",
      "ultra-x": "/meta-image/sistemas/ultra-x.png",
      "ultrax": "/meta-image/sistemas/ultra-x.png",
    };

    // Obtener imagen de metadatos
    let metaImage = metaImageMap[slug] || shareConfig?.metaImage;
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
