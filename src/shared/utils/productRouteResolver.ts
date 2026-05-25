import { SIM_PRODUCT_ROUTES } from "@/shared/constants/productRoutes";
import {
  isActivateAppsCategoryId,
  isRouterCategoryId,
  isSimCategoryId,
} from "@/shared/constants/productCategories";
import { generateSlug } from "@/shared/utils/slugUtils";

type ProductFamily = "encrypted" | "tim";
type ProductFormat = "physical" | "digital";
type SimSlug = "sim-encriptada" | "esim-encriptada" | "tim-sim" | "esim-tim";

const ACTIVAR_APPS_PRODUCT_IDS = new Set([61588]);

export function isActivarAppsProduct(
  productName?: string,
  categoryId?: number,
  productId?: number
): boolean {
  return Boolean(
    isActivateAppsCategoryId(categoryId) ||
      (productId && ACTIVAR_APPS_PRODUCT_IDS.has(productId)) ||
      /activar\s*apps?/i.test(productName || "")
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

export const getProductLink = (
  productName: string,
  categoryId: number,
  productId?: number,
  provider?: string,
  typeProduct?: string
): string | null => {
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
