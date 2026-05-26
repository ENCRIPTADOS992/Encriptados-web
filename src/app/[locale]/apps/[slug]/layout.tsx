import { Metadata } from "next";
import { getProductConfig, isValidProductSlug } from "./productConfig";
import JsonLd from "@/shared/components/JsonLd/JsonLd";
import { buildProductJsonLd } from "@/shared/components/JsonLd/productJsonLd";
import { buildFaqJsonLd } from "@/shared/components/JsonLd/faqJsonLd";
import { getCanonicalSiteUrl } from "@/shared/seo/url";
import { getResolvedAppProduct } from "./productData";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { slug, locale } = await params;
  const baseUrl = getCanonicalSiteUrl();

  try {
    // Validar slug
    if (!isValidProductSlug(slug)) {
      return {
        title: "Encriptados",
        description: "¡Compra ahora!",
      };
    }

    // Obtener configuración del producto
    const config = getProductConfig(slug);
    if (!config) {
      return {
        title: "Encriptados",
        description: "¡Compra ahora!",
      };
    }

    // Obtener datos del producto desde la API
    const product = await getResolvedAppProduct(slug, locale || "es");

    if (!product) {
      return {
        title: "Encriptados",
        description: "¡Compra ahora!",
      };
    }

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
    let metaImage = metaImageMap[slug];
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

    // Título corto basado en el nombre del producto
    let shortTitle = product.name || "Encriptados";

    // Acortar nombres largos
    if (shortTitle.length > 20) {
      // Usar solo las primeras palabras significativas
      const words = shortTitle.split(/[\s-]+/).slice(0, 3);
      shortTitle = words.join(" ");
    }

    // Descripción corta - llamado a la acción
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
    console.error("Error generando metadata para app:", error);
    return {
      title: "Encriptados",
      description: "¡Compra ahora!",
    };
  }
}

export default async function AppsSlugLayout({ children, params }: Props) {
  const { slug, locale } = await params;
  const config = getProductConfig(slug);

  if (!config) return <>{children}</>;

  try {
    const product = await getResolvedAppProduct(slug, locale || "es");
    if (!product) return <>{children}</>;
    const productJsonLd = buildProductJsonLd({
      name: product.name || slug,
      description: product.description,
      canonicalPath: `/${locale}/apps/${slug}`,
      image: product.images?.[0]?.src || config.productImage || config.iconUrl,
      price: product.price,
      currency: "USD",
    });
    const faqJsonLd = buildFaqJsonLd(
      (product.faqs || []).map((faq) => ({
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
  } catch {
    return <>{children}</>;
  }
}
