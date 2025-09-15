// src/shared/utils/productUiPolicy.ts
import { PRODUCT_ROUTES } from "@/shared/constants/productRoutes";
import type { ProductRouteItem, AllowedMode } from "@/shared/constants/productRoutes";
import type { CategoryKind } from "@/shared/utils/getProductCategoryKind";
import { ProductPolicies } from "@/shared/policies/productPolicies";


const norm = (s?: string) =>
  (s ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function findRouteItem(product: any, selectedOption?: number): ProductRouteItem | undefined {
  const pname = norm(product?.name);
  return PRODUCT_ROUTES.find((it) => {
    const names = [it.name, ...(it.displayNames ?? [])].map(norm);
    // match por nombre o (como fallback suave) por categoryId == selectedOption
    return names.includes(pname) || (selectedOption && it.categoryId === selectedOption);
  });
}

export function getUiPolicyForProduct(opts: {
  product: any;
  kind: CategoryKind;
  selectedOption?: number;
}) {
  const base = ProductPolicies[opts.kind];
  const route = findRouteItem(opts.product, opts.selectedOption);

  // Regla base: solo SIM muestra tabs, el resto no (lo puedes cambiar si prefieres)
  let showTabs = opts.kind === "SIM";
  let allowedModes: AllowedMode[] = ["new_user", "roning_code", "recharge"];

  // Overrides desde catálogo si existen
  if (route?.uiPolicy?.showTabs !== undefined) {
    showTabs = route.uiPolicy.showTabs;
  }
  if (route?.uiPolicy?.allowedModes) {
    allowedModes = route.uiPolicy.allowedModes;
  }

  return {
    ...base,        // keep showShippingFields, paymentMethods, etc.
    showTabs,       // <- usar en PurchaseTabs/Scaffold
    allowedModes,   // <- filtrar botones
    routeItem: route,
  };
}
