import { Metadata } from "next";
import { getProductById } from "@/features/products/services";

interface Props {
  params: { locale: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.encriptados.net";

  try {
    // ID correcto para TIM SIM Física según simProductConfig.ts
    const TIM_SIM_PRODUCT_ID = 59835;
    
    // Obtener datos del producto desde la API
    let product;
    try {
      product = await getProductById(String(TIM_SIM_PRODUCT_ID), locale || "es");
    } catch {
      // Si falla, usamos valores por defecto
    }

    // Preparar metadatos
    const productName = product?.name || "TIM SIM";
    const productDescription = product?.description || "Descubre las opciones de SIM TIM en Encriptados";
    const productUrl = `${baseUrl}/${locale}/tim-sim`;

    // Derivar imagen basada en provider del backend (ÚNICA fuente de verdad)
    const providerLower = (product?.provider || "").toLowerCase();
    const typeProductLower = (product?.type_product || "").toLowerCase();
    const isTim = providerLower.includes("tim");
    const isDigital = typeProductLower === "digital";
    
    // Seleccionar imagen según provider y type_product del backend
    let metaImage: string;
    if (isTim) {
      metaImage = isDigital ? "/meta-image/sim-tim/tim-esim-datos.png" : "/meta-image/sim-tim/tim-fisica.png";
    } else {
      metaImage = isDigital ? "/meta-image/sim-encriptados/encriptados-esim.png" : "/meta-image/sim-encriptados/encriptados-sim-fisica.png";
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
