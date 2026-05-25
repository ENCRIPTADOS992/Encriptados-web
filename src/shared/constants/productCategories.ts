export const PRODUCT_CATEGORY_IDS = {
  SOFTWARE: 439,
  APPS: 431,
  ROUTERS: 457,
  SIMS: 451,
  ACTIVATE_APPS: 465,
  RECHARGES: 464,
} as const;

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

export const isLicenseCategoryId = (categoryId?: number | string | null) =>
  isSoftwareCategoryId(categoryId) ||
  isAppCategoryId(categoryId) ||
  isRouterCategoryId(categoryId) ||
  isActivateAppsCategoryId(categoryId);
