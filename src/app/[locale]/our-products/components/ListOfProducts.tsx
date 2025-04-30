import { useGetProducts } from "@/features/products/queries/useGetProducts";
import React from "react";
import CardProduct from "./CardProduct";
import Loader from "@/shared/components/Loader";
import { useFormContext } from "react-hook-form";

const ListOfProducts = () => {
  const { watch } = useFormContext();
  const { data, isFetching } = useGetProducts(watch("selectedOption"));

  if (isFetching) {
    return (
      <div className="flex justify-center items-center mt-6">
        <Loader />
      </div>
    );
  }

  const productCount = data?.data.length || 0;

  return (
    <>
      <div className="md:w-11/12 lg:w-full xl:w-[1272px]  w-full  mx-auto mt-4 mb-4 font-bold">
        {productCount} producto{productCount !== 1 ? "s" : ""} encontrado
        {productCount !== 1 ? "s" : ""}
      </div>
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full max-w-7xl mx-auto ">
          {data?.data.map((product) => (
            <CardProduct
              key={product.id}
              id={product?.id}
              priceDiscount={product.sale_price}
              productImage={product.image}
              features={product.advantages.map((item) => item.title)}
              priceRange={`${product.price}$`}
              headerIcon={""}
              headerTitle={product.title}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ListOfProducts;
