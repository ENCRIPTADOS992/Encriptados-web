import React, { useEffect } from "react";
import CardProduct from "./CardProduct";
import Loader from "@/shared/components/Loader";
import { useGetProducts } from "@/features/products/queries/useGetProducts"; 
import { Product } from "@/features/products/types/AllProductsResponse";
import { ProductFilters } from "@/features/products/types/ProductFilters";

interface ListOfProductsProps {
  filters: ProductFilters;
}

const providerMap: Record<string, string> = {
  encriptados: "Sim Encriptados",
  tim: "Sim TIM",
};

const serviceMap: Record<string, string> = {
  physicsim: "SIM Física",
  esim: "eSIM",
  datarecharge: "Recarga",
  minuterecharge: "Minutos",
  imsi: "IMSI",
  physicsimtim: "SIM Física",
  esimplusdatatim: "Recarga + eSIM",
  datarechargetim: "Recarga"
};


const ListOfProducts: React.FC<ListOfProductsProps> = ({ filters }) => {
  const selectedOption = parseInt(filters.selectedOption, 10);
  const { data, isFetching, isError } = useGetProducts(selectedOption, filters.provider);

  if (isFetching) {
    console.log("[STATE] isFetching...");
    return (
      <div className="flex justify-center items-center mt-6">
        <Loader />
      </div>
    );
  }

  if (isError) {
    console.log("[STATE] isError...");
    return (
      <div className="flex justify-center items-center mt-6">
        Error al cargar productos.
      </div>
    );
  }

  const products: Product[] = data ?? [];
  let filteredProducts: Product[] = products;

  // Filtro por provider
  if (filters.provider && filters.provider !== "all" && selectedOption === 40) {
    const providerValue = providerMap[filters.provider];
    filteredProducts = products.filter(product => {
      const providerNormalized = product.provider?.toLowerCase().trim() ?? "";
      const brandNormalized = product.brand?.toLowerCase().trim() ?? "";
      const filterNormalized = providerValue.toLowerCase().trim();
      return providerNormalized === filterNormalized || brandNormalized === filterNormalized;
    });
  } else {
    console.log("[FILTRO] No se aplica filtro de provider");
  }

  // Filtro por servicio
  if (filters.provider) {
    let providerServiceKey: string | undefined = undefined;

    if (filters.provider === "encriptados" && filters.encriptadosprovider && filters.encriptadosprovider !== "all") {
      providerServiceKey = filters.encriptadosprovider;
    }

    if (filters.provider === "tim" && filters.timprovider && filters.timprovider !== "all") {
      providerServiceKey = filters.timprovider;
    }

    if (providerServiceKey) {
      const serviceName = serviceMap[providerServiceKey];
      filteredProducts = filteredProducts.filter(product => product.name === serviceName);
    }
  }

  if ((selectedOption === 38 || selectedOption === 35) && filters.os && filters.os !== "all") {
    const osFilter = filters.os.trim().toLowerCase();
    console.log("[FILTRO] Aplicando filtro OS:", filters.os);
    filteredProducts = filteredProducts.filter(product => {
      const brandNormalized = product.brand?.toLowerCase().trim() ?? "";
      return brandNormalized === osFilter;
    });
  }

   if ((selectedOption === 38 || selectedOption === 35) && filters.license && filters.license !== "all") {
    console.log("[ListOfProducts] Antes de filtro Licencia, count:", filteredProducts.length);
    filteredProducts = filteredProducts.filter(product => {
      console.log("  producto:", product.name, "licensetime:", product.licensetime);
      return String(product.licensetime) === String(filters.license);
    });
    console.log("[ListOfProducts] Después de filtro Licencia, count:", filteredProducts.length);
      }
      
  const productCount = filteredProducts.length;

  return (
    <>
      <div className="md:w-11/12 lg:w-full xl:w-[1272px]  w-full  mx-auto mb-4 font-bold">
        {productCount} producto{productCount !== 1 ? "s" : ""} encontrado{productCount !== 1 ? "s" : ""}
      </div>
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 w-full max-w-7xl mx-auto ">
          {filteredProducts.map((product) => (
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
              checks={product.checks || []}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ListOfProducts;
