import { Metadata } from "next";

interface Props {
  params: { locale: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.encriptados.net";

  try {
    const productUrl = `${baseUrl}/${locale}/router`;

    // Usar imagen de metadatos específica para Router
    let metaImage = "/meta-image/router/router-camaleon.png";
    
    // Asegurar que la imagen sea URL absoluta
    if (metaImage.startsWith("/")) {
      metaImage = `${baseUrl}${metaImage}`;
    }

    // Título y descripción cortos
    const shortTitle = "Camaleón Router";
    const shortDescription = "¡Compra ahora!";

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
    console.error("Error generando metadata para Router:", error);
    return {
      title: "Camaleón Router",
      description: "¡Compra ahora!",
    };
  }
}

export default function RouterLayout({ children }: Props) {
  return <>{children}</>;
}
