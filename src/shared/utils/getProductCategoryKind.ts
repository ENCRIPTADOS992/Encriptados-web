import {
  PRODUCT_CATEGORY_IDS,
  isActivateAppsCategoryId,
  isActivateFixedNumberCategoryId,
  isAppCategoryId,
  isRouterCategoryId,
  isSimCategoryId,
  isSoftwareCategoryId,
} from "@/shared/constants/productCategories";

export type CategoryKind = "SIM" | "SOFTWARE" | "APLICACIONES" | "ROUTERS" | "DESCONOCIDO";

type MaybeNum = number | string | undefined | null;

const norm = (s?: string) =>
  (s ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const isTrue = (v?: string | boolean | number) =>
  ["true", "1", "si", "sí", "yes", "y"].includes(norm(String(v)));

const inCategory = (id: MaybeNum, name: string | undefined, needle: RegExp) => {
  const n = norm(name);
  return needle.test(n);
};

const mapSelectedOptionToKind = (selectedOption?: number): CategoryKind | null => {
  switch (selectedOption) {
    case PRODUCT_CATEGORY_IDS.SIMS:
      return "SIM";
    case PRODUCT_CATEGORY_IDS.SOFTWARE:
      return "SOFTWARE";
    case PRODUCT_CATEGORY_IDS.APPS:
    case PRODUCT_CATEGORY_IDS.ACTIVATE_APPS:
    case PRODUCT_CATEGORY_IDS.ACTIVATE_FIXED_NUMBER:
      return "APLICACIONES";
    case PRODUCT_CATEGORY_IDS.ROUTERS:
      return "ROUTERS";
    default:
      return null;
  }
};

export function getProductCategoryKind(
  product: any,
  extra?: {
    selectedOption?: number;
    categoryId?: MaybeNum;
    categoryName?: string;
  }
): { kind: CategoryKind; reason: string } {
  const name = norm(product?.name);
  const slug = norm(product?.slug || product?.post_name);
  const typeProd = norm(product?.type_product);
  const shipProd = norm(product?.shipping);
  const cfgProd = norm(product?.config_sim?.[0]?.type);
  const brand = norm(product?.brand || product?.provider);
  const tagsArray = (Array.isArray(product?.tags) ? product.tags : []) as string[];
  const tags = norm(tagsArray.join(" "));
  const dl = norm(product?.downloadable);
  const catId = extra?.categoryId ?? product?.category?.id;
  const catName = extra?.categoryName ?? product?.category?.name;
  const hint = mapSelectedOptionToKind(extra?.selectedOption);

  const isActivarApps =
    isActivateAppsCategoryId(catId) ||
    isActivateFixedNumberCategoryId(catId) ||
    Number(product?.id ?? product?.productId) === 61588 ||
    Number(product?.id ?? product?.productId) === 61021 ||
    Number(product?.id ?? product?.productId) === 62337 ||
    Number(product?.id ?? product?.productId) === 62421 ||
    /activar\s*apps?|activate\s*apps?|activer\s*(les\s*)?apps?|attivare\s*(le\s*)?apps?|ativar\s*apps?/.test(name) ||
    /activar[-_\s]*apps?/.test(slug) ||
    /(activar|activate|activer|attivare|ativar).*(n[uú]mero\s*fijo|landline|num[eé]ro\s*fixe?|numero\s*fisso|n[uú]mero\s*fixo)/.test(name) ||
    /(recarga[r]?|top[\s\-]?up|recharge|recharger|ricaricar[ei]|recarregar).*(n[uú]mero\s*fijo|landline|num[eé]ro\s*fixe?|numero\s*fisso|n[uú]mero\s*fixo)/.test(name);

  if (isActivarApps) {
    return { kind: "APLICACIONES", reason: "Activar Apps usa plantilla de aplicaciones" };
  }

  if (
    isRouterCategoryId(catId) ||
    /router|mifi|hotspot|cpe/.test(name) ||
    /router|mifi|hotspot|cpe/.test(typeProd) ||
    inCategory(catId, catName, /router|mifi|hotspot|cpe/) ||
    /router|mifi|hotspot|cpe/.test(tags)
  ) {
    return { kind: "ROUTERS", reason: "nombre/type_product/categoria/tags senalan router" };
  }

  if (
    isSimCategoryId(catId) ||
    ["esim", "data", "minutes"].includes(cfgProd) ||
    /\besim\b|\bsim\b/.test(typeProd) ||
    /\besim\b|\bsim\b/.test(name) ||
    inCategory(catId, catName, /sim/) ||
    isTrue(shipProd)
  ) {
    return { kind: "SIM", reason: "config_sim/type_product/name/categoria/ship senalan SIM" };
  }

  if (
    isAppCategoryId(catId) ||
    /app|aplicaci(o|ó)n|mobile|android|ios|macos|windows|plugin|extension/.test(name) ||
    (/app|software/.test(typeProd) && /android|ios|mac|win|linux/.test(`${brand} ${tags}`)) ||
    inCategory(catId, catName, /app|aplicaci(o|ó)n/)
  ) {
    return { kind: "APLICACIONES", reason: "nombre/type/brand/tags/categoria senalan aplicacion" };
  }

  if (
    isSoftwareCategoryId(catId) ||
    /software|licen|suscrip|subscription|suite|tool|sdk|api/.test(`${typeProd} ${name}`) ||
    isTrue(dl)
  ) {
    return { kind: "SOFTWARE", reason: "licencia/descarga software sin shipping" };
  }

  if (hint) {
    return { kind: hint, reason: "clasificacion por pestana/selectedOption" };
  }

  return { kind: "DESCONOCIDO", reason: "no hay senales suficientes" };
}
