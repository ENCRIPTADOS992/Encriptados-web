import { SIM_PRODUCT_ROUTES } from "@/shared/constants/productRoutes";
import {
  isActivateAppsCategoryId,
  isActivateFixedNumberCategoryId,
  isRouterCategoryId,
  isSimCategoryId,
} from "@/shared/constants/productCategories";
import { generateSlug } from "@/shared/utils/slugUtils";

type ProductFamily = "encrypted" | "tim";
type ProductFormat = "physical" | "digital";
type SimSlug = "sim-encriptada" | "esim-encriptada" | "tim-sim" | "esim-tim";

// Known product IDs (language-independent, primary detection)
const ACTIVAR_APPS_PRODUCT_IDS = new Set([61588, 61021]);
const ACTIVAR_NUMERO_FIJO_PRODUCT_ID = 62337;
const RECARGA_NUMERO_FIJO_PRODUCT_ID = 62421;

// Multi-language regex patterns
// es: recarga/recargar, en: top up/recharge, fr: recharger, it: ricaricare, pt: recarregar
const RE_RECHARGE = /recarga[r]?|top[\s\-]?up|recharge|recharger|ricaricar[ei]|recarregar/i;
// es: número fijo, en: landline/fixed number, fr: numéro fixe, it: numero fisso, pt: número fixo
const RE_FIXED_NUMBER = /n[uú]mero\s*fijo|landline|fixed\s*number|num[eé]ro\s*fixe?|numero\s*fisso|n[uú]mero\s*fixo/i;
// es: activar, en: activate, fr: activer, it: attivare, pt: ativar
const RE_ACTIVATE = /activar|activate|activer|attivare|ativar/i;

export function isRecargaNumeroFijoProduct(
  productName?: string,
  categoryId?: number,
  productId?: number,
): boolean {
  if (productId === RECARGA_NUMERO_FIJO_PRODUCT_ID) return true;
  const name = productName || "";
  return Boolean(
    (RE_RECHARGE.test(name) && RE_FIXED_NUMBER.test(name)) ||
    (RE_RECHARGE.test(name) && isActivateFixedNumberCategoryId(categoryId))
  );
}

export function isActivarNumeroFijoProduct(
  productName?: string,
  categoryId?: number,
  productId?: number,
): boolean {
  if (productId === ACTIVAR_NUMERO_FIJO_PRODUCT_ID) return true;
  if (isRecargaNumeroFijoProduct(productName, categoryId, productId)) return false;
  const name = productName || "";
  return Boolean(
    (isActivateFixedNumberCategoryId(categoryId)) ||
    (RE_ACTIVATE.test(name) && RE_FIXED_NUMBER.test(name))
  );
}

export function isActivarAppsProduct(
  productName?: string,
  categoryId?: number,
  productId?: number
): boolean {
  return Boolean(
    isActivateAppsCategoryId(categoryId) ||
      isActivateFixedNumberCategoryId(categoryId) ||
      (productId && ACTIVAR_APPS_PRODUCT_IDS.has(productId)) ||
      productId === ACTIVAR_NUMERO_FIJO_PRODUCT_ID ||
      productId === RECARGA_NUMERO_FIJO_PRODUCT_ID ||
      (RE_ACTIVATE.test(productName || "") && /apps?/i.test(productName || "")) ||
      (RE_ACTIVATE.test(productName || "") && RE_FIXED_NUMBER.test(productName || "")) ||
      (RE_RECHARGE.test(productName || "") && RE_FIXED_NUMBER.test(productName || ""))
  );
}

function deriveProductFamily(provider: string | undefined): ProductFamily {
  const prov = (provider || "").toLowerCase();
  if (prov === "encrypted" || prov.includes("encript")) return "encrypted";
  if (prov === "tim" || prov.includes("tim")) return "tim";
  return "encrypted";
}

function deriveProductFormat(typeProduct: string | undefined): ProductFormat {
  const tp = (typeProduct || "").toLowerCase();
  if (tp === "digital") return "digital";
  return "physical";
}

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

export function getSimProductUrl(
  provider: string | undefined,
  typeProduct: string | undefined
): string {
  const family = deriveProductFamily(provider);
  const format = deriveProductFormat(typeProduct);
  const slug = deriveSimSlug(family, format);
  return `/sim/${slug}`;
}

export function getCanonicalSimProductId(
  provider: string | undefined,
  typeProduct: string | undefined,
  fallbackProductId?: number
): number | undefined {
  if (fallbackProductId) {
    return fallbackProductId;
  }

  const simUrl = getSimProductUrl(provider, typeProduct);
  const routeBySlug = SIM_PRODUCT_ROUTES.find((route) => route.link === simUrl);
  if (routeBySlug) {
    return routeBySlug.productId;
  }

  return undefined;
}

export const getProductLink = (
  productName: string,
  categoryId: number,
  productId?: number,
  provider?: string,
  typeProduct?: string
): string | null => {
  if (isRecargaNumeroFijoProduct(productName, categoryId, productId)) {
    return "/recarga-numero-fijo";
  }

  if (isActivarNumeroFijoProduct(productName, categoryId, productId)) {
    return "/activar-numero-fijo";
  }

  if (isActivarAppsProduct(productName, categoryId, productId)) {
    return "/activar-apps";
  }

  if (
    productName.toLowerCase().includes("router") ||
    productName.toLowerCase().includes("camaleon") ||
    productName.toLowerCase().includes("camaleón")
  ) {
    return "/apps/router-camaleon";
  }

  if (isRouterCategoryId(categoryId)) {
    return "/apps/router-camaleon";
  }

  if (isSimCategoryId(categoryId)) {
    if (provider || typeProduct) {
      return getSimProductUrl(provider, typeProduct);
    }

    if (productId) {
      const simRoute = SIM_PRODUCT_ROUTES.find((route) => route.productId === productId);
      if (simRoute) {
        return simRoute.link;
      }
    }

    return "/sim/sim-encriptada";
  }

  const baseName = productName.split(" - ")[0].trim();
  const slug = generateSlug(baseName);
  return `/apps/${slug}`;
};
