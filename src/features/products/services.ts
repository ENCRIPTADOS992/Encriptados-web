import axios from "axios";
import { Allproducts, Product, ProductById } from "./types/AllProductsResponse";
import { generateSlug } from "@/shared/utils/slugUtils";
import { WP_API_BASE, isProductionServer } from "@/shared/constants/backend";
import { getSimProductUrl } from "@/shared/utils/productRouteResolver";
import {
  PRODUCT_CATEGORY_IDS,
  getProductCategoryApiParam,
  isActivateAppsCategoryId,
  isSimCategoryId,
} from "@/shared/constants/productCategories";

const api = axios.create({
  baseURL: WP_API_BASE,
  timeout: 20000,
});

type GetAllProductsOptions = {
  simCountry?: string | null;
  simRegion?: string | null;
  provider?: string | null;
  silent?: boolean;
  timeoutMs?: number;
};

type ResolvePublicProductOptions = {
  preferredProductId?: string | number | null;
  slugs: Array<string | undefined | null>;
  lang?: string;
  categoryId?: number | null;
};

function shouldLogProductServiceError(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return true;
  return error.response?.status !== 404;
}

export const getAllProducts = async (
  categoryId: number,
  lang: string,
  options?: GetAllProductsOptions
): Promise<Allproducts> => {
  try {
    const categoryParam = getProductCategoryApiParam(categoryId);
    const { timeoutMs, ...queryOptions } = options ?? {};
    const params: Record<string, string | number> = {
      category_id: categoryParam ?? categoryId,
      lang,
    };

    if (!isProductionServer) {
      params._cb = Date.now();
    }

    if (queryOptions.simCountry && isSimCategoryId(categoryId)) {
      params.sim_country = queryOptions.simCountry;
    }
    if (queryOptions.simRegion && isSimCategoryId(categoryId)) {
      params.sim_region = queryOptions.simRegion;
    }
    if (
      queryOptions.provider &&
      queryOptions.provider !== "all" &&
      (isSimCategoryId(categoryId) || isActivateAppsCategoryId(categoryId))
    ) {
      if (queryOptions.provider === "encriptados" && !isProductionServer) {
        params.provider = "encrypted";
      } else {
        params.provider = queryOptions.provider;
      }
    }

    const response = await api.get<{
      message: string;
      products: Record<string, Product>;
    }>("/encriptados/v3/store/products", {
      params,
      timeout: timeoutMs,
    });

    const rawProducts = response.data.products;
    const products: Allproducts = Object.values(rawProducts).map((p: any) => {
      const licenseVariants =
        p.variants?.map((v: any) => ({
          id: v.id,
          licensetime: String(v.licensetime),
          price: Number(v.price),
          sale_price:
            v.sale_price != null && v.sale_price !== "" ? Number(v.sale_price) : null,
          sku: v.sku,
          image: v.image,
          attributes: v.attributes ?? [],
        })) ?? [];

      return {
        ...p,
        licenseVariants,
      } as Product;
    });

    return products;
  } catch (error) {
    if (!options?.silent && shouldLogProductServiceError(error)) {
      console.error("Error en getAllProducts:", error);
    }
    throw error;
  }
};

export const getProductById = async (
  productId: string,
  lang: string = "es",
  options?: {
    simRegion?: string | null;
    simCountry?: string | null;
    provider?: string | null;
    silent?: boolean;
    timeoutMs?: number;
  }
): Promise<ProductById> => {
  try {
    const { timeoutMs, ...queryOptions } = options ?? {};
    const params: Record<string, string | number> = { lang };

    if (queryOptions.simRegion) params.sim_region = queryOptions.simRegion;
    if (queryOptions.simCountry) params.sim_country = queryOptions.simCountry;
    if (queryOptions.provider) {
      if (queryOptions.provider === "encriptados" && !isProductionServer) {
        params.provider = "encrypted";
      } else {
        params.provider = queryOptions.provider;
      }
    }

    const response = await api.get<ProductById>(
      `/encriptados/v3/store/product/${encodeURIComponent(productId)}`,
      {
        params,
        timeout: timeoutMs,
      }
    );
    return response.data;
  } catch (error) {
    if (!options?.silent && shouldLogProductServiceError(error)) {
      console.error("Error en getProductById:", error);
    }
    throw error;
  }
};

function normalizeSlugCandidate(value: string | undefined | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return generateSlug(trimmed);
}

async function getProductBySlugInCategory(
  categoryId: number,
  slugCandidates: string[],
  lang: string
): Promise<ProductById | null> {
  const products = await getAllProducts(categoryId, lang, { silent: true });
  if (!Array.isArray(products) || products.length === 0) return null;

  const found = products.find((product) => {
    if (isSimCategoryId(categoryId)) {
      const simUrl = getSimProductUrl(product.provider, product.type_product);
      const derivedSlug = simUrl.split("/").pop();
      return derivedSlug ? slugCandidates.includes(derivedSlug) : false;
    }
    const productSlug = generateSlug(product.name);
    return slugCandidates.includes(productSlug);
  });

  if (!found?.id) return null;
  return getProductById(String(found.id), lang, { silent: true });
}

export const resolvePublicProduct = async ({
  preferredProductId,
  slugs,
  lang = "es",
  categoryId,
}: ResolvePublicProductOptions): Promise<ProductById | null> => {
  const normalizedSlugs = Array.from(
    new Set(slugs.map(normalizeSlugCandidate).filter((value): value is string => Boolean(value)))
  );

  // Step 1: Direct ID lookup — fastest path (1 API call)
  if (preferredProductId !== null && preferredProductId !== undefined && preferredProductId !== "") {
    try {
      return await getProductById(String(preferredProductId), lang, { silent: true });
    } catch {
      // continue with slug-based fallbacks
    }
  }

  if (normalizedSlugs.length === 0) return null;

  // Step 2: Search within known category first (1 getAllProducts + 1 getProductById = 2 calls)
  if (categoryId) {
    try {
      const product = await getProductBySlugInCategory(categoryId, normalizedSlugs, lang);
      if (product) return product;
    } catch {
      // continue with global slug search
    }
  }

  // Step 3: Search ALL remaining categories in parallel (max 4 getAllProducts + 1 getProductById)
  // Skip the category already searched in step 2 to avoid duplicate API calls
  const categoriesToSearch = [
    PRODUCT_CATEGORY_IDS.APPS,
    PRODUCT_CATEGORY_IDS.SOFTWARE,
    PRODUCT_CATEGORY_IDS.ROUTERS,
    PRODUCT_CATEGORY_IDS.ACTIVATE_APPS,
  ].filter(catId => catId !== categoryId);

  if (categoriesToSearch.length === 0) return null;

  const results = await Promise.all(
    categoriesToSearch.map(catId =>
      getAllProducts(catId, lang, { simRegion: "global", silent: true }).catch(() => [] as Product[])
    )
  );

  for (const products of results) {
    if (!Array.isArray(products)) continue;
    const found = products.find(p => normalizedSlugs.includes(generateSlug(p.name)));
    if (found?.id) {
      return getProductById(String(found.id), lang, { silent: true });
    }
  }

  return null;
};

export const getProductBySlug = async (
  slug: string,
  lang: string = "es"
): Promise<ProductById | null> => {
  try {
    const categories = [
      PRODUCT_CATEGORY_IDS.APPS,
      PRODUCT_CATEGORY_IDS.SOFTWARE,
      PRODUCT_CATEGORY_IDS.ROUTERS,
      PRODUCT_CATEGORY_IDS.ACTIVATE_APPS,
    ];

    const results = await Promise.all(
      categories.map((catId) =>
        getAllProducts(catId, lang, { simRegion: "global", silent: true }).catch(() => {
          return [] as Product[];
        })
      )
    );

    for (const products of results) {
      if (Array.isArray(products)) {
        const found = products.find((p) => generateSlug(p.name) === slug);
        if (found) {
          return getProductById(String(found.id), lang, { silent: true });
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error en getProductBySlug:", error);
    return null;
  }
};

export type EsimConfig = {
  sims_esim_cost: number;
  sims_esim_cost_minutos: number;
  simtim_esim_cost: number;
};

export const getEsimConfig = async (): Promise<EsimConfig> => {
  try {
    const response = await api.get<EsimConfig>("/encriptados/v3/store/esim-config");
    return response.data;
  } catch (error) {
    console.error("Error en getEsimConfig:", error);
    return { sims_esim_cost: 5, sims_esim_cost_minutos: 5, simtim_esim_cost: 5 };
  }
};
