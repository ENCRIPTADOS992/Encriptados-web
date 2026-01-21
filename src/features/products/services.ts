import axios from "axios";
import { Allproducts, Product, ProductById } from "./types/AllProductsResponse";
import { generateSlug } from "@/shared/utils/slugUtils";

const WP_API_BASE = process.env.NEXT_PUBLIC_WP_API || "";

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

    console.log("🚀 [getAllProducts] Iniciando petición...");
    console.log("🚀 [getAllProducts] URL:", `${WP_API_BASE}/encriptados/v1/products/by-category-language`);
    console.log("🚀 [getAllProducts] Params enviados:", params);
    
    const response = await axios.get<{
      message: string;
      products: Record<string, Product>;
    }>(`${WP_API_BASE}/encriptados/v1/products/by-category-language`, {
      params,
    });
    const rawProducts = response.data.products;
    console.log("🛰️ [getAllProducts] respuesta recibida");
    console.log("🛰️ [getAllProducts] message:", response.data.message);
    console.log("🛰️ [getAllProducts] cantidad de productos (keys):", Object.keys(rawProducts).length);
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

    console.log("📦 [getAllProducts] mapped products length:", products.length);
    if (products.length) {
      console.log("📦 [getAllProducts] first product sample:", products[0]);
    }

    return products;
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    throw error;
  }
};

export const getProductById = async (
  productId: string,
  lang: string = "es"
): Promise<ProductById> => {
  try {
    const url = `${WP_API_BASE}/encriptados/v1/products/${encodeURIComponent(
      productId
    )}`;
    const response = await axios.get<ProductById>(url, {
      params: { lang },
    });
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
