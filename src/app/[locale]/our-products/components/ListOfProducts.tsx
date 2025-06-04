"use client";

import React, { useEffect } from "react";
import CardProduct from "./CardProduct";
import Loader from "@/shared/components/Loader";
import { useFormContext } from "react-hook-form";
import { useGetProducts } from "@/features/products/queries/useGetProducts"; 
import { Product } from "@/features/products/types/AllProductsResponse";
import { ProductFilters } from "@/features/products/types/ProductFilters";


interface ListOfProductsProps {
  filters: ProductFilters;
}

const ListOfProducts: React.FC<ListOfProductsProps> = ({ filters }) => {
  const selectedOption = parseInt(filters.selectedOption, 10);
  const { data, isFetching, isError } = useGetProducts(selectedOption);


  useEffect(() => {
    console.log("[ListOfProducts] useEffect - selectedOption cambió:", selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    if (data) {
      console.log("Productos recibidos desde react-query:", data);
    }
  }, [data]);


  if (isFetching) {
    return (
      <div className="flex justify-center items-center mt-6">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center mt-6">
        Error al cargar productos.
      </div>
    );
  }

  const products: Product[] = data ?? ([] as Product[]);
  const productCount = products.length;



  return (
    <>
      <div className="md:w-11/12 lg:w-full xl:w-[1272px]  w-full  mx-auto mt-4 mb-4 font-bold">
        {productCount} producto{productCount !== 1 ? "s" : ""} encontrado{productCount !== 1 ? "s" : ""}
      </div>
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full max-w-7xl mx-auto ">
          {products.map((product) => (
            <CardProduct
              key={product.id}
              id={product.id}
              priceDiscount={product.sale_price}
              productImage={product.images[0]?.src ?? ""}
              features={[]} 
              priceRange={`${product.price}$`}
              headerIcon={""}
              headerTitle={product.name}
              filters={filters}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ListOfProducts;
