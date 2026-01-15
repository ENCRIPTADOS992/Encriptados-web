import { getProductById } from "@/features/products/services";
import { getSimProductConfig } from "./simProductConfig";
import SimProductPageContent from "./SimClientPage";

interface PageProps {
  params: { slug: string; locale: string };
}

export default async function SimProductPage({ params }: PageProps) {
  const { slug, locale } = params;
  const staticConfig = getSimProductConfig(slug);
  let initialProduct = null;

  if (staticConfig?.productId) {
    try {
      initialProduct = await getProductById(String(staticConfig.productId), locale);
    } catch (error) {
       console.error("Error fetching SIM product server-side:", error);
    }
  }
  
  return <SimProductPageContent slug={slug} locale={locale} initialProduct={initialProduct} />;
}
