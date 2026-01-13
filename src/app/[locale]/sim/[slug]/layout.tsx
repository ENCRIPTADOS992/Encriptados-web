import { Metadata } from "next";
import { isValidSimProductSlug } from "./simProductConfig";

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
        title: "SIM Encriptada",
        description: "¡Compra ahora!",
      };
    }

    // Título corto basado en el slug
    let shortTitle = "SIM Encriptada";
    let metaImage = "/meta-image/sim-encriptados/encriptados-sim-fisica.png";
    
    // Mapeo de slugs a títulos e imágenes
    if (slug === "esim-encriptada") {
      shortTitle = "eSIM Encriptada";
      metaImage = "/meta-image/sim-encriptados/encriptados-esim.png";
    } else if (slug === "sim-encriptada") {
      shortTitle = "SIM Encriptada";
      metaImage = "/meta-image/sim-encriptados/encriptados-sim-fisica.png";
    } else if (slug === "tim-sim") {
      shortTitle = "TIM SIM";
      metaImage = "/meta-image/sim-tim/tim-fisica.png";
    } else if (slug === "esim-tim") {
      shortTitle = "TIM eSIM";
      metaImage = "/meta-image/sim-tim/tim-esim-datos.png";
    }
    
    // Descripción corta - llamado a la acción
    const shortDescription = "¡Compra ahora!";

    // Asegurar que la imagen sea URL absoluta
    if (metaImage.startsWith("/")) {
      metaImage = `${baseUrl}${metaImage}`;
    }

    const productUrl = `${baseUrl}/${locale}/sim/${slug}`;

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
      title: "SIM Encriptada",
      description: "¡Compra ahora!",
    };
  }
}

export default function SimSlugLayout({ children }: Props) {
  return <>{children}</>;
}
