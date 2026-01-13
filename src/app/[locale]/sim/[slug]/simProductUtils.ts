/**
 * Utilidades para transformar datos de la API a los formatos de UI
 * para productos SIM, eSIM y TIM-SIM
 */

import type { ProductById } from "@/features/products/types/AllProductsResponse";
import type { SimProductStaticConfig } from "./simProductConfig";

export interface SimPlan {
  label: string;
  value: string;
  price: number;
  variantId: number;
  sku: string;
  dataAmount?: string; // "5GB", "10GB", etc.
  duration?: string; // "30 días", "60 días"
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

export interface CoverageInfo {
  countries: string[];
  regions: string[];
}

export function transformChecksToFeatures(product: ProductById | null): string[] {
  if (!product?.checks) return [];
  return product.checks.map(check => check.name);
}

export interface SimTranslations {
  plan: string;          // "Plan", "Plan"
  days: string;          // "días", "days"
  unlimited: string;     // "Ilimitado", "Unlimited"
  dataIncluded: string;  // "Datos incluidos", "Data included"
}

const defaultSimTranslations: SimTranslations = {
  plan: "Plan",
  days: "días",
  unlimited: "Ilimitado",
  dataIncluded: "Datos incluidos",
};

/**
 * Transforma variantes a planes de SIM
 * @param variants - Array de variantes del producto
 * @param product - Producto principal (usado si no hay variantes)
 * @param translations - Traducciones para los labels (opcional)
 */
export function transformVariantsToSimPlans(
  variants: any[] | undefined,
  product?: ProductById | null,
  translations?: SimTranslations
): SimPlan[] {
  const t = translations || defaultSimTranslations;
  
  // Si hay variantes, usarlas
  if (variants && variants.length > 0) {
    return variants.map(variant => {
      const dataAmount = variant.data_amount || variant.name || "";
      const duration = variant.duration || variant.licensetime || "30";
      
      return {
        label: `${t.plan} ${dataAmount}`,
        value: String(variant.id),
        price: Number(variant.price),
        variantId: variant.id,
        sku: variant.sku || "",
        dataAmount,
        duration: `${duration} ${t.days}`,
      };
    });
  }
  
  // Si NO hay variantes, usar datos del producto principal
  if (product) {
    const price = Number((product as any).price) || 0;
    
    return [{
      label: `${t.plan} ${t.dataIncluded}`,
      value: String(product.id),
      price: price,
      variantId: product.id,
      sku: (product as any).sku || "",
      dataAmount: t.unlimited,
      duration: `30 ${t.days}`,
    }];
  }
  
  return [];
}

export function getRadioOptionsFromSimPlans(plans: SimPlan[]): string[] {
  return plans.map(plan => plan.label);
}

export function transformAdvantagesToFeaturesGrid(
  product: ProductById | null,
  fallbackImage: string = "/images/encrypted-sim/icons/feature.png"
): FeatureGridItem[] {
  if (!product?.features) return [];
  
  return product.features.map(feature => ({
    image: feature.image || fallbackImage,
    title: feature.name,
    description: feature.description,
  }));
}

export function transformFeaturesToBenefitsGrid(
  product: ProductById | null,
  config: SimProductStaticConfig | null
): BenefitGridItem[] {
  if (!product?.advantages) return [];
  
  const fallbackIcon = config?.benefitIcon || "/images/encrypted-sim/icons/check-icon.png";
  
  return product.advantages.map(advantage => ({
    icon: advantage.image || fallbackIcon,
    title: advantage.name,
    description: advantage.description,
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

export interface SimProductInfoForBanner {
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

export interface BuildSimProductInfoTranslations {
  buyNow: string;
  priceConsult: string;
  defaultSubtitle: string;
}

const defaultBuildTranslations: BuildSimProductInfoTranslations = {
  buyNow: "Comprar ahora",
  priceConsult: "Consultar precio",
  defaultSubtitle: "Comunicación cifrada y segura",
};

export function buildSimProductInfo(
  product: ProductById | null,
  config: SimProductStaticConfig | null,
  selectedPlan: SimPlan | null,
  onBuy: () => void,
  onChat: () => void,
  translations?: BuildSimProductInfoTranslations
): SimProductInfoForBanner {
  const t = translations || defaultBuildTranslations;
  return {
    title: product?.name || "Producto SIM",
    price: selectedPlan 
      ? formatPrice(selectedPlan.price, "USD", t.priceConsult) 
      : formatPrice(product?.price || 0, "USD", t.priceConsult),
    subtitle: product?.description?.substring(0, 100) + "..." || t.defaultSubtitle,
    iconUrl: config?.iconUrl || "/images/encrypted-sim/icons/sim-icon.png",
    ctaLabel: t.buyNow,
    categoryId: product?.category?.id || 40,
    productId: product?.id || config?.productId || 0,
    onBuy,
    onChat,
  };
}
