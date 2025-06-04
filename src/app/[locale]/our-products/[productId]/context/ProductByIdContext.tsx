"use client";


import { useGetProductByIdUpdate } from "@/features/products/queries/useGetProductById";
import { Product } from "@/features/products/types/AllProductsResponse";
import { useParams } from "next/navigation";
import React, { createContext, useContext, ReactNode } from "react";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";

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
  const { filters } = useProductFilters(); 
  const productId = params.productId as string;
  const selectedOption = parseInt(filters.selectedOption, 10);


  console.log("🚀 productId desde URL:", productId);
  console.log("🚀 selectedOption desde filtros:", selectedOption);

  const { data: currentProduct, isLoading, isError } = useGetProductByIdUpdate(productId, selectedOption);


  return (
    <ProductByIdContext.Provider 
    value={{ currentProduct: currentProduct || null }}    
    >
      {children}
    </ProductByIdContext.Provider>
  );
};

export default ProductByIdContext;
