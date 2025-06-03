"use client";


import { useGetProductByIdUpdate } from "@/features/products/queries/useGetProductById";
import { Product } from "@/features/products/types/AllProductsResponse";
import { useParams } from "next/navigation";
import React, { createContext, useContext, ReactNode } from "react";

// Define la estructura del contexto
interface ProductByIdContextValue {
  currentProduct: Product | null;
}

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
  const productId = params.productId as string;
  console.log("🚀 productId desde URL:", productId);
  // Llamada al hook para obtener el producto por ID
const { data: currentProduct, isLoading, isError } = useGetProductByIdUpdate(
    productId,40);

  return (
    <ProductByIdContext.Provider 
    value={{ currentProduct: currentProduct || null }}    
    >
      {children}
    </ProductByIdContext.Provider>
  );
};

export default ProductByIdContext;
