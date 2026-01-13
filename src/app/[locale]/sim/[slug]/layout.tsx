import { Metadata } from "next";
import { getProductById } from "@/features/products/services";
import { getSimProductConfig, isValidSimProductSlug } from "./simProductConfig";

interface Props {
  params: { slug: string; locale: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { slug, locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.encriptados.net";

  try {
    // Validar slug
    if (!isValidSimProductSlug(slug)) {
      return {
        title: "Producto SIM no encontrado",
        description: "El producto SIM solicitado no existe.",
      };
    }

    // Obtener configuración del producto
    const config = getSimProductConfig(slug);
    if (!config) {
      return {
        title: "Producto SIM no encontrado",
        description: "La configuración del producto no está disponible.",
      };
    }

    // Obtener datos del producto desde la API
    const product = await getProductById(String(config.productId), locale || "es");

    if (!product) {
      return {
        title: "Producto SIM no encontrado",
        description: "El producto solicitado no está disponible.",
      };
    }

    // Preparar metadatos
    const productName = product.name || "Producto SIM";
    const productDescription = product.description || "Descubre este producto SIM en Encriptados";
    const productUrl = `${baseUrl}/${locale}/sim/${slug}`;

    // DERIVAR family y format desde los campos del backend (ÚNICA FUENTE DE VERDAD)
    // provider: "Sim Encriptados" → family = "encrypted"
    // provider: "Sim TIM" → family = "tim"
    const providerLower = (product.provider || "").toLowerCase();
    const family = providerLower.includes("encript") ? "encrypted" : "tim";
    
    // type_product: "Fisico" → format = "physical"
    // type_product: "Digital" → format = "digital"
    const typeProductLower = (product.type_product || "").toLowerCase();
    const format = typeProductLower === "digital" ? "digital" : "physical";
    
    // Seleccionar imagen basada en family + format (derivado del backend, NO del slug de URL)
    let metaImage: string;
    
    if (family === "tim") {
      // Productos TIM
      if (format === "digital") {
        metaImage = "/meta-image/sim-tim/tim-esim-datos.png";
      } else {
        // physical
        metaImage = "/meta-image/sim-tim/tim-fisica.png";
      }
    } else {
      // Productos Encriptados
      if (format === "digital") {
        metaImage = "/meta-image/sim-encriptados/encriptados-esim.png";
      } else {
        // physical
        metaImage = "/meta-image/sim-encriptados/encriptados-sim-fisica.png";
      }
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
