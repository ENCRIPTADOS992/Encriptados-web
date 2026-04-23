/**
 * Página dedicada para Activar Apps (Categoría 371)
 * Reutiliza la plantilla de /apps/[slug] pero con ruta directa /activar-apps
 * El endpoint alimenta todo el contenido dinámicamente
 */
import { getTranslations } from "next-intl/server";
import { getProductConfig } from "../apps/[slug]/productConfig";
import ProductPageContent from "../apps/[slug]/AppClientPage";

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

  return {
    title: `${titleBase} | Encriptados`,
    description: buyNowText,
    openGraph: {
      title: titleBase,
      description: buyNowText,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: titleBase,
        },
      ],
    },
  };
}

export default async function ActivarAppsPage({ params }: PageProps) {
  const { locale } = await params;
  const slug = "activar-apps";

  // Reutiliza el componente de apps, el endpoint alimenta todo el contenido
  return <ProductPageContent slug={slug} locale={locale} initialProduct={null} />;
}
