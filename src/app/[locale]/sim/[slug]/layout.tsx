import { Metadata } from "next";
import { getProductById } from "@/features/products/services";
import { isValidSimProductSlug } from "./simProductConfig";

interface Props {
  params: { slug: string; locale: string };
  searchParams: { productId?: string; price?: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params, searchParams }: Omit<Props, "children">): Promise<Metadata> {
  const { slug, locale } = params;
  const { productId } = searchParams || {};
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.encriptados.net";

  try {
    // Validar slug
    if (!isValidSimProductSlug(slug)) {
      return {
        title: "SIM Encriptada",
        description: "¡Compra ahora!",
      };
    }

    // Si hay productId en la URL, obtener ese producto específico
    let product = null;
    if (productId) {
      product = await getProductById(productId, locale || "es");
    }

    // Obtener nombre del producto para seleccionar imagen
    const productName = product?.name || "";
    const productNameLower = productName.toLowerCase();
    
    // Título corto (máximo 4 palabras)
    let shortTitle = "SIM Encriptada";
    if (productNameLower.includes("esim") && productNameLower.includes("datos")) {
      shortTitle = "eSIM + Datos";
    } else if (productNameLower.includes("esim") && productNameLower.includes("recarga")) {
      shortTitle = "eSIM + Recarga";
    } else if (productNameLower.includes("esim")) {
      shortTitle = "eSIM Encriptada";
    } else if (productNameLower.includes("minuto")) {
      shortTitle = "SIM + Minutos";
    } else if (productNameLower.includes("recarga") && productNameLower.includes("datos")) {
      shortTitle = "SIM + Recarga Datos";
    } else if (productNameLower.includes("tim") && productNameLower.includes("fisica")) {
      shortTitle = "TIM SIM Física";
    } else if (productNameLower.includes("tim") && productNameLower.includes("esim")) {
      shortTitle = "TIM eSIM";
    } else if (slug === "tim-sim") {
      shortTitle = "TIM SIM";
    } else if (slug === "esim-tim") {
      shortTitle = "TIM eSIM";
    } else if (slug === "esim-encriptada") {
      shortTitle = "eSIM Encriptada";
    } else if (slug === "sim-encriptada") {
      shortTitle = "SIM Encriptada";
    }
    
    // Descripción corta - llamado a la acción
    const shortDescription = "¡Compra ahora!";
    
    // Seleccionar imagen basada en el NOMBRE del producto
    let metaImage: string;
    
    if (productNameLower.includes("tim")) {
      // Productos TIM
      if (productNameLower.includes("esim") || productNameLower.includes("digital")) {
        metaImage = "/meta-image/sim-tim/tim-esim-datos.png";
      } else if (productNameLower.includes("recarga")) {
        metaImage = "/meta-image/sim-tim/tim-recarga-datos.png";
      } else {
        metaImage = "/meta-image/sim-tim/tim-fisica.png";
      }
    } else {
      // Productos Encriptados
      if (productNameLower.includes("esim") && productNameLower.includes("recarga")) {
        metaImage = "/meta-image/sim-encriptados/encriptados-recarga-datos.png";
      } else if (productNameLower.includes("esim") && productNameLower.includes("datos")) {
        metaImage = "/meta-image/sim-encriptados/encriptados-recarga-datos.png";
      } else if (productNameLower.includes("esim")) {
        metaImage = "/meta-image/sim-encriptados/encriptados-esim.png";
      } else if (productNameLower.includes("minuto")) {
        metaImage = "/meta-image/sim-encriptados/encriptados-minuto.png";
      } else if (productNameLower.includes("recarga")) {
        metaImage = "/meta-image/sim-encriptados/encriptados-recarga-datos.png";
      } else {
        metaImage = "/meta-image/sim-encriptados/encriptados-sim-fisica.png";
      }
    }
    
    // Fallback por slug si no hay producto
    if (!product) {
      const slugImageMap: Record<string, string> = {
        "sim-encriptada": "/meta-image/sim-encriptados/encriptados-sim-fisica.png",
        "esim-encriptada": "/meta-image/sim-encriptados/encriptados-esim.png",
        "tim-sim": "/meta-image/sim-tim/tim-fisica.png",
        "esim-tim": "/meta-image/sim-tim/tim-esim-datos.png",
      };
      metaImage = slugImageMap[slug] || "/meta-image/sim-encriptados/encriptados-sim-fisica.png";
    }

    // Asegurar que la imagen sea URL absoluta
    if (metaImage.startsWith("/")) {
      metaImage = `${baseUrl}${metaImage}`;
    }

    const productUrl = `${baseUrl}/${locale}/sim/${slug}${productId ? `?productId=${productId}` : ""}`;

    return {
      title: shortTitle,
      description: shortDescription,
      openGraph: {
        title: shortTitle,
        description: shortDescription,
        url: productUrl,
        siteName: "Encriptados",
        images: [
          {
            url: metaImage,
            width: 1200,
            height: 630,
            alt: shortTitle,
            type: "image/png",
          },
        ],
        locale: locale || "es",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: shortTitle,
        description: shortDescription,
        images: [metaImage],
      },
      alternates: {
        canonical: productUrl,
      },
    };
  } catch (error) {
    console.error("Error generando metadata para SIM:", error);
    return {
      title: "Producto SIM | Encriptados",
      description: "Descubre nuestros productos SIM encriptados.",
    };
  }
}

export default function SimSlugLayout({ children }: Props) {
  return <>{children}</>;
}
