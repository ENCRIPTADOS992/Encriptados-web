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

import { useTranslations } from 'next-intl';

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
  const t = useTranslations('BneSimPage.simSelection');
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
    const before = filteredProducts.length;
    
    // Mapeo independiente del idioma usando patrones de nombre
    const namePatterns: Record<string, RegExp[]> = {
      physicsimtim: [
        /^sim\s+(f[ií]sica?|physics?|physique|fisica|f[ií]sico)/i
      ],
      esimplusdatatim: [
        /^esim\s*\+?\s*dat(a|os|données|i|ados)/i,
        /^esim.*donn[ée]es/i,
        /^esim.*\+.*dat/i,
        /^esim.*dados/i
      ],
      datarechargetim: [
        /^(dat(a|os|données|i|ados)\s+)?(recarga|recharge|ricarica)/i,
        /^(recharge|ricarica|recarga)\s+dat(a|os|données|i|ados)/i
      ],
      minuterecharge: [/^(minutos?\s+)?(recarga|recharge|ricarica)/i, /^(recharge|ricarica)\s+minutes?/i],
    };

    const patterns = namePatterns[providerServiceKey];
    
    if (!patterns) {
      console.warn("⚠️ [Filtro Servicio] key sin patterns definidos", {
        providerServiceKey,
        availableKeys: Object.keys(namePatterns),
      });
    } else {
      console.log("🔍 [DEBUG] Filtrando con patrones para:", providerServiceKey);
      console.log("🔍 [DEBUG] Nombres disponibles:", filteredProducts.map(p => p.name).filter(Boolean));

      filteredProducts = filteredProducts.filter((product) => {
        const name = product.name?.trim() ?? "";
        const matches = patterns.some(pattern => pattern.test(name));
        console.log(`${matches ? '✅' : '❌'} [DEBUG] "${name}" ${matches ? 'COINCIDE' : 'NO coincide'} con patrones de ${providerServiceKey}`);
        return matches;
      });

      console.log("🔎 [Filtro Servicio]", {
        providerServiceKey,
        patterns: patterns.map(p => p.toString()),
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

  // Filtro por búsqueda de texto
  if (filters.searchQuery && filters.searchQuery.trim() !== "") {
    const searchTerm = filters.searchQuery.trim().toLowerCase();
    const before = filteredProducts.length;

    // Función para normalizar texto (remover acentos y caracteres especiales)
    const normalizeText = (text: string): string => {
      return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s]/gi, " ")
        .replace(/\s+/g, " ")
        .trim();
    };

    const normalizedSearchTerm = normalizeText(searchTerm);
    const searchWords = normalizedSearchTerm.split(" ").filter(w => w.length > 0);

    filteredProducts = filteredProducts.filter((product) => {
      // Campos principales de búsqueda
      const searchableFields = [
        product.name ?? "",
        product.description ?? "",
        product.provider ?? "",
        product.brand ?? "",
        product.type_product ?? "",
        product.activation ?? "",
        product.purchase_note ?? "",
        product.sku ?? "",
      ];

      // Agregar checks si existen
      if (product.checks && product.checks.length > 0) {
        searchableFields.push(...product.checks.map(c => c.name ?? ""));
      }

      // Agregar FAQs si existen
      if (product.faqs && product.faqs.length > 0) {
        product.faqs.forEach(faq => {
          searchableFields.push(faq.name ?? "", faq.description ?? "");
        });
      }

      // Agregar advantages si existen
      if (product.advantages && product.advantages.length > 0) {
        product.advantages.forEach(adv => {
          searchableFields.push(adv.name ?? "", adv.description ?? "");
        });
      }

      // Agregar features si existen
      if (product.features && product.features.length > 0) {
        product.features.forEach(feat => {
          searchableFields.push(feat.name ?? "", feat.description ?? "");
        });
      }

      // Agregar información de variants si existen
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach(variant => {
          searchableFields.push(
            variant.name ?? "",
            variant.label ?? "",
            variant.gb ?? "",
            variant.scope?.code ?? "",
            variant.scope?.type ?? ""
          );
        });
      }

      // Combinar todos los campos en un solo texto normalizado
      const combinedText = normalizeText(searchableFields.join(" "));

      // Buscar si todas las palabras de búsqueda están presentes
      const matchesAllWords = searchWords.every(word => 
        combinedText.includes(word)
      );

      // También hacer búsqueda exacta sin normalizar para mayor precisión
      const exactSearchTerm = searchTerm.toLowerCase();
      const exactMatch = searchableFields.some(field => 
        field.toLowerCase().includes(exactSearchTerm)
      );

      return matchesAllWords || exactMatch;
    });

    console.log("🔍 [Filtro Búsqueda]", {
      searchQuery: filters.searchQuery,
      searchTerm,
      normalizedSearchTerm,
      searchWords,
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
        {productCount} {productCount !== 1 ? t('products') : t('product')} {productCount !== 1 ? t('founds') : t('found')}
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-4 lg:gap-5 w-full max-w-7xl mx-auto">
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
