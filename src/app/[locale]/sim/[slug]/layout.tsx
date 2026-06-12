import { getSimProductConfig } from "./simProductConfig";
import JsonLd from "@/shared/components/JsonLd/JsonLd";
import { buildProductJsonLd } from "@/shared/components/JsonLd/productJsonLd";
import { buildFaqJsonLd } from "@/shared/components/JsonLd/faqJsonLd";
import { getCachedSimProduct } from "./getCachedSimProduct";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
  children: React.ReactNode;
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
    sku: product?.sku,
    brand: product?.brand || "Encriptados",
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
