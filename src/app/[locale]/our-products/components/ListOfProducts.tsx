'use client';
import React from "react";
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
  esimplusdatatim: "eSIM + Datos",
  datarechargetim: "Recarga Datos",
};

type TimBadges = {
  country?: { label: string; code?: string; flagUrl?: string };
  tag?: string;
};

type ProductTimExtras = Product & {
  country_name?: string;
  country_code?: string;
  countryFlag?: string;
  data_gb?: number;
  data_label?: string;
  badges?: {
    countryName?: string;
    countryCode?: string;
    flagUrl?: string;
    dataText?: string;
  };
};

const buildTimBadges = (raw: Product): TimBadges | undefined => {
  const p = raw as Product & {
    country_name?: string;
    country_code?: string;
    countryFlag?: string;
    data_gb?: number;
    data_label?: string;
    badges?: {
      countryName?: string;
      countryCode?: string;
      flagUrl?: string;
      dataText?: string;
    };
  };

  const countryLabel =
    p.badges?.countryName ?? p.country_name ?? (p as any).country ?? undefined;

  const countryCode =
    p.badges?.countryCode ?? p.country_code ?? (p as any).country_code ?? undefined;

  const flagUrl = p.badges?.flagUrl ?? p.countryFlag ?? undefined;

  const tag =
    p.badges?.dataText ??
    p.data_label ??
    (typeof p.data_gb === "number" ? `${p.data_gb}GB` : undefined) ??
    (p as any).data_text ??
    undefined;

  if (!countryLabel && !tag) return undefined;

  const country: TimBadges["country"] = countryLabel
    ? {
        label: countryLabel,
        ...(countryCode ? { code: countryCode } : {}),
        ...(flagUrl ? { flagUrl } : {}),
      }
    : undefined;

  return { country, tag };
};

const ListOfProducts: React.FC<ListOfProductsProps> = ({ filters }) => {
  const selectedOption = parseInt(filters.selectedOption, 10);
  const { data, isFetching, isError } = useGetProducts(selectedOption, filters.provider);

  console.log("🎛️ [ListOfProducts] filtros actuales =>", filters);

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
  console.log("📦 [ListOfProducts] productos recibidos:", products.length);

  let filteredProducts: Product[] = products;

  // Filtro por provider (solo cat 40)
  if (filters.provider && filters.provider !== "all" && selectedOption === 40) {
    const providerValue = providerMap[filters.provider];
    filteredProducts = products.filter((product) => {
      const providerNormalized = product.provider?.toLowerCase().trim() ?? "";
      const brandNormalized = product.brand?.toLowerCase().trim() ?? "";
      const filterNormalized = providerValue.toLowerCase().trim();
      return providerNormalized === filterNormalized || brandNormalized === filterNormalized;
    });
    console.log("🔎 [Filtro Provider] value:", providerValue, "=> count:", filteredProducts.length);
  } else {
    console.log("[Filtro Provider] no aplica");
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
      const before = filteredProducts.length;
      filteredProducts = filteredProducts.filter((product) => product.name === serviceName);
      console.log("🔎 [Filtro Servicio]", { key: providerServiceKey, serviceName, before, after: filteredProducts.length });
    }
  }

  // Filtro OS
  if ((selectedOption === 38 || selectedOption === 35) && filters.os && filters.os !== "all") {
    const osFilter = filters.os.trim().toLowerCase();
    const before = filteredProducts.length;
    filteredProducts = filteredProducts.filter((product) => {
      const brandNormalized = product.brand?.toLowerCase().trim() ?? "";
      return brandNormalized === osFilter;
    });
    console.log("🔎 [Filtro OS]", { osFilter, before, after: filteredProducts.length });
  }

  // Filtro Licencia
  if ((selectedOption === 38 || selectedOption === 35) && filters.license && filters.license !== "all") {
    const before = filteredProducts.length;
    filteredProducts = filteredProducts.filter((product) => String(product.licensetime) === String(filters.license));
    console.log("🔎 [Filtro Licencia]", { license: filters.license, before, after: filteredProducts.length });
  }

  const productCount = filteredProducts.length;
  console.log("✅ [ListOfProducts] total a renderizar:", productCount);

  const normalizeCountryCode = (code?: string) => {
  if (!code) return undefined;
  const c = code.trim().toLowerCase();
  if (c === "uk") return "gb";
  if (c === "el") return "gr";
  return c.length === 2 ? c : undefined;
};

const buildTimBadges = (raw: Product): TimBadges | undefined => {
  const p = raw as ProductTimExtras;

  const countryLabel =
    p.badges?.countryName ?? p.country_name ?? (p as any).country ?? undefined;

  const countryCodeRaw =
    p.badges?.countryCode ?? p.country_code ?? (p as any).country_code ?? undefined;

  const flagUrl = p.badges?.flagUrl ?? p.countryFlag ?? undefined;

  const tag =
    p.badges?.dataText ??
    p.data_label ??
    (typeof p.data_gb === "number" ? `${p.data_gb}GB` : undefined) ??
    (p as any).data_text ??
    undefined;

  if (!countryLabel && !tag) return undefined;

  const countryCode = normalizeCountryCode(countryCodeRaw);

  const country: TimBadges["country"] = countryLabel
    ? {
        label: countryLabel,
        ...(countryCode ? { code: countryCode } : {}),
        ...(flagUrl ? { flagUrl } : {}),
      }
    : undefined;

  return { country, tag };
};

  return (
    <>
      <div className="md:w-11/12 lg:w-full xl:w-[1272px] w-full mx-auto mb-4 font-bold">
        {productCount} producto{productCount !== 1 ? "s" : ""} encontrado{productCount !== 1 ? "s" : ""}
      </div>

      <div className="flex items-center justify-between">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 w-full max-w-7xl mx-auto">
          {filteredProducts.map((product) => {
            const isCategory40 = selectedOption === 40;
            const isTim = filters.provider === "tim";
            const simName = (product.name ?? "").toLowerCase().trim();
            const isSim = simName === "recarga datos" || simName === "esim" || simName === "esim + datos";
            const showTimBadges = isCategory40 && isTim && isSim;

            console.log("🧮 [BadgeCheck]", {
              id: product.id,
              name: product.name,
              isCategory40,
              isTim,
              isSim,
              showTimBadges,
            });

            let badges = showTimBadges ? buildTimBadges(product) : undefined;

            if (showTimBadges && !badges) {
              badges = {
                country: { label: "Colombia", code: "co" },
                tag: "3GB",
              };
              console.log("🧪 [Badge Fallback] aplicado para", product.id, badges);
            } else {
              console.log("📎 [Badges] del back para", product.id, badges);
            }

            return (
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
                badges={badges}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListOfProducts;
