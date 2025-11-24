"use client";
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
  datarecharge: "Recarga Datos",
  minuterecharge: "Recarga Minutos",
  imsi: "IMSI",
  physicsimtim: "SIM Física",
  esimplusdatatim: "eSIM + Datos",
  datarechargetim: "Recarga Datos",
};

type TimBadges = {
  country?: { label: string; code?: string; flagUrl?: string };
  tag?: string;
};

const COUNTRY_LABEL_BY_CODE: Record<string, string> = {
  CO: "Colombia",
  MX: "México",
  US: "Estados Unidos",
};

const ListOfProducts: React.FC<ListOfProductsProps> = ({ filters }) => {
  const selectedOption = parseInt(filters.selectedOption, 10);
  const { data, isFetching, isError } = useGetProducts(
    selectedOption,
    filters.provider
  );

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

  if (filters.provider && filters.provider !== "all" && selectedOption === 40) {
    const providerValue = providerMap[filters.provider];
    filteredProducts = products.filter((product) => {
      const providerNormalized = product.provider?.toLowerCase().trim() ?? "";
      const brandNormalized = product.brand?.toLowerCase().trim() ?? "";
      const filterNormalized = providerValue.toLowerCase().trim();
      return (
        providerNormalized === filterNormalized ||
        brandNormalized === filterNormalized
      );
    });
    console.log(
      "🔎 [Filtro Provider] value:",
      providerValue,
      "=> count:",
      filteredProducts.length
    );
  } else {
    console.log("[Filtro Provider] no aplica");
  }

  const getProviderServiceKey = (): string | undefined => {
    if (!filters.provider) return;

    if (filters.provider === "encriptados") {
      const value = filters.encriptadosprovider;
      if (!value || value === "all") return;
      return Array.isArray(value) ? value[value.length - 1] : value;
    }

    if (filters.provider === "tim") {
      const value = filters.timprovider;
      if (!value || value === "all") return;
      return Array.isArray(value) ? value[value.length - 1] : value;
    }
  };

  const providerServiceKey = getProviderServiceKey();

  if (providerServiceKey) {
    const serviceName = serviceMap[providerServiceKey];

    if (!serviceName) {
      console.warn("⚠️ [Filtro Servicio] key sin mapping en serviceMap", {
        providerServiceKey,
        serviceMapKeys: Object.keys(serviceMap),
      });
    } else {
      const before = filteredProducts.length;
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name?.trim().toLowerCase() ===
          serviceName.trim().toLowerCase()
      );

      console.log("🔎 [Filtro Servicio]", {
        key: providerServiceKey,
        serviceName,
        before,
        after: filteredProducts.length,
      });
    }
  }

  // 👇 Antes del filtro de región, detectamos si es SIM Física TIM
  let isSimTimFisica = false;

  if (
    filters.provider === "tim" &&
    filters.timprovider &&
    filters.timprovider !== "all"
  ) {
    const serviceNameForTim = serviceMap[filters.timprovider];
    isSimTimFisica = serviceNameForTim === "SIM Física";
    console.log("[TIM] servicio actual:", {
      timprovider: filters.timprovider,
      serviceNameForTim,
      isSimTimFisica,
    });
  }

  const usingBackendCountryFilter = !!filters.simCountry;

  if (filters.provider === "tim" && !isSimTimFisica) {
    const regionCode = filters.regionOrCountry?.toUpperCase();
    const before = filteredProducts.length;

    if (
      regionCode &&
      regionCode !== "ALL" &&
      regionCode !== "GLOBAL" &&
      !usingBackendCountryFilter
    ) {
      filteredProducts = filteredProducts.filter((product) =>
        (product.variants ?? []).some(
          (v) => v.scope?.code?.toUpperCase() === regionCode
        )
      );
    }

    console.log("🌎 [Filtro Región TIM]", {
      regionCode,
      simCountry: filters.simCountry,
      usingBackendCountryFilter,
      before,
      after: filteredProducts.length,
    });
  } else if (filters.provider === "tim" && isSimTimFisica) {
    console.log("🌎 [Filtro Región TIM] omitido porque es SIM Física TIM");
  }

  if (
    (selectedOption === 38 || selectedOption === 35) &&
    filters.os &&
    filters.os !== "all"
  ) {
    const osFilter = filters.os.trim().toLowerCase();
    const before = filteredProducts.length;
    filteredProducts = filteredProducts.filter((product) => {
      const brandNormalized = product.brand?.toLowerCase().trim() ?? "";
      return brandNormalized === osFilter;
    });
    console.log("🔎 [Filtro OS]", {
      osFilter,
      before,
      after: filteredProducts.length,
    });
  }

  if (
    (selectedOption === 38 || selectedOption === 35) &&
    filters.license &&
    filters.license !== "all"
  ) {
    const before = filteredProducts.length;
    filteredProducts = filteredProducts.filter(
      (product) => String(product.licensetime) === String(filters.license)
    );
    console.log("🔎 [Filtro Licencia]", {
      license: filters.license,
      before,
      after: filteredProducts.length,
    });
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

  const buildTimBadges = (p: Product): TimBadges | undefined => {
    const v = p.variants?.[0];

    const selectedCountryCode =
      filters.simCountry || filters.regionOrCountry;
    const selectedCountryLabel = filters.simCountryLabel; 

    let flagCode: string | undefined;
    let countryLabel: string | undefined;

    if (selectedCountryCode) {
      const normalizedFromFilter = normalizeCountryCode(selectedCountryCode);
      flagCode = normalizedFromFilter;

      countryLabel =
        selectedCountryLabel || 
        COUNTRY_LABEL_BY_CODE[selectedCountryCode.toUpperCase()] ||
        selectedCountryCode.toUpperCase();
    } else if (v) {
      const rawCode = v.scope?.code;
      const normalizedCode = normalizeCountryCode(rawCode);
      flagCode = normalizedCode;
      countryLabel =
        (rawCode && COUNTRY_LABEL_BY_CODE[rawCode]) ||
        (normalizedCode &&
          COUNTRY_LABEL_BY_CODE[normalizedCode.toUpperCase()]) ||
        rawCode;
    }


    const tag = v?.gb || v?.name || undefined;

    if (!countryLabel && !tag) return undefined;

    const country: TimBadges["country"] = countryLabel
      ? {
          label: countryLabel,
          ...(flagCode ? { code: flagCode } : {}),
        }
      : undefined;

    return { country, tag };
  };

  return (
    <>
      <div className="md:w-11/12 lg:w-full xl:w-[1272px] w-full mx-auto mb-4 font-bold">
        {productCount} producto{productCount !== 1 ? "s" : ""} encontrado
        {productCount !== 1 ? "s" : ""}
      </div>

      <div className="flex items-center justify-between">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 w-full max-w-7xl mx-auto">
          {filteredProducts.map((product, index) => {
            const isCategory40 = selectedOption === 40;
            const isTim = filters.provider === "tim";
            const simName = (product.name ?? "").toLowerCase().trim();
            const isSim =
              simName === "recarga datos" ||
              simName === "esim" ||
              simName === "esim + datos";
            const showTimBadges = isCategory40 && isTim && isSim;

            const variantId = isTim ? product.variants?.[0]?.id : undefined;

            const key =
              isTim && variantId
                ? `tim-${variantId}`
                : `prod-${product.id ?? index}`;

            const badges = showTimBadges ? buildTimBadges(product) : undefined;

            return (
              <CardProduct
                key={key}
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
