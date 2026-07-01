export const PRODUCT_CATEGORY_IDS = {
  SOFTWARE: Number(process.env.NEXT_PUBLIC_CATEGORY_SOFTWARE) || 439,
  APPS: Number(process.env.NEXT_PUBLIC_CATEGORY_APPS) || 431,
  ROUTERS: Number(process.env.NEXT_PUBLIC_CATEGORY_ROUTERS) || 457,
  SIMS: Number(process.env.NEXT_PUBLIC_CATEGORY_SIMS) || 451,
  ACTIVATE_APPS: Number(process.env.NEXT_PUBLIC_CATEGORY_ACTIVATE_APPS) || 465,
  RECHARGES: Number(process.env.NEXT_PUBLIC_CATEGORY_RECHARGES) || 464,
  ACTIVATE_FIXED_NUMBER: Number(process.env.NEXT_PUBLIC_CATEGORY_ACTIVATE_FIXED_NUMBER) || 372,
} as const;

const PRODUCT_CATEGORY_API_PARAM_BY_ID: Record<number, string> = {
  35: "software",
  36: "routers",
  38: "apps",
  40: "sims",
  371: "activar-apps",
  [PRODUCT_CATEGORY_IDS.SOFTWARE]: "software",
  [PRODUCT_CATEGORY_IDS.APPS]: "apps",
  [PRODUCT_CATEGORY_IDS.ROUTERS]: "routers",
  [PRODUCT_CATEGORY_IDS.RECHARGES]: "recargas",
  [PRODUCT_CATEGORY_IDS.SIMS]: "sims", // SIMs takes precedence if both point to the same ID (e.g., 40 in staging)
  [PRODUCT_CATEGORY_IDS.ACTIVATE_APPS]: "activar-apps",
  [PRODUCT_CATEGORY_IDS.ACTIVATE_FIXED_NUMBER]: "activar-numero-fijo",
};

export const PRODUCT_LIST_CATEGORY_IDS = [
  PRODUCT_CATEGORY_IDS.SOFTWARE,
  PRODUCT_CATEGORY_IDS.APPS,
  PRODUCT_CATEGORY_IDS.ROUTERS,
  PRODUCT_CATEGORY_IDS.SIMS,
  PRODUCT_CATEGORY_IDS.ACTIVATE_APPS,
] as const;

export const isSimCategoryId = (categoryId?: number | string | null) =>
  Number(categoryId) === PRODUCT_CATEGORY_IDS.SIMS;

export const isRouterCategoryId = (categoryId?: number | string | null) =>
  Number(categoryId) === PRODUCT_CATEGORY_IDS.ROUTERS;

export const isSoftwareCategoryId = (categoryId?: number | string | null) =>
  Number(categoryId) === PRODUCT_CATEGORY_IDS.SOFTWARE;

export const isAppCategoryId = (categoryId?: number | string | null) =>
  Number(categoryId) === PRODUCT_CATEGORY_IDS.APPS;

export const isActivateAppsCategoryId = (categoryId?: number | string | null) =>
  Number(categoryId) === PRODUCT_CATEGORY_IDS.ACTIVATE_APPS;

export const isActivateFixedNumberCategoryId = (categoryId?: number | string | null) =>
  Number(categoryId) === PRODUCT_CATEGORY_IDS.ACTIVATE_FIXED_NUMBER;

export const isLicenseCategoryId = (categoryId?: number | string | null) =>
  isSoftwareCategoryId(categoryId) ||
  isAppCategoryId(categoryId) ||
  isRouterCategoryId(categoryId) ||
  isActivateAppsCategoryId(categoryId) ||
  isActivateFixedNumberCategoryId(categoryId);

export const getProductCategoryApiParam = (
  categoryId?: number | string | null
): string | undefined => {
  if (categoryId === null || categoryId === undefined || categoryId === "") {
    return undefined;
  }

  if (typeof categoryId === "string") {
    const trimmed = categoryId.trim();
    if (!trimmed) return undefined;
    if (!/^\d+$/.test(trimmed)) return trimmed;
  }

  const numericId = Number(categoryId);
  if (Number.isNaN(numericId)) return undefined;

  return PRODUCT_CATEGORY_API_PARAM_BY_ID[numericId] ?? String(numericId);
};
