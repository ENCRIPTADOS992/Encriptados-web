import { getProductConfig } from "./productConfig";
import JsonLd from "@/shared/components/JsonLd/JsonLd";
import { buildProductJsonLd } from "@/shared/components/JsonLd/productJsonLd";
import { buildFaqJsonLd } from "@/shared/components/JsonLd/faqJsonLd";
import { getResolvedAppProduct } from "./productData";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
  children: React.ReactNode;
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
      sku: product.sku,
      brand: product.brand || "Encriptados",
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
