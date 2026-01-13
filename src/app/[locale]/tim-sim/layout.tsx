import { Metadata } from "next";
import { getProductById } from "@/features/products/services";
import { getShareConfigByProductId } from "@/shared/constants/shareConfig";

interface Props {
  params: { locale: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.encriptados.net";

  try {
    // Obtener configuración de compartir para TIM SIM
    const shareConfig = getShareConfigByProductId(448); // TIM SIM Física
    
    if (!shareConfig) {
      return {
        title: "TIM SIM | Encriptados",
        description: "Descubre las opciones de SIM TIM en Encriptados",
      };
    }

    // Obtener datos del producto desde la API si es necesario
    let product;
    try {
      product = await getProductById(String(shareConfig.productId), locale || "es");
    } catch (err) {
      // Si falla, usamos la configuración de shareConfig
    }

    // Preparar metadatos
    const productName = product?.name || shareConfig.name;
    const productDescription = product?.description || shareConfig.description;
    const productUrl = `${baseUrl}/${locale}/tim-sim`;

    // Usar imagen de metadatos específica para TIM SIM
    let metaImage = "/meta-image/sim-tim/tim-fisica.png";
    
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
    console.error("Error generando metadata para TIM SIM:", error);
    return {
      title: "TIM SIM | Encriptados",
      description: "Descubre las opciones de SIM TIM en Encriptados",
    };
  }
}

export default function TimSimLayout({ children }: Props) {
  return <>{children}</>;
}
