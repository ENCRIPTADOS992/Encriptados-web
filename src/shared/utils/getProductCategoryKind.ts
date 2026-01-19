// src/shared/utils/getProductCategoryKind.ts
export type CategoryKind = "SIM" | "SOFTWARE" | "APLICACIONES" | "ROUTERS" | "DESCONOCIDO";

type MaybeNum = number | string | undefined | null;

const norm = (s?: string) =>
  (s ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const isTrue = (v?: string | boolean | number) =>
  ["true", "1", "si", "sí", "yes", "y", "true"].includes(norm(String(v)));

const inCategory = (id: MaybeNum, name: string | undefined, needle: RegExp | string) => {
  const idStr = String(id ?? "");
  const n = norm(name);
  const re = typeof needle === "string" ? new RegExp(needle, "i") : needle;
  return re.test(n) || idStr === String(needle);
};

// Por si tu UI tiene “selectedOption” por pestañas; mapea a hints suaves.
const mapSelectedOptionToKind = (selectedOption?: number): CategoryKind | null => {
  switch (selectedOption) {
    // ajusta si usas códigos propios:
    case 40: return "SIM";
    case 35: return "SOFTWARE";
    case 38: return "APLICACIONES";
    case 41: return "ROUTERS";
    default: return null;
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
  const name       = norm(product?.name);
  const typeProd   = norm(product?.type_product);
  const shipProd   = norm(product?.shipping);               // "si" para físico
  const cfgProd    = norm(product?.config_sim?.[0]?.type);  // "esim" | "data" | "minutes"
  const brand      = norm(product?.brand || product?.provider);
  const tagsArray  = (Array.isArray(product?.tags) ? product.tags : []) as string[];
  const tags       = norm(tagsArray?.join(" ") || "");
  const dl         = norm(product?.downloadable);           // woo-style
  const catId      = extra?.categoryId ?? product?.category?.id;
  const catName    = extra?.categoryName ?? product?.category?.name;
  const hint       = mapSelectedOptionToKind(extra?.selectedOption);

  // 0) Si la UI ya “sugiere” pestaña actual, y no contradice señales fuertes:
  if (hint) {
    // solo úsalo si no hay una contradicción evidente abajo
    // (dejamos que reglas fuertes re-clasifiquen si aplica)
  }

  // A) ROUTERS
  if (
    /router|mifi|hotspot|cpe/.test(name) ||
    /router|mifi|hotspot|cpe/.test(typeProd) ||
    inCategory(catId, catName, /router|mifi|hotspot|cpe/) ||
    /router|mifi|hotspot|cpe/.test(tags)
  ) {
    return { kind: "ROUTERS", reason: "nombre/type_product/categoría/tags señalan router" };
  }

  // B) SIM (eSIM o física)
  // Señales: config_sim, nombre, categoría, shipping “si”, type_product con “sim|esim”
  if (
    ["esim", "data", "minutes"].includes(cfgProd) ||
    /\besim\b|\bsim\b/.test(typeProd) ||
    /\besim\b|\bsim\b/.test(name) ||
    inCategory(catId, catName, /sim/) ||
    isTrue(shipProd) // muchas SIM físicas requieren envío
  ) {
    return { kind: "SIM", reason: "config_sim/type_product/name/categoría/ship señalan SIM" };
  }

  // C) APLICACIONES (apps móviles, desktop, plugins, etc.)
  // Señales: "app", sistema operativo en brand/tags, store-language, categoryId 38, etc.
  if (
    String(catId) === "38" ||
    /app|aplicaci(o|ó)n|mobile|android|ios|macos|windows|plugin|extension/.test(name) ||
    /app|software/.test(typeProd) && /android|ios|mac|win|linux/.test(brand + " " + tags) ||
    inCategory(catId, catName, /app|aplicaci(o|ó)n/)
  ) {
    return { kind: "APLICACIONES", reason: "nombre/type/brand/tags/categoría señalan aplicación" };
  }

  // D) SOFTWARE (licencias/descargables no necesariamente “app” de SO)
  if (
    /software|licen|suscrip|subscription|suite|tool|sdk|api/.test(typeProd + " " + name) ||
    isTrue(dl)
  ) {
    return { kind: "SOFTWARE", reason: "licencia/descarga software sin shipping" };
  }

  // E) Hint de pestaña si nada más aplicó
  if (hint) {
    return { kind: hint, reason: "clasificación por pestaña/selectedOption" };
  }

  return { kind: "DESCONOCIDO", reason: "no hay señales suficientes" };
}
