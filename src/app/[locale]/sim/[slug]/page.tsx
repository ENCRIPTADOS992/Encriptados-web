import { getProductById } from "@/features/products/services";
import { getSimProductConfig } from "./simProductConfig";
import SimProductPageContent from "./SimClientPage";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SimProductPage({ params, searchParams }: PageProps) {
  const { slug, locale } = await params;
  const sp = await searchParams;
  const staticConfig = getSimProductConfig(slug);
  let initialProduct = null;

  // sim_region debe ser código de país (ej: "ca"), usar regionCode como fallback
  const simRegion = (sp.regionCode as string) || (sp.sim_region as string) || null;

  if (staticConfig?.productId) {
    try {
      initialProduct = await getProductById(String(staticConfig.productId), locale, {
        simRegion,
      });
    } catch (error) {
       console.error("Error fetching SIM product server-side:", error);
    }
  }
  
  return <SimProductPageContent slug={slug} locale={locale} initialProduct={initialProduct} />;
}
