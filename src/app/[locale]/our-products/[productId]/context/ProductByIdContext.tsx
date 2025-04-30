import { useGetProductById } from "@/features/products/queries/useGetProductById";
import { Product } from "@/features/products/types/AllProductsResponse";
import { useParams } from "next/navigation";
import React, { createContext, useContext, ReactNode } from "react";

// Define la estructura del contexto
interface ProductByIdContextValue {
  currentProduct: Product | null; // Se devuelve solo 'data' de tipo Product o null
}

// Contexto con el valor inicial
const ProductByIdContext = createContext<ProductByIdContextValue | undefined>(
  undefined
);

// Hook para consumir el contexto
export const useProductById = (): ProductByIdContextValue => {
  const context = useContext(ProductByIdContext);
  if (!context) {
    throw new Error(
      "useProductById debe ser utilizado dentro de un ProductByIdProvider"
    );
  }
  return context;
};

// Componente Provider
interface ProductByIdProviderProps {
  children: ReactNode;
}

export const ProductByIdProvider: React.FC<ProductByIdProviderProps> = ({
  children,
}) => {
  const params = useParams();

  // Llamada al hook para obtener el producto por ID
  const { data } = useGetProductById(params.productId as string);

  // Asigna el producto o null
  const currentProduct = data?.data || null; // Devuelve directamente 'data' o 'null'

  return (
    <ProductByIdContext.Provider value={{ currentProduct }}>
      {children}
    </ProductByIdContext.Provider>
  );
};

export default ProductByIdContext;
