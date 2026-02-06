import axios from "axios";
import { Allproducts, Product, ProductById } from "./types/AllProductsResponse";
import { generateSlug } from "@/shared/utils/slugUtils";

const WP_API_BASE = process.env.NEXT_PUBLIC_WP_API || "";
const api = axios.create({
  baseURL: WP_API_BASE,
  timeout: 8000,
});

type GetAllProductsOptions = {
  simCountry?: string | null;
  simRegion?: string | null;
  provider?: string | null;
};

export const getAllProducts = async (
  categoryId: number,
  lang: string,
  options?: GetAllProductsOptions
): Promise<Allproducts> => {
  try {
    const params: Record<string, string | number> = {
      category_id: categoryId,
      lang,
    };
    if (options?.simCountry && categoryId === 40) {
      params.sim_country = options.simCountry;
    }
    if (options?.simRegion && categoryId === 40) {
      params.sim_region = options.simRegion;
    }
    // Enviar provider a la API si está disponible (solo para categoría 40)
    if (options?.provider && options.provider !== "all" && categoryId === 40) {
      params.provider = options.provider;
    }

    console.log("➡️ [getAllProducts] Requesting:", {
      baseURL: api.defaults.baseURL,
      url: "/encriptados/v1/products/by-category-language",
      params
    });

    const response = await api.get<{
      message: string;
      products: Record<string, Product>;
    }>("/encriptados/v1/products/by-category-language", {
      params,
    });
    const rawProducts = response.data.products;
    const products: Allproducts = Object.values(rawProducts).map((p: any) => {
      const licenseVariants =
        p.variants?.map((v: any) => ({
          id: v.id,
          licensetime: String(v.licensetime),
          price: Number(v.price),
          sku: v.sku,
          image: v.image,
        })) ?? [];

      return {
        ...p,
        licenseVariants,
      } as Product;
    });

    return products;
  } catch (error) {
    console.error("Error en getAllProducts:", error);
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
  }
): Promise<ProductById> => {
  try {
    const params: Record<string, string | number> = { lang };

    if (options?.simRegion) params.sim_region = options.simRegion;
    if (options?.simCountry) params.sim_country = options.simCountry;
    if (options?.provider) params.provider = options.provider;

    const response = await api.get<ProductById>(
      `/encriptados/v1/products/${encodeURIComponent(productId)}`,
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error en getProductById:", error);
    throw error;
  }
};

export const getProductBySlug = async (
  slug: string,
  lang: string = "es"
): Promise<ProductById | null> => {
  try {
    // Categorías a buscar: 38 (Apps), 35 (Software), 36 (Routers)
    const categories = [38, 35, 36];

    // Ejecutar peticiones en paralelo
    // getAllProducts retorna Allproducts (Product[]), atrapamos errores para no fallar todo
    const results = await Promise.all(
      categories.map((catId) =>
        getAllProducts(catId, lang, { simRegion: "global" }).catch((err) => {
          console.error(`Error fetching category ${catId} for slug search:`, err);
          return [] as Product[];
        })
      )
    );

    // Buscar en los resultados
    for (const products of results) {
      if (Array.isArray(products)) {
        const found = products.find((p) => generateSlug(p.name) === slug);
        if (found) {
          // Una vez encontrado, obtenemos el detalle completo por ID
          return getProductById(String(found.id), lang);
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error en getProductBySlug:", error);
    return null;
  }
};
