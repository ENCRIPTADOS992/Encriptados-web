import { Metadata } from "next";
import { getCanonicalSiteUrl } from "@/shared/seo/url";
import { getProductById } from "@/features/products/services";
import { buildSeoMetadata, buildLocalizedLanguageAlternates } from "@/shared/seo/metadata";
import JsonLd from "@/shared/components/JsonLd/JsonLd";
import { buildFaqJsonLd } from "@/shared/components/JsonLd/faqJsonLd";

interface Props {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

/** Strip HTML tags and truncate to ~155 chars for meta description */
function cleanDescription(html: string | undefined, fallback: string): string {
  if (!html) return fallback;
  const text = html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
  if (!text || text.length < 10) return fallback;
  return text.length > 155 ? text.slice(0, 152) + "..." : text;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = getCanonicalSiteUrl();

  try {
    const product = await getProductById("59747", locale || "es").catch(() => null);

    const title = product?.name || "Camaleon Router";
    const description = cleanDescription(product?.description, "Router encriptado para comunicaciones privadas y seguras con Encriptados.");

    // Usar imagen de metadatos específica para Router
    let metaImage = product?.iconUrl || "/meta-image/router/router-camaleon.png";
    if (metaImage.startsWith("/")) {
      metaImage = `${baseUrl}${metaImage}`;
    }

    return buildSeoMetadata({
      title,
      description,
      canonicalPath: `/${locale}/router`,
      locale,
      languages: buildLocalizedLanguageAlternates("/router"),
      image: {
        url: metaImage,
        width: 1200,
        height: 630,
        alt: title,
      },
      keywords: [title, "router encriptado", "router VPN", "Encriptados"],
    });
  } catch (error) {
    console.error("Error generando metadata para Router:", error);
    return {
      title: "Camaleon Router",
      description: "Router encriptado para comunicaciones privadas y seguras con Encriptados.",
      alternates: { canonical: `${baseUrl}/${locale}/router` },
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
