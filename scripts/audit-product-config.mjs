import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const DEFAULT_LANG = process.env.LANG_CODE || "es";
const API_BASE = (process.env.WP_API_BASE || "https://admin.encriptados.io/wp-json").replace(/\/+$/, "");
const PRODUCT_CONFIG_PATH = path.resolve(
  process.cwd(),
  "src/app/[locale]/apps/[slug]/productConfig.ts"
);

const CATEGORY_API_PARAMS = new Map([
  [35, "software"],
  [36, "routers"],
  [38, "apps"],
  [371, "activar-apps"],
  [431, "apps"],
  [439, "software"],
  [457, "routers"],
  [465, "activar-apps"],
]);

function generateSlug(text) {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function loadProductConfigModule() {
  const source = fs.readFileSync(PRODUCT_CONFIG_PATH, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: PRODUCT_CONFIG_PATH,
  });

  const sandbox = {
    exports: {},
    module: { exports: {} },
    require: () => {
      throw new Error("productConfig.ts should not require runtime dependencies");
    },
  };
  sandbox.exports = sandbox.module.exports;

  vm.runInNewContext(transpiled.outputText, sandbox, { filename: PRODUCT_CONFIG_PATH });
  return sandbox.module.exports;
}

async function fetchCategoryProducts(categoryParam, lang) {
  const url = new URL(`${API_BASE}/encriptados/v3/store/products`);
  url.searchParams.set("category_id", categoryParam);
  url.searchParams.set("lang", lang);

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Category ${categoryParam} returned ${response.status}`);
  }

  const payload = await response.json();
  const rawProducts = payload?.products ?? {};
  return Object.values(rawProducts);
}

async function fetchProductById(productId, lang) {
  const url = new URL(`${API_BASE}/encriptados/v3/store/product/${encodeURIComponent(productId)}`);
  url.searchParams.set("lang", lang);

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Product ${productId} returned ${response.status}`);
  }

  return response.json();
}

function formatStatusLabel(status) {
  switch (status) {
    case "ok":
      return "OK";
    case "stale-id":
      return "STALE_ID";
    case "slug-only":
      return "SLUG_ONLY";
    case "unmapped-category":
      return "UNMAPPED_CATEGORY";
    default:
      return "NOT_FOUND";
  }
}

const { productConfigs, getProductLookupSlugs } = loadProductConfigModule();

if (!productConfigs || typeof productConfigs !== "object") {
  throw new Error("Could not load productConfigs from productConfig.ts");
}

const cache = new Map();
const productDetailCache = new Map();
const getCategoryProducts = async (categoryId) => {
  const categoryParam = CATEGORY_API_PARAMS.get(categoryId);
  if (!categoryParam) return { categoryParam: null, products: [] };

  const cacheKey = `${categoryParam}:${DEFAULT_LANG}`;
  if (!cache.has(cacheKey)) {
    cache.set(
      cacheKey,
      fetchCategoryProducts(categoryParam, DEFAULT_LANG).catch((error) => {
        cache.delete(cacheKey);
        throw error;
      })
    );
  }

  return {
    categoryParam,
    products: await cache.get(cacheKey),
  };
};

const getProductDetail = async (productId) => {
  const cacheKey = `${productId}:${DEFAULT_LANG}`;
  if (!productDetailCache.has(cacheKey)) {
    productDetailCache.set(
      cacheKey,
      fetchProductById(productId, DEFAULT_LANG).catch((error) => {
        productDetailCache.delete(cacheKey);
        throw error;
      })
    );
  }

  return productDetailCache.get(cacheKey);
};

const results = [];

for (const [routeSlug, config] of Object.entries(productConfigs)) {
  const { categoryParam, products } = await getCategoryProducts(config.categoryId);
  const lookupSlugs = (typeof getProductLookupSlugs === "function"
    ? getProductLookupSlugs(routeSlug, config)
    : [routeSlug, config.slug, ...(config.lookupSlugs ?? [])]
  )
    .map((value) => generateSlug(value))
    .filter(Boolean);

  const idMatch =
    config.productId > 0
      ? products.find((product) => String(product?.id) === String(config.productId))
      : null;

  const slugMatch = products.find((product) =>
    lookupSlugs.includes(generateSlug(product?.name))
  );

  let status = "not-found-by-slug";
  let detailProductId = null;

  if (!categoryParam) {
    status = "unmapped-category";
  } else if (idMatch) {
    detailProductId = config.productId;
    try {
      await getProductDetail(config.productId);
      status = "ok";
    } catch {
      status = "stale-id";
    }
  } else if (slugMatch) {
    detailProductId = slugMatch.id;
    try {
      await getProductDetail(slugMatch.id);
      status = config.productId > 0 ? "stale-id" : "slug-only";
    } catch {
      status = "not-found-by-slug";
    }
  }

  results.push({
    routeSlug,
    configSlug: config.slug,
    categoryId: config.categoryId,
    categoryParam,
    lookupSlugs,
    configuredId: config.productId,
    matchedId: slugMatch?.id ?? null,
    matchedName: slugMatch?.name ?? null,
    detailProductId,
    status,
  });
}

const counts = results.reduce(
  (acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  },
  {}
);

console.log(`Auditing ${results.length} public product routes against ${API_BASE}`);

for (const item of results) {
  const line = [
    formatStatusLabel(item.status).padEnd(16, " "),
    item.routeSlug.padEnd(24, " "),
    `category=${item.categoryParam ?? item.categoryId}`,
    `configuredId=${item.configuredId}`,
  ];

  if (item.matchedName) {
    line.push(`matched="${item.matchedName}"`);
    line.push(`matchedId=${item.matchedId}`);
  }

  if (item.detailProductId && item.detailProductId !== item.configuredId) {
    line.push(`detailId=${item.detailProductId}`);
  }

  if (item.status !== "ok") {
    line.push(`lookupSlugs=${item.lookupSlugs.join("|")}`);
  }

  console.log(line.join("  "));
}

console.log("\nSummary:");
for (const key of Object.keys(counts).sort()) {
  console.log(`- ${key}: ${counts[key]}`);
}

const failures = results.filter((item) =>
  item.status === "stale-id" ||
  item.status === "not-found-by-slug" ||
  item.status === "unmapped-category"
);

if (failures.length > 0) {
  console.log("\nFailures:");
  for (const item of failures) {
    console.log(
      `- ${item.routeSlug}: ${item.status} (configuredId=${item.configuredId}, matchedId=${item.matchedId ?? "n/a"})`
    );
  }
  process.exit(1);
}
