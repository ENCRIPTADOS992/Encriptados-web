import { Metadata } from "next";
import { getSimProductConfig, isValidSimProductSlug } from "./simProductConfig";
import JsonLd from "@/shared/components/JsonLd/JsonLd";
import { buildProductJsonLd } from "@/shared/components/JsonLd/productJsonLd";
import { buildFaqJsonLd } from "@/shared/components/JsonLd/faqJsonLd";
import { getCanonicalSiteUrl } from "@/shared/seo/url";
import { getCachedSimProduct } from "./getCachedSimProduct";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { slug, locale } = await params;
  const baseUrl = getCanonicalSiteUrl();

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

export default async function SimSlugLayout({ children, params }: Props) {
  const { slug, locale } = await params;
  const config = getSimProductConfig(slug);

  if (!config) return <>{children}</>;

  const productName = slug === "esim-encriptada"
    ? "eSIM Encriptada"
    : slug === "tim-sim"
      ? "TIM SIM"
      : slug === "esim-tim"
        ? "TIM eSIM"
        : "SIM Encriptada";
  const product = await getCachedSimProduct(
    config.productId ? String(config.productId) : null,
    locale || "es"
  );
  const productJsonLd = buildProductJsonLd({
    name: product?.name || productName,
    description: product?.description || "SIM y eSIM para comunicacion privada y segura con Encriptados.",
    canonicalPath: `/${locale}/sim/${slug}`,
    image: product?.images?.[0]?.src || config.productImage,
    price: product?.price,
    currency: "USD",
  });
  const faqJsonLd = buildFaqJsonLd(
    (product?.faqs || []).map((faq) => ({
      question: faq.name,
      answer: faq.description,
    })),
  );

  return (
    <>
      <JsonLd
        data={faqJsonLd ? [productJsonLd, faqJsonLd] : productJsonLd}
      />
      {children}
    </>
  );
}
