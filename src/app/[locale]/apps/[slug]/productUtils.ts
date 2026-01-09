/**
 * Utilidades para transformar datos de la API a los formatos de UI
 */

import type { ProductById } from "@/features/products/types/AllProductsResponse";
import type { ProductStaticConfig } from "./productConfig";

export interface LicensePlan {
  label: string;
  value: string;
  price: number;
  variantId: number;
  sku: string;
}

export interface FeatureGridItem {
  image: string;
  title: string;
  description: string;
}

export interface BenefitGridItem {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SecurityFeatureItem {
  title: string;
  description: string;
}

export function transformChecksToFeatures(product: ProductById | null): string[] {
  if (!product?.checks) return [];
  return product.checks.map(check => check.name);
}

export interface LicenseTranslations {
  license: string;        // "Licencia", "License", "Licence", etc.
  month: string;          // "Mes", "Month", "Mois", etc.
  months: string;         // "Meses", "Months", "Mois", etc.
  unique: string;         // "Única", "One-time", "Unique", etc.
}

const defaultLicenseTranslations: LicenseTranslations = {
  license: "Licencia",
  month: "Mes",
  months: "Meses",
  unique: "Única",
};

/**
 * Transforma variantes a planes de licencia
 * Si no hay variantes, usa licensetime y price del producto principal
 * @param variants - Array de variantes del producto
 * @param product - Producto principal (usado si no hay variantes)
 * @param translations - Traducciones para los labels (opcional)
 */
export function transformVariantsToPlans(
  variants: any[] | undefined,
  product?: ProductById | null,
  translations?: LicenseTranslations
): LicensePlan[] {
  const t = translations || defaultLicenseTranslations;
  
  // Si hay variantes, usarlas
  if (variants && variants.length > 0) {
    return variants.map(variant => {
      const count = Number(variant.licensetime);
      const monthLabel = count === 1 ? t.month : t.months;
      return {
        label: `${t.license} ${variant.licensetime} ${monthLabel}`,
        value: String(variant.licensetime),
        price: Number(variant.price),
        variantId: variant.id,
        sku: variant.sku || "",
      };
    });
  }
  
  // Si NO hay variantes, usar licensetime y price del producto
  if (product) {
    const licensetime = (product as any).licensetime || "1";
    const price = Number((product as any).price) || 0;
    const count = Number(licensetime);
    const licenseLabel = licensetime === "0" || licensetime === "Única" || licensetime === "unique"
      ? t.unique 
      : `${licensetime} ${count === 1 ? t.month : t.months}`;
    
    return [{
      label: `${t.license} ${licenseLabel}`,
      value: licensetime,
      price: price,
      variantId: (product as any).id || 0,
      sku: (product as any).sku || "",
    }];
  }
  
  // Fallback si no hay nada
  return [{ label: `${t.license} ${t.unique}`, value: "1", price: 0, variantId: 0, sku: "" }];
}

export function getRadioOptionsFromPlans(plans: LicensePlan[]): string[] {
  return plans.map(plan => plan.label);
}

export function transformAdvantagesToFeaturesGrid(
  product: ProductById | null,
  fallbackImage: string = ""
): FeatureGridItem[] {
  // Usar 'features' de la API (tienen las screenshots/imágenes grandes)
  if (!product?.features) return [];
  
  // Solo incluir features que tengan imagen Y (título o descripción)
  // Si no hay imagen, no tiene sentido mostrar en este grid visual
  return product.features
    .filter(feature => 
      feature.image?.trim() && 
      (feature.name?.trim() || feature.description?.trim())
    )
    .map(feature => ({
      image: feature.image || fallbackImage,
      title: feature.name?.trim() || "",
      description: feature.description?.trim() || "",
    }));
}

export function transformFeaturesToBenefitsGrid(
  product: ProductById | null,
  config: ProductStaticConfig | null
): BenefitGridItem[] {
  // Usar 'advantages' de la API (tienen los iconos pequeños)
  if (!product?.advantages) return [];
  
  const fallbackIcon = ""; // Vacío para que el componente use CheckCircle
  
  // Filtrar advantages que tengan al menos título o descripción
  return product.advantages
    .filter(advantage => advantage.name?.trim() || advantage.description?.trim())
    .map(advantage => ({
      icon: advantage.image || fallbackIcon,
      title: advantage.name?.trim() || "",
      description: advantage.description?.trim() || "",
    }));
}

export function transformFaqs(product: ProductById | null): FAQItem[] {
  if (!product?.faqs) return [];
  
  return product.faqs.map(faq => ({
    question: faq.name,
    answer: faq.description,
  }));
}

export function formatPrice(
  price: string | number, 
  currency: string = "USD",
  consultText: string = "Consultar precio"
): string {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numericPrice)) return consultText;
  return `${numericPrice}$ ${currency}`;
}

export interface ProductInfoForBanner {
  title: string;
  price: string;
  subtitle: string;
  iconUrl: string;
  ctaLabel: string;
  categoryId: number;
  productId: number;
  onBuy: () => void;
  onChat: () => void;
}

export interface BuildProductInfoTranslations {
  buyNow: string;
  priceConsult: string;
  defaultSubtitle: string;
}

const defaultBuildTranslations: BuildProductInfoTranslations = {
  buyNow: "Comprar ahora",
  priceConsult: "Consultar precio",
  defaultSubtitle: "Comunicación cifrada y segura",
};

export function buildProductInfo(
  product: ProductById | null,
  config: ProductStaticConfig | null,
  selectedPlan: LicensePlan | null,
  onBuy: () => void,
  onChat: () => void,
  translations?: BuildProductInfoTranslations
): ProductInfoForBanner {
  const t = translations || defaultBuildTranslations;
  
  // Priorizar datos del backend sobre la configuración estática
  const iconUrl = (product as any)?.iconUrl || config?.iconUrl || "/images/apps/default-logo.png";
  
  return {
    title: product?.name || "Producto",
    price: selectedPlan ? formatPrice(selectedPlan.price, "USD", t.priceConsult) : formatPrice(product?.price || 0, "USD", t.priceConsult),
    subtitle: product?.description?.substring(0, 100) + "..." || t.defaultSubtitle,
    iconUrl,
    ctaLabel: t.buyNow,
    categoryId: product?.category?.id || config?.categoryId || 38,
    productId: product?.id || config?.productId || 0,
    onBuy,
    onChat,
  };
}

/**
 * Transforma los checks o advantages del producto en SecurityFeatures
 * para productos tipo "software"
 */
export function transformSecurityFeatures(product: ProductById | null): SecurityFeatureItem[] {
  if (!product) return [];
  
  // Primero intenta usar advantages si existen
  if (product.advantages && product.advantages.length > 0) {
    return product.advantages.map(adv => ({
      title: adv.name,
      description: adv.description || "",
    }));
  }
  
  // Fallback a checks si no hay advantages
  if (product.checks && product.checks.length > 0) {
    return product.checks.map(check => ({
      title: check.name,
      description: "", // checks solo tiene 'name', no 'description'
    }));
  }
  
  return [];
}

/**
 * Interfaz para las imágenes del banner por breakpoint
 */
export interface ProductBannerImages {
  desktop: string;
  tablet: string;
  mobile: string;
}

/**
 * Obtiene las imágenes del HERO BANNER del producto
 * 
 * Solo usa heroBanners del API o config estático como fallback.
 * 
 * @param product - Datos del producto de la API
 * @param config - Configuración estática del producto (fallback)
 * @returns Objeto con las URLs de las imágenes por breakpoint
 */
export function getProductBannerImages(
  product: ProductById | null,
  config?: ProductStaticConfig | null
): ProductBannerImages {
  const heroBanners = (product as any)?.heroBanners;
  
  return {
    desktop: heroBanners?.desktop || config?.heroBanners?.desktop || "",
    tablet: heroBanners?.tablet || config?.heroBanners?.tablet || "",
    mobile: heroBanners?.mobile || config?.heroBanners?.mobile || "",
  };
  
  return { desktop, tablet, mobile };
}
