import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services";
import { Product } from "../types/AllProductsResponse";
import { useLocale } from "next-intl";

// IDs de productos específicos para la página de SIM Encriptada
const ENCRYPTED_SIM_PRODUCT_IDS = {
  DATA: 443,                    // Recarga Datos (variantes: 25, 50, 100, 150, 250, 500)
  MINUTES: 446,                 // Recarga Minutos (variantes: 200, 500, 1000)
  ESIM: 449,                    // eSIM (precio único: 12)
  ESIM_DATA: 454,               // eSIM + Datos
  SIM_FISICA_TIM: 448,          // SIM Física TIM (precio único: 10)
  SIM_FISICA_ENCRYPTED: 508     // SIM Física Encrypted (precio único: 15)
};

// Tipo para una variante de producto
export interface ProductVariant {
  id: number;
  price: number;
  sku: string;
  image?: string;
}

export interface EncryptedSimProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice: number;
  onSale: boolean;
  image: string;
  checks: string[];
  provider: string;
  type: "data" | "minutes" | "esim" | "esim_data" | "sim_fisica";
  // Nuevos campos para variantes y rangos
  variants: ProductVariant[];
  hasVariants: boolean;
  minPrice: number;
  maxPrice: number;
  priceRange: string; // "$25 - $500" o "$12" si es único
}

/**
 * Hook para obtener los productos de SIM Encriptada desde la API
 * Usa category_id=40 para obtener todos los productos SIM
 * Incluye variantes y rangos de precios
 */
export const useEncryptedSimProducts = () => {
  const locale = useLocale();

  return useQuery<EncryptedSimProduct[]>({
    queryKey: ["encrypted-sim-products", locale],
    queryFn: async () => {
      console.log("🔐 [useEncryptedSimProducts] Fetching encrypted SIM products...");
      
      // Obtener todos los productos de la categoría 40 (SIMs)
      const products = await getAllProducts(40, locale);
      
      console.log("🔐 [useEncryptedSimProducts] Products received:", products.length);
      
      // Mapear productos únicos por ID (evitar duplicados de variantes)
      // Pero acumular las variantes de todos los productos con el mismo ID
      const uniqueProductsMap = new Map<number, Product>();
      
      products.forEach((product) => {
        if (!uniqueProductsMap.has(product.id)) {
          uniqueProductsMap.set(product.id, product);
        }
      });
      
      const uniqueProducts = Array.from(uniqueProductsMap.values());
      console.log("🔐 [useEncryptedSimProducts] Unique products:", uniqueProducts.map(p => ({ id: p.id, name: p.name, variants: p.variants?.length })));
      
      // Filtrar y mapear los productos específicos que necesitamos
      const mappedProducts: EncryptedSimProduct[] = uniqueProducts
        .filter((p) => Object.values(ENCRYPTED_SIM_PRODUCT_IDS).includes(p.id))
        .map((product) => {
          // Determinar el tipo basado en el ID
          let productType: EncryptedSimProduct["type"] = "data";
          
          if (product.id === ENCRYPTED_SIM_PRODUCT_IDS.DATA) {
            productType = "data";
          } else if (product.id === ENCRYPTED_SIM_PRODUCT_IDS.MINUTES) {
            productType = "minutes";
          } else if (product.id === ENCRYPTED_SIM_PRODUCT_IDS.ESIM) {
            productType = "esim";
          } else if (product.id === ENCRYPTED_SIM_PRODUCT_IDS.ESIM_DATA) {
            productType = "esim_data";
          } else if (product.id === ENCRYPTED_SIM_PRODUCT_IDS.SIM_FISICA_TIM || 
                     product.id === ENCRYPTED_SIM_PRODUCT_IDS.SIM_FISICA_ENCRYPTED) {
            productType = "sim_fisica";
          }
          
          // Mapear variantes (la API puede usar 'price' o 'cost')
          const variants: ProductVariant[] = (product.variants || []).map((v) => {
            // Obtener precio de price o cost (la API usa ambos dependiendo del producto)
            const variantPrice = v.price ?? v.cost ?? 0;
            const numericPrice = typeof variantPrice === 'string' ? parseFloat(variantPrice) : variantPrice;
            return {
              id: v.id ?? 0,
              price: numericPrice,
              sku: v.sku || v.label || '',
              image: v.image
            };
          });
          
          // Calcular precio base
          const basePrice = product.on_sale 
            ? parseFloat(String(product.sale_price)) 
            : parseFloat(String(product.price));
          
          // Calcular rango de precios
          let minPrice = basePrice;
          let maxPrice = basePrice;
          
          if (variants.length > 0) {
            const variantPrices = variants.map(v => v.price).filter(p => !isNaN(p) && p > 0);
            if (variantPrices.length > 0) {
              minPrice = Math.min(...variantPrices);
              maxPrice = Math.max(...variantPrices);
            }
          }
          
          // Crear string de rango de precios
          const priceRange = minPrice === maxPrice 
            ? `$${minPrice}` 
            : `$${minPrice} - $${maxPrice}`;
          
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: basePrice,
            salePrice: parseFloat(String(product.sale_price)) || basePrice,
            onSale: product.on_sale,
            image: product.images?.[0]?.src || "",
            checks: product.checks?.map(c => c.name) || [],
            provider: product.provider,
            type: productType,
            variants,
            hasVariants: variants.length > 0,
            minPrice,
            maxPrice,
            priceRange
          };
        });
      
      console.log("🔐 [useEncryptedSimProducts] Mapped products with variants:", 
        mappedProducts.map(p => ({ 
          id: p.id, 
          name: p.name, 
          priceRange: p.priceRange, 
          variantsCount: p.variants.length 
        }))
      );
      
      return mappedProducts;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * Función helper para encontrar un producto por tipo
 */
export const findProductByType = (
  products: EncryptedSimProduct[] | undefined,
  type: EncryptedSimProduct["type"]
): EncryptedSimProduct | undefined => {
  return products?.find((p) => p.type === type);
};

/**
 * Función helper para encontrar un producto por ID
 */
export const findProductById = (
  products: EncryptedSimProduct[] | undefined,
  id: number
): EncryptedSimProduct | undefined => {
  return products?.find((p) => p.id === id);
};

export { ENCRYPTED_SIM_PRODUCT_IDS };
