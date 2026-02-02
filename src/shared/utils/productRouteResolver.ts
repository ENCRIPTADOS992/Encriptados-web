import { PRODUCT_ROUTES, SIM_PRODUCT_ROUTES } from "@/shared/constants/productRoutes";
import { generateSlug } from "@/shared/utils/slugUtils";

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
// FUNCIÓN PRINCIPAL (actualizada para usar derivación y slugify como la App)
// ═══════════════════════════════════════════════════════════════════════════

export const getProductLink = (
  productName: string,
  categoryId: number,
  productId?: number,
  provider?: string,
  typeProduct?: string
): string | null => {
  // 0. Excepción Global: Router Camaleón siempre va a /apps/router-camaleon
  if (
    productName.toLowerCase().includes("router") ||
    productName.toLowerCase().includes("camaleon") ||
    productName.toLowerCase().includes("camaleón")
  ) {
    return "/apps/router-camaleon";
  }

  // 1. Routers
  if (categoryId === 36) {
    return "/apps/router-camaleon";
  }

  // 2. SIMs (Categoría 40)
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
        return simRoute.link;
      }
    }

    // ÚLTIMO FALLBACK: SIM encriptada por defecto
    return `/sim/sim-encriptada`;
  }

  // 3. Apps (38) y Software (35) - Generación dinámica por slug
  // Usamos generateSlug (mismo que slugify en la App)

  const baseName = productName.split(" - ")[0].trim();
  const slug = generateSlug(baseName);

  // Retornar ruta generada dinámicamente
  return `/apps/${slug}`;
};

