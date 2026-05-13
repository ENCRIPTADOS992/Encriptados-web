/**
 * Página dedicada para Activar Apps (Categoría 371)
 * Reutiliza la plantilla de /apps/[slug] pero con ruta directa /activar-apps
 * El endpoint alimenta todo el contenido dinámicamente
 */
import { getTranslations } from "next-intl/server";
import { getProductConfig } from "../apps/[slug]/productConfig";
import ProductPageContent from "../apps/[slug]/AppClientPage";
import { buildSeoMetadata } from "@/shared/seo/metadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "appsShared.productTemplate" });
  const slug = "activar-apps";
  const config = getProductConfig(slug);

  const titleBase = "Activar Apps";
  const imageUrl = config?.iconUrl || config?.productImage || "/images/logo-encriptados.png";
  const buyNowText = t("buyNow");

  return buildSeoMetadata({
    title: titleBase,
    description: buyNowText,
    canonicalPath: `/${locale}/activar-apps`,
    locale,
    image: {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: titleBase,
    },
    keywords: ["activar apps", "apps encriptadas", "licencias Encriptados"],
  });
}

export default async function ActivarAppsPage({ params }: PageProps) {
  const { locale } = await params;
  const slug = "activar-apps";

  // Reutiliza el componente de apps, el endpoint alimenta todo el contenido
  return <ProductPageContent slug={slug} locale={locale} initialProduct={null} />;
}
