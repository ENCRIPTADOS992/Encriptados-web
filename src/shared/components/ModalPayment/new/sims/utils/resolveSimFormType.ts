// src/shared/components/ModalPayment/new/sims/utils/resolveSimFormType.ts
"use client";

import type { FormType } from "../types/simFormTypes";
import {
  deriveProductFamily,
  deriveProductFormat,
  deriveProductSlug,
  type ProductFamily,
  type ProductFormat,
  type SimSlug,
} from "@/app/[locale]/sim/[slug]/simProductConfig";

type ModalProduct = {
  id?: number | string;
  provider?: string;
  brand?: string;
  config_sim?: { type?: string; sku?: string; code?: string }[];
  shipping?: string;
  type_product?: string;
  name?: string;
  price?: number | string;
};

/**
 * Resuelve el tipo de formulario para el modal de pago de SIM
 * Usa derivación desde campos backend: provider, type_product
 * 
 * Mapeo:
 * - encrypted + physical → encrypted_physical
 * - encrypted + digital  → encrypted_esim
 * - tim + physical       → tim_physical
 * - tim + digital        → tim_esim
 */
export function resolveSimFormType(product?: ModalProduct | null): FormType {
  if (!product) return "encrypted_generic";

  // Derivar valores normalizados desde campos del backend
  const providerRaw = product.provider ?? product.brand ?? "";
  const typeProductRaw = product.type_product ?? "";
  
  const family = deriveProductFamily(providerRaw);
  const format = deriveProductFormat(typeProductRaw);

  // Logs para debugging
  console.log("[resolveSimFormType] Derivación:", {
    id: product.id,
    provider: providerRaw,
    type_product: typeProductRaw,
    derived: { family, format },
    slug: deriveProductSlug(family, format),
  });

  // Casos especiales para config_sim (recargas, datos, minutos)
  const cfgType = product.config_sim?.[0]?.type?.toLowerCase() ?? "";
  const nameRaw = (product.name ?? "").toLowerCase();

  // Override: eSIM + Recarga Datos
  if (family === "encrypted" && nameRaw.includes("esim + recarga datos")) {
    console.log("[resolveSimFormType] override => encrypted_esimData por nombre");
    return "encrypted_esimData";
  }

  // Casos especiales de config_sim para encrypted
  if (family === "encrypted" && cfgType) {
    if (cfgType === "data") return "encrypted_data";
    if (cfgType === "minutes") return "encrypted_minutes";
    if (cfgType.replace(/[^a-z]/g, "") === "esimdata") return "encrypted_esimData";
  }

  if (family === "tim" && cfgType) {
    if (cfgType === "data") return "tim_data";
    if (cfgType === "minutes") return "tim_minutes";
  }

  // Mapeo principal: family + format → FormType
  if (family === "encrypted") {
    return format === "digital" ? "encrypted_esim" : "encrypted_physical";
  }

  if (family === "tim") {
    return format === "digital" ? "tim_esim" : "tim_physical";
  }

  return "encrypted_generic";
}

/**
 * Obtiene el slug del producto SIM desde los campos del backend
 */
export function getSimSlugFromProduct(product?: ModalProduct | null): SimSlug {
  const providerRaw = product?.provider ?? product?.brand ?? "";
  const typeProductRaw = product?.type_product ?? "";
  
  const family = deriveProductFamily(providerRaw);
  const format = deriveProductFormat(typeProductRaw);
  
  return deriveProductSlug(family, format);
}

/**
 * Retorna los valores derivados del producto
 */
export function getDerivedProductValues(product?: ModalProduct | null): {
  family: ProductFamily;
  format: ProductFormat;
  slug: SimSlug;
  canonicalPath: string;
} {
  const providerRaw = product?.provider ?? product?.brand ?? "";
  const typeProductRaw = product?.type_product ?? "";
  
  const family = deriveProductFamily(providerRaw);
  const format = deriveProductFormat(typeProductRaw);
  const slug = deriveProductSlug(family, format);
  
  return {
    family,
    format,
    slug,
    canonicalPath: `/sim/${slug}`,
  };
}
