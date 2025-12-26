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

export function transformVariantsToPlans(variants: any[] | undefined): LicensePlan[] {
  if (!variants || variants.length === 0) {
    return [{ label: "Licencia Única", value: "1", price: 0, variantId: 0, sku: "" }];
  }
  
  return variants.map(variant => ({
    label: `Licencia ${variant.licensetime} ${Number(variant.licensetime) === 1 ? 'Mes' : 'Meses'}`,
    value: String(variant.licensetime),
    price: Number(variant.price),
    variantId: variant.id,
    sku: variant.sku || "",
  }));
}

export function getRadioOptionsFromPlans(plans: LicensePlan[]): string[] {
  return plans.map(plan => plan.label);
}

export function transformAdvantagesToFeaturesGrid(
  product: ProductById | null,
  fallbackImage: string = "/images/apps/default-feature.png"
): FeatureGridItem[] {
  if (!product?.advantages) return [];
  
  return product.advantages.map(advantage => ({
    image: advantage.image || fallbackImage,
    title: advantage.name,
    description: advantage.description,
  }));
}

export function transformFeaturesToBenefitsGrid(
  product: ProductById | null,
  config: ProductStaticConfig | null
): BenefitGridItem[] {
  if (!product?.features) return [];
  
  const fallbackIcon = config?.benefitIcon || "/images/apps/default-icon.png";
  
  return product.features.map(feature => ({
    icon: feature.image || fallbackIcon,
    title: feature.name,
    description: feature.description,
  }));
}

export function transformFaqs(product: ProductById | null): FAQItem[] {
  if (!product?.faqs) return [];
  
  return product.faqs.map(faq => ({
    question: faq.name,
    answer: faq.description,
  }));
}

export function formatPrice(price: string | number, currency: string = "USD"): string {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numericPrice)) return "Consultar precio";
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

export function buildProductInfo(
  product: ProductById | null,
  config: ProductStaticConfig | null,
  selectedPlan: LicensePlan | null,
  onBuy: () => void,
  onChat: () => void
): ProductInfoForBanner {
  return {
    title: product?.name || "Producto",
    price: selectedPlan ? formatPrice(selectedPlan.price) : formatPrice(product?.price || 0),
    subtitle: product?.description?.substring(0, 100) + "..." || "Comunicación cifrada y segura",
    iconUrl: config?.iconUrl || "/images/apps/default-logo.png",
    ctaLabel: "Comprar ahora",
    categoryId: product?.category?.id || 38,
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
