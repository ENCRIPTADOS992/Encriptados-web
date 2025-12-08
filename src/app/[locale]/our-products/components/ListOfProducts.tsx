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
  eSimData: "eSIM + Recarga Datos",
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

// 👇 helper para ver qué está pasando con las recargas
const logRecargaSummary = (label: string, products: Product[]) => {
  const recargaNames = ["recarga datos", "recarga minutos"];

  const summary: Record<
    string,
    { total: number; byProvider: Record<string, number> }
  > = {};

  for (const p of products) {
    const name = (p.name ?? "").trim().toLowerCase();
    if (!recargaNames.includes(name)) continue;

    const key = name;
    const provider = (p.provider ?? "unknown").trim();

    if (!summary[key]) {
      summary[key] = { total: 0, byProvider: {} };
    }
    summary[key].total += 1;
    summary[key].byProvider[provider] =
      (summary[key].byProvider[provider] ?? 0) + 1;
  }

  console.log(`📊 [RecargaSummary] ${label}`, summary);
};

const normalizeProviderValue = (value: unknown): string | undefined => {
  if (!value) return;
  if (Array.isArray(value)) {
    if (!value.length) return;
    return String(value[value.length - 1]);
  }
  return String(value);
};

const ListOfProducts: React.FC<ListOfProductsProps> = ({ filters }) => {
  const selectedOption = parseInt(filters.selectedOption, 10);
  const { data, isFetching, isError } = useGetProducts(
    selectedOption,
    filters.provider,
    filters.simCountry
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

  // 👉 log general de recargas ANTES de cualquier filtro
  logRecargaSummary("ANTES DE FILTROS", products);

  let filteredProducts: Product[] = products;

  // Filtro por provider (solo categoría 40)
  if (filters.provider && filters.provider !== "all" && selectedOption === 40) {
    const providerValue = providerMap[filters.provider];
    const before = filteredProducts.length;

    filteredProducts = products.filter((product) => {
      const providerNormalized = product.provider?.toLowerCase().trim() ?? "";
      const brandNormalized = product.brand?.toLowerCase().trim() ?? "";
      const filterNormalized = providerValue.toLowerCase().trim();
      return (
        providerNormalized === filterNormalized ||
        brandNormalized === filterNormalized
      );
    });

    console.log("🔎 [Filtro Provider]", {
      providerFilter: filters.provider,
      providerValue,
      before,
      after: filteredProducts.length,
    });
    logRecargaSummary("DESPUÉS FILTRO PROVIDER", filteredProducts);
  } else {
    console.log("[Filtro Provider] no aplica", {
      provider: filters.provider,
      selectedOption,
    });
  }

  const getProviderServiceKey = (): string | undefined => {
    if (!filters.provider || filters.provider === "all") return;

    if (filters.provider === "encriptados") {
      const value = normalizeProviderValue(filters.encriptadosprovider);
      if (!value || value === "all") return;
      return value;
    }

    if (filters.provider === "tim") {
      const value = normalizeProviderValue(filters.timprovider);
      if (!value || value === "all") return;
      return value;
    }
  };

  const providerServiceKey = getProviderServiceKey();
  console.log("🧷 [ServiceKey] =>", {
    provider: filters.provider,
    providerServiceKey,
    rawEncriptados: filters.encriptadosprovider,
    rawTim: filters.timprovider,
  });

  if (providerServiceKey) {
    const serviceName = serviceMap[providerServiceKey];

    if (!serviceName) {
      console.warn("⚠️ [Filtro Servicio] key sin mapping en serviceMap", {
        providerServiceKey,
        serviceMapKeys: Object.keys(serviceMap),
      });
    } else {
      const before = filteredProducts.length;

      filteredProducts = filteredProducts.filter((product) => {
        const name = product.name?.trim().toLowerCase() ?? "";
        return name === serviceName.trim().toLowerCase();
      });

      console.log("🔎 [Filtro Servicio]", {
        providerServiceKey,
        serviceName,
        before,
        after: filteredProducts.length,
      });
      logRecargaSummary("DESPUÉS FILTRO SERVICIO", filteredProducts);
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
    logRecargaSummary("DESPUÉS FILTRO REGIÓN TIM", filteredProducts);
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

  // Filtro por licencia
  if (
    (selectedOption === 38 || selectedOption === 35) &&
    filters.license &&
    filters.license !== "all"
  ) {
    const before = filteredProducts.length;

    filteredProducts = filteredProducts.filter((product) =>
      (product.licenseVariants ?? []).some(
        (v: any) => String(v.licensetime) === String(filters.license)
      )
    );

    console.log("🔎 [Filtro Licencia]", {
      license: filters.license,
      before,
      after: filteredProducts.length,
    });
  }

  const productCount = filteredProducts.length;
  console.log("✅ [ListOfProducts] total a renderizar:", productCount);
  logRecargaSummary("FINAL (ANTES DE RENDER)", filteredProducts);

  const normalizeCountryCode = (code?: string) => {
    if (!code) return undefined;
    const c = code.trim().toLowerCase();
    if (c === "uk") return "gb";
    if (c === "el") return "gr";
    return c.length === 2 ? c : undefined;
  };

  const buildTimBadges = (p: Product): TimBadges | undefined => {
    const v = p.variants?.[0];

    const selectedCountryCode = filters.simCountry || filters.regionOrCountry;
    const selectedCountryLabel = filters.simCountryLabel;

    if (selectedCountryCode?.toUpperCase() === "GLOBAL") {
      const tag = v?.gb || v?.name || undefined;

      return {
        country: {
          label: "Global",
          flagUrl: "/images/icons/global.svg",
        },
        tag,
      };
    }

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
            const isTimProvider = (product.provider ?? "")
              .toLowerCase()
              .includes("tim");
            const isTim = filters.provider === "tim";
            const simName = (product.name ?? "").toLowerCase().trim();
            const isSim =
              simName === "recarga datos" ||
              simName === "recarga minutos" ||
              simName === "esim" ||
              simName === "esim + datos";
            const showTimBadges = isCategory40 && isTim && isSim;

            const variant = product.variants?.[0];
            const variantId = isTim ? product.variants?.[0]?.id : undefined;

            const effectivePlanDataAmount = isTimProvider
              ? product.plan_data_amount ?? variant?.cost ?? undefined
              : undefined;

            console.log("💰 [ListOfProducts] price debug =>", {
              idx: index,
              id: product.id,
              name: product.name,
              provider: product.provider,
              price: product.price,
              plan_data_amount: product.plan_data_amount,
              variantCost: variant?.cost,
              effectivePlanDataAmount,
            });

            let priceToShow = Number(product.price);

            // ... tu lógica de licenseVariants se queda igual

            // 🔑 NUEVA KEY: siempre única en cada render
            const key = `prod-${product.id ?? "noid"}-${index}`;

            const badges = showTimBadges ? buildTimBadges(product) : undefined;

            return (
              <CardProduct
                key={key}
                id={product.id}
                priceDiscount={product.sale_price}
                productImage={product.images[0]?.src ?? ""}
                features={[]}
                priceRange={`${priceToShow}$`}
                headerIcon={""}
                headerTitle={product.name}
                filters={filters}
                checks={product.checks || []}
                badges={badges}
                provider={product.provider}
                planDataAmount={effectivePlanDataAmount}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListOfProducts;
