import { getProductById, getProductBySlug } from "@/features/products/services";
import { getProductConfig } from "./productConfig";
import ProductPageContent from "./AppClientPage";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = params;
  const t = await getTranslations({ locale, namespace: "appsShared.productTemplate" });
  
  // Intentar obtener config estática primero (legacy)
  const config = getProductConfig(slug);
  let product = null;

  try {
    if (config?.productId) {
      product = await getProductById(String(config.productId), locale);
    } else {
      // Si no hay config estática, buscar por slug dinámico
      product = await getProductBySlug(slug, locale);
    }

    if (!product) return {};

    const imageUrl = product.iconUrl || product.images?.[0]?.src || "/images/logo-encriptados.png";
    const buyNowText = t("buyNow");

    return {
      title: `${product.name} | Encriptados`,
      description: buyNowText,
      openGraph: {
        title: product.name,
        description: buyNowText,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: product.name,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for App:", error);
    return {};
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, locale } = params;
  const config = getProductConfig(slug);
  let initialProduct = null;

  try {
    if (config?.productId) {
       // Camino A: Configuración estática existente
       // Usamos fetch con revalidación para cachear la respuesta y evitar timeouts en visitas subsecuentes
       // Nota: getProductById usa axios internamente, que no soporta 'next: { revalidate }' directamente.
       // Si queremos cache, debemos implementarlo en services.ts o confiar en el cache de la API.
       // Por ahora, asumimos que getProductById funciona.
      initialProduct = await getProductById(String(config.productId), locale);
    } else {
      // Camino B: Búsqueda dinámica por slug
      initialProduct = await getProductBySlug(slug, locale);
    }
  } catch (error) {
    console.error("Error fetching product server-side:", error);
  }

  // Si hay config pero falló la API, renderizamos la página con datos parciales del config
  // para evitar 404 o Error page. El componente AppClientPage manejará datos faltantes.
  if (!initialProduct && config) {
    console.warn(`⚠️ [ProductPage] API falló para ${slug} (ID: ${config.productId}), usando fallback estático.`);
    // Construimos un producto "dummy" con los datos estáticos disponibles
    initialProduct = {
        id: config.productId,
        name: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '), // Aprox name
        price: "0",
        regular_price: "0",
        description: "",
        short_description: "",
        slug: slug,
        categories: [{ id: config.categoryId, name: "", slug: "" }],
        images: [{ src: config.productImage, name: "", alt: "" }],
        attributes: [],
        variations: [],
        meta_data: [],
        acf: {},
        licenseVariants: []
    } as any; // Cast a any/Product para cumplir tipos mínimos
  }

  // Si no se encuentra producto ni por config ni por slug dinámico -> 404
  if (!initialProduct && !config) {
    notFound();
  }
  
  return <ProductPageContent slug={slug} locale={locale} initialProduct={initialProduct} />;
}

