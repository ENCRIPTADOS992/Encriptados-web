import { PRODUCT_ROUTES, SIM_PRODUCT_ROUTES } from "@/shared/constants/productRoutes";

// ═══════════════════════════════════════════════════════════════════════════
// DERIVACIÓN DE URL PARA PRODUCTOS SIM
// El backend es la fuente de verdad: provider + type_product → URL correcta
// ═══════════════════════════════════════════════════════════════════════════

type ProductFamily = "encrypted" | "tim";
type ProductFormat = "physical" | "digital";
type SimSlug = "sim-encriptada" | "esim-encriptada" | "tim-sim" | "esim-tim";

/** Deriva family desde el campo `provider` del backend */
function deriveProductFamily(provider: string | undefined): ProductFamily {
  const prov = (provider || "").toLowerCase();
  // Nuevos valores del backend: "encrypted", "tim"
  if (prov === "encrypted" || prov.includes("encript")) return "encrypted";
  if (prov === "tim" || prov.includes("tim")) return "tim";
  return "encrypted"; // fallback
}

/** Deriva format desde el campo `type_product` del backend */
function deriveProductFormat(typeProduct: string | undefined): ProductFormat {
  const tp = (typeProduct || "").toLowerCase();
  if (tp === "digital") return "digital";
  return "physical"; // "Fisico" o cualquier otro valor → physical
}

/** Deriva el slug de la URL combinando family + format */
function deriveSimSlug(family: ProductFamily, format: ProductFormat): SimSlug {
  const slugMap: Record<ProductFamily, Record<ProductFormat, SimSlug>> = {
    encrypted: {
      physical: "sim-encriptada",
      digital: "esim-encriptada",
    },
    tim: {
      physical: "tim-sim",
      digital: "esim-tim",
    },
  };
  return slugMap[family][format];
}

/**
 * Obtiene la URL correcta para un producto SIM basándose en los campos del backend.
 * 
 * @param provider - Campo `provider` del producto (ej: "Sim Encriptados", "Sim TIM")
 * @param typeProduct - Campo `type_product` del producto (ej: "Fisico", "Digital")
 * @returns URL correcta para el producto (ej: "/sim/esim-encriptada")
 * 
 * @example
 * // Producto 59835: provider="Sim Encriptados", type_product="Digital"
 * getSimProductUrl("Sim Encriptados", "Digital") // → "/sim/esim-encriptada"
 */
export function getSimProductUrl(
  provider: string | undefined,
  typeProduct: string | undefined
): string {
  const family = deriveProductFamily(provider);
  const format = deriveProductFormat(typeProduct);
  const slug = deriveSimSlug(family, format);
  return `/sim/${slug}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIÓN PRINCIPAL (actualizada para usar derivación)
// ═══════════════════════════════════════════════════════════════════════════

export const getProductLink = (
  productName: string,
  categoryId: number,
  productId?: number,
  provider?: string,
  typeProduct?: string
): string | null => {
  const baseName = productName.split(" - ")[0].trim();

  if (baseName.toLowerCase().includes("silent phone")) {
    return "/apps/silent-circle";
  }

  if (categoryId === 36) {
    return "/router";
  }

  // SIM products (categoryId 40) - Derivar URL desde backend fields
  if (categoryId === 40) {
    // PRIORIDAD: Derivar desde provider + type_product (backend es fuente de verdad)
    if (provider || typeProduct) {
      return getSimProductUrl(provider, typeProduct);
    }
    
    // FALLBACK: Si no hay campos del backend, buscar por productId (legacy)
    if (productId) {
      const simRoute = SIM_PRODUCT_ROUTES.find(
        (route) => route.productId === productId
      );
      if (simRoute) {
        console.warn(
          `[productRouteResolver] Usando fallback por productId ${productId}. ` +
          `Preferir pasar provider y type_product para derivación correcta.`
        );
        return simRoute.link;
      }
    }
    
    // ÚLTIMO FALLBACK: SIM encriptada por defecto
    return `/sim/sim-encriptada`;
  }

  const item = PRODUCT_ROUTES.find(
    (route) => route.name === baseName && route.categoryId === categoryId
  );

  return item ? item.link : null;
};
