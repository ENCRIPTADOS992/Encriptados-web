import { ProductFilters } from "../types/ProductFilters";
import { PRODUCT_CATEGORY_IDS } from "@/shared/constants/productCategories";

export const defaultProductFilters: ProductFilters = {
  selectedOption: String(PRODUCT_CATEGORY_IDS.SIMS),
  provider: "all",
  os: "all",
  license: "all",
  encriptadosprovider: "all",
  timprovider: "all",
};
