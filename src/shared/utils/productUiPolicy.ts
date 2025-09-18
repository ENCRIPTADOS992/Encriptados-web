// src/shared/utils/productUiPolicy.ts
import { PRODUCT_ROUTES } from "@/shared/constants/productRoutes";
import type { ProductRouteItem, AllowedMode } from "@/shared/constants/productRoutes";
import type { CategoryKind } from "@/shared/utils/getProductCategoryKind";
import { ProductPolicies } from "@/shared/policies/productPolicies";


const norm = (s?: string) =>
  (s ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function findRouteItem(product: any, selectedOption?: number): ProductRouteItem | undefined {
  const pname = norm(product?.name);

  // 1) Intento por nombre / displayNames
  const byName = PRODUCT_ROUTES.find((it) => {
    const names = [it.name, ...(it.displayNames ?? [])].map(norm);
    return names.includes(pname);
  });
  if (byName) return byName;

  // 2) Fallback por categoryId SOLO si es único
  if (selectedOption) {
    const byCat = PRODUCT_ROUTES.filter((it) => it.categoryId === selectedOption);
    if (byCat.length === 1) {
      return byCat[0]; // único → confiable
    }
    // Si hay varios con el mismo categoryId (como 38), NO devolver nada
  }

  return undefined;
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
