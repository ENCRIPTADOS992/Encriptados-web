import { Metadata } from "next";
import { getCanonicalSiteUrl } from "@/shared/seo/url";
import { getProductById } from "@/features/products/services";
import JsonLd from "@/shared/components/JsonLd/JsonLd";
import { buildFaqJsonLd } from "@/shared/components/JsonLd/faqJsonLd";

interface Props {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = getCanonicalSiteUrl();

  try {
    const productUrl = `${baseUrl}/${locale}/router`;
    const product = await getProductById("59747", locale || "es").catch(() => null);

    // Usar imagen de metadatos específica para Router
    let metaImage = product?.iconUrl || "/meta-image/router/router-camaleon.png";

    // Asegurar que la imagen sea URL absoluta
    if (metaImage.startsWith("/")) {
      metaImage = `${baseUrl}${metaImage}`;
    }

    // Título y descripción cortos
    const shortTitle = product?.name || "Camaleón Router";
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

export default async function RouterLayout({ children, params }: Props) {
  const { locale } = await params;
  const product = await getProductById("59747", locale || "es").catch(() => null);
  const faqJsonLd = buildFaqJsonLd(
    (product?.faqs || []).map((faq) => ({
      question: faq.name,
      answer: faq.description,
    })),
  );

  return (
    <>
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      {children}
    </>
  );
}
