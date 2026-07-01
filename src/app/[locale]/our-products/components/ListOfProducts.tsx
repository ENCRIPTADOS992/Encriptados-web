"use client";
import React from "react";
import { useTranslations } from "next-intl";

import CardProduct from "./CardProduct";
import Loader from "@/shared/components/Loader";
import { useGetProducts } from "@/features/products/queries/useGetProducts";
import { Product } from "@/features/products/types/AllProductsResponse";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import {
  PRODUCT_CATEGORY_IDS,
  isActivateAppsCategoryId,
  isActivateFixedNumberCategoryId,
  isAppCategoryId,
  isLicenseCategoryId,
  isSimCategoryId,
  isSoftwareCategoryId,
} from "@/shared/constants/productCategories";

interface ListOfProductsProps {
  filters: ProductFilters;
  products?: Product[];
  isFetchingProducts?: boolean;
  isProductsError?: boolean;
}

const providerMap: Record<string, string[]> = {
  encriptados: ["Sim Encriptados", "encrypted", "encriptados"],
  tim: ["Sim TIM", "tim"],
  activarapps: ["activar app", "activar apps", "activar_app", "activar-app"],
  activarnumerofijo: ["activar numero fijo", "activar_numero_fijo", "activar-numero-fijo"],
};

const serviceMap: Record<string, string> = {
  physicsim: "SIM Física",
  esim: "eSIM",
  datarecharge: "Recarga Datos",
  minuterecharge: "Recarga Minutos",
  eSimData: "eSIM + Recarga Datos",
  eSimMinutes: "eSIM + Minutos",
  imsi: "IMSI",
  physicsimtim: "SIM Física",
  esimplusdatatim: "eSIM + Datos",
  datarechargetim: "Recarga Datos",
};

type TimBadges = {
  country?: { label: string; code?: string; flagUrl?: string };
  tag?: string;
};

const ENABLE_PRODUCTS_DEBUG = false;

const COUNTRY_LABEL_BY_CODE: Record<string, string> = {
  CO: "Colombia",
  MX: "México",
  US: "Estados Unidos",
  AR: "Argentina",
};

// 👇 helper para ver qué está pasando con las recargas
const logRecargaSummary = (label: string, products: Product[]) => {
  if (!ENABLE_PRODUCTS_DEBUG) return;

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

};

const normalizeProviderValue = (value: unknown): string | undefined => {
  if (!value) return;
  if (Array.isArray(value)) {
    if (!value.length) return;
    return String(value[value.length - 1]);
  }
  return String(value);
};

const ListOfProducts: React.FC<ListOfProductsProps> = ({
  filters,
  products: prefetchedProducts,
  isFetchingProducts,
  isProductsError,
}) => {
  const t = useTranslations('BneSimPage.simSelection');
  // Si el provider es "activarapps", consultar la categoría 371 directamente
  const selectedOption = filters.provider === "activarapps"
    ? PRODUCT_CATEGORY_IDS.ACTIVATE_APPS
    : filters.provider === "activarnumerofijo"
      ? PRODUCT_CATEGORY_IDS.ACTIVATE_FIXED_NUMBER
      : parseInt(filters.selectedOption, 10);
  const isSelectedSimCategory = isSimCategoryId(selectedOption);
  const isSelectedSoftwareCategory = isSoftwareCategoryId(selectedOption);
  const isSelectedAppCategory = isAppCategoryId(selectedOption);
  const isSelectedActivateAppsCategory = isActivateAppsCategoryId(selectedOption) || isActivateFixedNumberCategoryId(selectedOption);
  const isSelectedLicenseCategory = isLicenseCategoryId(selectedOption);
  const query = useGetProducts(
    selectedOption,
    filters.provider,
    filters.simCountry,
    filters.simRegion,
    { enabled: !prefetchedProducts }
  );
  const products = prefetchedProducts ?? query.data ?? [];
  const isFetching = prefetchedProducts ? Boolean(isFetchingProducts) : query.isFetching;
  const isError = prefetchedProducts ? Boolean(isProductsError) : query.isError;

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

  // Deduplicar productos por ID (evitar duplicados de la API)
  const uniqueProductsMap = new Map<number, Product>();
  for (const p of products) {
    if (!uniqueProductsMap.has(p.id)) {
      uniqueProductsMap.set(p.id, p);
    }
  }
  const uniqueProducts = Array.from(uniqueProductsMap.values());

  // Debug: mostrar todos los productos TIM recibidos de la API
  const allTimProducts = uniqueProducts.filter(p => p.provider?.toLowerCase() === "tim");
  if (allTimProducts.length > 0) {
  }

  // 👉 log general de recargas ANTES de cualquier filtro
  logRecargaSummary("ANTES DE FILTROS", uniqueProducts);

  let filteredProducts: Product[] = uniqueProducts;

  // ========== OCULTAR Zi0n DEL LISTADO ==========
  // Zi0n permanece oculto del home; Activar Apps vuelve a mostrarse.
  filteredProducts = filteredProducts.filter((product) => {
    const name = (product.name ?? "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const isZi0n = name.includes("zi0n") || name.includes("zion");
    return !isZi0n;
  });

  if (filters.provider && filters.provider !== "all" && isSelectedSimCategory) {
    const providerValues = providerMap[filters.provider] || [];
    const before = filteredProducts.length;

    filteredProducts = uniqueProducts.filter((product) => {
      const providerNormalized = product.provider?.toLowerCase().trim() ?? "";
      const brandNormalized = product.brand?.toLowerCase().trim() ?? "";

      // Verificar si coincide con cualquiera de los valores aceptados
      return providerValues.some(value => {
        const valueNormalized = value.toLowerCase().trim();
        return providerNormalized === valueNormalized || brandNormalized === valueNormalized;
      });
    });

    logRecargaSummary("DESPUÉS FILTRO PROVIDER", filteredProducts);
  } else {
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

  if (providerServiceKey) {
    const before = filteredProducts.length;

    // Mapeo independiente del idioma usando patrones de nombre
    const namePatterns: Record<string, RegExp[]> = {
      // Patrones para TIM
      physicsimtim: [
        /^sim\s+(f[ií]sica?|physics?|physique|fisica|f[ií]sico)/i,
        /^sim\s+tim/i
      ],
      esimplusdatatim: [
        /^esim\s*\+?\s*dat(a|os|données|i|ados)$/i,
        /^esim.*donn[ée]es$/i,
        /^esim\s*\+\s*dat/i,
        /^esim.*dados$/i
      ],
      datarechargetim: [
        /^(dat(a|os|données|i|ados)\s+)?(recarga|recharge|ricarica)/i,
        /^(recharge|ricarica|recarga)\s+dat(a|os|données|i|ados)/i
      ],
      // Patrones para Encriptados
      physicsim: [
        /^sim\s+(f[ií]sica?|physics?|physique|fisica|f[ií]sico)/i,
        /sim\s+encript/i,
        /^sim\s*(card)?$/i
      ],
      esim: [
        /^esim$/i,
        /^esim\s*(virtual)?$/i,
        /^esim\s+encript/i
      ],
      datarecharge: [
        /^(dat(a|os|données|i|ados)\s+)?(recarga|recharge|ricarica)$/i,
        /^(recharge|ricarica|recarga)\s+dat(a|os|données|i|ados)$/i,
        /^recarga\s+dat/i
      ],
      eSimData: [
        /^esim\s*\+?\s*(recarga\s+)?dat(a|os|données|i|ados)/i,
        /^esim.*\+.*recarga.*dat/i,
        /^esim.*recarga.*dat/i
      ],
      imsi: [
        /imsi/i,
        /cambio\s+imsi/i
      ],
      minuterecharge: [
        /^minutos?\s+(recarga|recharge|ricarica)/i,
        /^(recarga|recharge|ricarica)\s+minut/i,
        /^(recharge|ricarica)\s+minutes?$/i,
      ],
      eSimMinutes: [
        /^esim\s*\+?\s*(recarga\s+)?minut(os|es|i|s)?/i,
        /^esim.*\+.*recarga.*minut/i,
        /^esim.*recarga.*minut/i,
        /^esim.*\+.*minut/i
      ],
    };

    const patterns = namePatterns[providerServiceKey];

    if (!patterns) {
      console.warn("⚠️ [Filtro Servicio] key sin patterns definidos", {
        providerServiceKey,
        availableKeys: Object.keys(namePatterns),
      });
    } else {

      filteredProducts = filteredProducts.filter((product) => {
        const name = product.name?.trim() ?? "";
        const matches = patterns.some(pattern => pattern.test(name));
        return matches;
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
    } else {
    }

    logRecargaSummary("DESPUÉS FILTRO REGIÓN TIM", filteredProducts);
  } else if (filters.provider === "tim" && isSimTimFisica) {
  }

  if (
    (isSelectedAppCategory || isSelectedSoftwareCategory) &&
    filters.os &&
    filters.os !== "all"
  ) {
    const osFilter = filters.os.trim().toLowerCase();
    const before = filteredProducts.length;

    filteredProducts = filteredProducts.filter((product) => {
      const nameNormalized = product.name?.toLowerCase().trim() ?? "";
      return nameNormalized === osFilter;
    });

  }

  // Filtro por licencia
  if (
    (isSelectedAppCategory || isSelectedSoftwareCategory) &&
    filters.license &&
    filters.license !== "all"
  ) {
    const before = filteredProducts.length;

    filteredProducts = filteredProducts.filter((product) =>
      (product.licenseVariants ?? []).some(
        (v: any) => String(v.licensetime) === String(filters.license)
      )
    );

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

  }

  if (isSelectedSoftwareCategory) {
    const normKey = (s: string) =>
      (s ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");

    const SYSTEMS_ORDER = [
      "zi0n",
      "galaxiamdm",
      "cryptcom",
      "securecrypt",
      "securemdmiphone",
      "securemdmandroid",
      "renati",
      "chatmail",
      "armadillo",
      "vaultchat",
      "ultrax",
      "intactphone",
      "decsecure",
    ];

    const rankByName = (name: string) => {
      const base = normKey((name || "").split(" - ")[0]);
      const idx = SYSTEMS_ORDER.findIndex((k) => base.includes(k));
      return idx === -1 ? 999 : idx;
    };

    filteredProducts = [...filteredProducts].sort((a, b) => {
      const ra = rankByName(a.name || "");
      const rb = rankByName(b.name || "");
      if (ra !== rb) return ra - rb;
      const na = normKey(a.name || "");
      const nb = normKey(b.name || "");
      if (na !== nb) return na.localeCompare(nb);
      return Number(a.id) - Number(b.id);
    });
  }

  if (isSelectedAppCategory) {
    const normKey = (s: string) =>
      (s ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");

    const APPS_ORDER = [
      "silentphone",
      "armadillochat",
      "threemawork",
      "threema",
      "nordvpn",
      "vaultchat",
      "salt",
      "vnclagoon",
    ];

    const rankByName = (name: string) => {
      const base = normKey((name || "").split(" - ")[0]);
      const idx = APPS_ORDER.findIndex((k) => base.includes(k));
      return idx === -1 ? 999 : idx;
    };

    filteredProducts = [...filteredProducts].sort((a, b) => {
      const ra = rankByName(a.name || "");
      const rb = rankByName(b.name || "");
      if (ra !== rb) return ra - rb;
      const na = normKey(a.name || "");
      const nb = normKey(b.name || "");
      if (na !== nb) return na.localeCompare(nb);
      return Number(a.id) - Number(b.id);
    });
  }

  // ========== EXPANSIÓN DE VARIANTES TIM ==========
  // Para productos TIM con variantes de GB, crear una tarjeta por cada variante
  // filtrando por la región/país seleccionado
  type ExpandedProduct = Product & {
    _selectedVariant?: Product["variants"] extends (infer V)[] | undefined ? V : never;
    _variantIndex?: number;
  };

  let productsToRender: ExpandedProduct[] = filteredProducts;

  if (filters.provider === "tim") {
    const regionCode = (filters.simCountry || filters.regionOrCountry || "").toUpperCase();
    const isCountryType = filters.regionOrCountryType === "country";

    const expanded: ExpandedProduct[] = [];

    for (const product of filteredProducts) {
      const variants = product.variants ?? [];

      if (variants.length === 0) {
        // Sin variantes, mostrar el producto tal cual
        expanded.push(product);
        continue;
      }

      // Filtrar variantes por región/país si hay uno seleccionado
      let matchingVariants = variants;

      if (regionCode && regionCode !== "ALL" && regionCode !== "GLOBAL") {
        if (isCountryType) {
          // Filtrar por país específico
          matchingVariants = variants.filter(
            v => v.scope?.code?.toUpperCase() === regionCode
          );
        } else {
          // Filtrar por región (código de región)
          matchingVariants = variants.filter(
            v => v.scope?.code?.toUpperCase() === regionCode && v.scope?.type === "region"
          );
        }
      } else if (regionCode === "GLOBAL") {
        // Para GLOBAL, mostrar variantes globales o sin scope
        matchingVariants = variants.filter(
          v => !v.scope?.code ||
            v.scope?.code?.toUpperCase() === "GLOBAL" ||
            v.scope?.code?.toUpperCase() === "WW"
        );
        // Si no hay variantes globales, mostrar todas
        if (matchingVariants.length === 0) {
          matchingVariants = variants;
        }
      }

      if (matchingVariants.length === 0) {
        // No hay variantes que coincidan con la región, omitir producto
        continue;
      }

      // Crear una tarjeta por cada variante que tenga GB diferente
      for (let i = 0; i < matchingVariants.length; i++) {
        const variant = matchingVariants[i];
        expanded.push({
          ...product,
          _selectedVariant: variant,
          _variantIndex: i,
        });
      }
    }

    productsToRender = expanded;
  }

  // ========== EXPANSIÓN DE VARIANTES NÚMERO FIJO (categoría 372) ==========
  // Para productos Activar/Recarga Número Fijo: expandir por país (atributo ISO2 de variante)
  if (filters.provider === "activarnumerofijo") {
    const selectedCountryCode = (filters.numeroFijoCountry || "BE").toUpperCase();
    const expanded: ExpandedProduct[] = [];

    for (const product of productsToRender) {
      const variants = product.variants ?? [];
      if (variants.length === 0) {
        expanded.push(product);
        continue;
      }

      // Agrupar variantes por país (código ISO2 en atributos)
      const variantsByCountry = new Map<string, typeof variants>();
      for (const v of variants) {
        const attrs = (v as any).attributes ?? [];
        for (const attr of attrs) {
          const val = String(attr.option || "").trim().toUpperCase();
          if (/^[A-Z]{2}$/.test(val)) {
            if (!variantsByCountry.has(val)) variantsByCountry.set(val, []);
            variantsByCountry.get(val)!.push(v);
          }
        }
      }

      if (variantsByCountry.size === 0) {
        expanded.push(product);
        continue;
      }

      // Filtrar por país seleccionado y expandir TODAS las variantes de ese país
      const countryVariants = variantsByCountry.get(selectedCountryCode);
      if (countryVariants && countryVariants.length > 0) {
        for (let i = 0; i < countryVariants.length; i++) {
          expanded.push({
            ...product,
            _selectedVariant: countryVariants[i],
            _variantIndex: i,
          });
        }
      }
    }

    productsToRender = expanded;
  }

  // ========== EXPANSIÓN DE VARIANTES SIM ENCRIPTADAS (categoría 40, NO TIM) ==========
  // Para productos SIM Encriptadas con variantes (minutos, datos, etc.), crear una tarjeta por cada variante
  if (isSelectedSimCategory && filters.provider !== "tim") {

    const expandedBySim: ExpandedProduct[] = [];

    for (const product of productsToRender) {
      // Saltar productos TIM (ya tienen su propia expansión)
      const providerLower = (product.provider ?? "").toLowerCase();
      if (providerLower === "tim" || providerLower.includes("tim")) {
        expandedBySim.push(product);
        continue;
      }

      // Usar variants del producto
      const variants = product.variants ?? [];

      // Si no hay variantes o solo hay 1, mostrar el producto tal cual
      if (variants.length <= 1) {
        if (variants.length === 1) {
          expandedBySim.push({
            ...product,
            _selectedVariant: variants[0],
            _variantIndex: 0,
          });
        } else {
          expandedBySim.push(product);
        }
        continue;
      }

      // Crear una tarjeta por cada variante
      for (let i = 0; i < variants.length; i++) {
        const variant = variants[i];
        expandedBySim.push({
          ...product,
          _selectedVariant: variant,
          _variantIndex: i,
        });
      }
    }

    productsToRender = expandedBySim;
  }

  // ========== EXPANSIÓN DE VARIANTES DE LICENCIA (Apps, Sistemas, Router) ==========
  // Para productos con variantes de licencia (3 meses, 6 meses, etc.), crear una tarjeta por cada variante
  // SOLO si hay más de una variante con licensetime diferente
  // Excluir Número Fijo (ya se expandió por país arriba)
  if (isSelectedLicenseCategory && filters.provider !== "activarnumerofijo") {

    const expandedByLicense: ExpandedProduct[] = [];

    for (const product of productsToRender) {
      // Usar licenseVariants que vienen del mapeo en services.ts
      const licenseVariants = (product as any).licenseVariants ?? [];

      // Filtrar solo variantes con licensetime válido
      // Excluir variantes de prueba gratuita (Pre-Activación Zi0n) — no se muestran en la web
      const isFreeTrialLicense = (lt: unknown) => {
        if (!lt) return false;
        const s = String(lt).trim().toLowerCase();
        return s === "gratis" || s === "free" || s === "prueba" || s === "prueba gratuita" || /^pre[\-\s]?activ/i.test(s);
      };
      const variantsWithLicense = licenseVariants.filter((v: any) =>
        v.licensetime && v.licensetime !== "" && v.licensetime !== "0" && !isFreeTrialLicense(v.licensetime)
      );

      // SOLO expandir si hay MÁS DE UNA variante con licensetime
      // Si hay 0 o 1 variante, mostrar el producto tal cual (sin duplicar)
      if (variantsWithLicense.length <= 1) {
        // Sin variantes múltiples de licencia, mostrar el producto tal cual
        // Si hay exactamente 1 variante, asociarla al producto
        if (variantsWithLicense.length === 1) {
          expandedByLicense.push({
            ...product,
            _selectedVariant: variantsWithLicense[0],
            _variantIndex: 0,
          });
        } else {
          expandedByLicense.push(product);
        }
        continue;
      }

      // Crear una tarjeta por cada variante de licencia (orden ascendente por meses)
      const orderedVariants = [...variantsWithLicense].sort((a: any, b: any) => {
        const ma = parseInt(String(a.licensetime), 10);
        const mb = parseInt(String(b.licensetime), 10);
        if (Number.isFinite(ma) && Number.isFinite(mb)) return ma - mb;
        return String(a.licensetime).localeCompare(String(b.licensetime));
      });

      // Si hay un filtro de licencia activo, solo mostrar la variante que coincide
      const variantsToExpand =
        filters.license && filters.license !== "all"
          ? orderedVariants.filter(
              (v: any) => String(v.licensetime) === String(filters.license)
            )
          : orderedVariants;

      // Si el filtro de licencia está activo pero no hay variante que coincida, omitir
      if (variantsToExpand.length === 0) continue;

      for (let i = 0; i < variantsToExpand.length; i++) {
        const variant = variantsToExpand[i];
        expandedByLicense.push({
          ...product,
          _selectedVariant: variant,
          _variantIndex: i,
        });
      }
    }

    productsToRender = expandedByLicense;
  }

  const productCount = productsToRender.length;
  logRecargaSummary("FINAL (ANTES DE RENDER)", filteredProducts);

  const normalizeCountryCode = (code?: string) => {
    if (!code) return undefined;
    const c = code.trim().toLowerCase();
    if (c === "uk") return "gb";
    if (c === "el") return "gr";
    return c.length === 2 ? c : undefined;
  };

  const formatGbTag = (v: any): string | undefined => {
    if (v == null) return undefined;
    const gbNum = typeof v.gb === 'number' ? v.gb : parseInt(v.gb, 10);
    if (gbNum > 0) return `${gbNum} GB`;
    if (v.planTag) {
      // Si planTag es un número puro (ej: "5"), agregar el sufijo " GB"
      const trimmed = String(v.planTag).trim();
      return /^\d+$/.test(trimmed) ? `${trimmed} GB` : trimmed;
    }
    if (v.name) {
      const trimmedName = String(v.name).trim();
      return /^\d+$/.test(trimmedName) ? `${trimmedName} GB` : trimmedName;
    }
    return undefined;
  };

  const buildTimBadges = (p: ExpandedProduct): TimBadges | undefined => {
    // Usar la variante pre-seleccionada (de la expansión) o la primera disponible
    const v = p._selectedVariant || p.variants?.[0];

    const selectedCountryCode = filters.simCountry || filters.regionOrCountry;
    const selectedCountryLabel = filters.simCountryLabel;

    if (selectedCountryCode?.toUpperCase() === "GLOBAL") {
      const tag = formatGbTag(v);

      return {
        country: {
          label: "Global",
        },
        tag,
      };
    }

    // Handle broad regions (Africa, Europa, Asia, etc.) — not a 2-char country code
    const isRegionFilter = filters.regionOrCountryType === "region";
    if (isRegionFilter && selectedCountryCode && selectedCountryCode.length > 2) {
      const REGION_DISPLAY: Record<string, string> = {
        africa: "África",
        europa: "Europa",
        asia: "Asia",
        oceania: "Oceanía",
        norteamerica: "Norte América",
        "centro-sur-america": "Centro/Sur América",
        "north-america": "Norte América",
        "central-south-america": "Centro/Sur América",
        europe: "Europa",
      };
      const regionKey = selectedCountryCode.toLowerCase();
      const regionLabel = REGION_DISPLAY[regionKey] || selectedCountryCode.charAt(0).toUpperCase() + selectedCountryCode.slice(1).toLowerCase();
      const tag = formatGbTag(v);
      return {
        country: { label: regionLabel },
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

    const tag = formatGbTag(v);

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:landscape:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 w-full max-w-7xl mx-auto">
          {productsToRender.map((product, index) => {
            const isCategory40 = isSelectedSimCategory;
            const providerLower = (product.provider ?? "").toLowerCase();
            // Soportar tanto "Sim TIM" como "tim" del backend
            const isTimProvider = providerLower === "tim" || providerLower.includes("tim");
            const isTim = filters.provider === "tim";
            const simName = (product.name ?? "").toLowerCase().trim();
            const skuLower = (product.sku ?? "").toLowerCase().trim();
            const minuteUnit = t("minuteAbbr");

            // Debug para productos de minutos (multi-idioma)
            const isMinutesSku =
              skuLower.includes("minutes") ||
              skuLower.includes("minute") ||
              skuLower === "minutes-sim-encriptados";
            const isMinutosProduct =
              isMinutesSku ||
              /minut(os?|es?|i)/i.test(simName) ||
              /(recarga|recharge|ricarica)\s*minut/i.test(simName);

            // Lista de nombres de productos SIM que deben mostrar badges TIM (multi-idioma)
            const isSim =
              /recarga|recharge|ricarica/i.test(simName) ||
              isMinutosProduct ||
              /esim/i.test(simName) ||
              /sim/i.test(simName);
            const showTimBadges = isCategory40 && isTim && isSim;

            // Detectar si es "Recarga Minutos" de Encriptados para mostrar badge
            const isEncryptedMinutes =
              isCategory40 &&
              !isTimProvider &&
              isMinutosProduct;

            // Obtener el tag de minutos desde las variantes del producto
            const getMinutesTag = (): string | undefined => {
              // Buscar minutos en las variantes del producto
              const variants = product.variants ?? [];
              if (variants.length > 0) {
                const firstVar = variants[0] as any;
                if (firstVar.minutes) {
                  return `${firstVar.minutes} ${minuteUnit}`;
                }
                // Buscar en attributes de la variante
                if (firstVar.attributes) {
                  const minutesAttr = (firstVar.attributes as { name: string; option: string }[])
                    ?.find((a: { name: string }) => /minuto/i.test(a.name));
                  if (minutesAttr) {
                    const val = parseInt(minutesAttr.option, 10);
                    if (val) return `${val} ${minuteUnit}`;
                  }
                }
                // Fallback: precio / 2 (misma lógica que checkout)
                const price = Number(firstVar.price) || Number(firstVar.cost) || 0;
                if (price > 0) {
                  return `${Math.floor(price / 2)} ${minuteUnit}`;
                }
              }

              // Fallback: buscar en el nombre del producto
              const productName = product.name ?? "";
              const minutesMatch = productName.match(/(\d+)\s*min/i);
              if (minutesMatch) {
                return `${minutesMatch[1]} ${minuteUnit}`;
              }

              return undefined;
            };

            // Para TIM, buscar la variante que corresponde a la región/país seleccionado
            const selectedRegionOrCountry = (filters.simCountry || filters.regionOrCountry || "").toUpperCase();
            const isCountryType = filters.regionOrCountryType === "country";

            // Usar variante pre-seleccionada si existe (del proceso de expansión)
            // o buscar la variante correspondiente a la región
            const getVariantForRegion = () => {
              // Si el producto ya tiene una variante pre-seleccionada (de la expansión), usarla
              if (product._selectedVariant) {
                return product._selectedVariant;
              }

              const variants = product.variants ?? [];
              if (variants.length === 0) return undefined;

              // Si hay un país seleccionado, buscar la variante que coincida con ese país
              if (isCountryType && selectedRegionOrCountry && selectedRegionOrCountry !== "GLOBAL" && selectedRegionOrCountry !== "ALL") {
                const matchingVariant = variants.find(
                  v => v.scope?.code?.toUpperCase() === selectedRegionOrCountry &&
                    (v.scope?.type === "country" || !v.scope?.type)
                );
                if (matchingVariant) return matchingVariant;
              }

              // Si hay una región seleccionada (no es país), buscar variantes de esa región
              if (!isCountryType && selectedRegionOrCountry && selectedRegionOrCountry !== "GLOBAL" && selectedRegionOrCountry !== "ALL") {
                const matchingVariant = variants.find(
                  v => v.scope?.code?.toUpperCase() === selectedRegionOrCountry &&
                    v.scope?.type === "region"
                );
                if (matchingVariant) return matchingVariant;

                // Si no hay variante de región específica, buscar el precio mínimo de variantes 
                // que pertenezcan a esa región (esto requiere un mapeo de países a regiones)
              }

              // Si es GLOBAL o no se encontró variante específica, retornar la primera (o buscar GLOBAL)
              const globalVariant = variants.find(
                v => v.scope?.code?.toUpperCase() === "GLOBAL" ||
                  v.scope?.code?.toUpperCase() === "WW" ||
                  v.scope?.type === "global"
              );
              return globalVariant ?? variants[0];
            };

            const variant = isTimProvider ? getVariantForRegion() : product.variants?.[0];

            // Para TIM usamos el id de la variante de región, para Apps/Sistemas/Router usamos la variante de licencia
            let variantId: number | undefined = isTim ? variant?.id : undefined;

            // Si es producto expandido por licencia (Apps, Sistemas, Router, Activar Apps), usar su _selectedVariant
            if (isSelectedLicenseCategory && product._selectedVariant) {
              variantId = (product._selectedVariant as any).id;
            }

            // Si es producto SIM Encriptadas expandido, usar su _selectedVariant
            if (isSelectedSimCategory && !isTimProvider && product._selectedVariant) {
              variantId = (product._selectedVariant as any).id;
            }

            // Para TIM, usar el cost de la variante correspondiente a la región
            // Se recalcula más abajo con priceToShow final (después de evaluar ofertas)
            let effectivePlanDataAmount: number | undefined = isTimProvider && variant
              ? variant.cost
              : undefined;

            let priceToShow = Number(product.price);

            // Para productos TIM expandidos, usar el costo de la variante como precio
            if (isTimProvider && variant?.cost) {
              priceToShow = Number(variant.cost);
            }

            // Para productos de Apps/Sistemas/Router/Activar Apps expandidos, usar el precio de la variante de licencia
            if (isSelectedLicenseCategory && product._selectedVariant) {
              const variantPrice = (product._selectedVariant as any).price;
              if (variantPrice) {
                priceToShow = Number(variantPrice);
              }
            }

            // Para productos SIM Encriptadas expandidos, usar el precio de la variante
            if (isSelectedSimCategory && !isTimProvider && product._selectedVariant) {
              const variantPrice = (product._selectedVariant as any).price ?? (product._selectedVariant as any).cost;
              if (variantPrice) {
                priceToShow = Number(variantPrice);
              }
            }

            // Lógica de oferta: evaluar variantes individualmente para no aplicar descuentos base a variantes sin descuento
            let currentIsOnSale = false;
            let regularPrice: number | undefined;

            if (product._selectedVariant) {
              const variantSalePrice = (product._selectedVariant as any)?.sale_price;
              if (variantSalePrice && Number(variantSalePrice) > 0 && Number(variantSalePrice) < priceToShow) {
                currentIsOnSale = true;
                regularPrice = priceToShow;
                priceToShow = Number(variantSalePrice);
              }
            } else if (isTimProvider && variant) {
              // Para TIM con variante de product.variants[], revisar sale_price de la variante
              const variantSalePrice = variant.sale_price;
              if (variantSalePrice && Number(variantSalePrice) > 0 && Number(variantSalePrice) < priceToShow) {
                currentIsOnSale = true;
                regularPrice = priceToShow;
                priceToShow = Number(variantSalePrice);
              }
            } else {
              // Sin variante: verificar sale_price del producto base directamente
              if (product.sale_price) {
                const sp = Number(product.sale_price);
                if (sp > 0 && sp < priceToShow) {
                  currentIsOnSale = true;
                  regularPrice = priceToShow;
                  priceToShow = sp;
                }
              }
            }

            // Para TIM, actualizar effectivePlanDataAmount con el precio final (puede incluir oferta)
            if (isTimProvider && variant) {
              effectivePlanDataAmount = priceToShow;
            }

            // 🔑 NUEVA KEY: siempre única en cada render (incluye variantId para expansión TIM)
            const variantIdForKey = product._selectedVariant?.id || "";
            const key = `prod-${product.id ?? "noid"}-${variantIdForKey || index}`;

            // Construir badges: TIM usa buildTimBadges, Encriptados Minutos usa tag de variante
            // Apps (38), Sistemas (35) y Router (36) usan licensetime para mostrar meses
            // SIM Encriptadas expandidas usan el tag de la variante (minutos, GB, etc.)
            let badges: TimBadges | undefined;
            if (showTimBadges) {
              badges = buildTimBadges(product);
            } else if (filters.provider === "activarnumerofijo" && product._selectedVariant) {
              // Número Fijo: badge de país desde atributo ISO2 de la variante
              const varAttrs = (product._selectedVariant as any).attributes ?? [];
              let countryCode: string | undefined;
              let monthsVal: string | undefined;
              for (const attr of varAttrs) {
                const val = String(attr.option || "").trim();
                if (/^[A-Z]{2}$/i.test(val)) {
                  countryCode = val.toUpperCase();
                } else if (/^\d+$/.test(val)) {
                  monthsVal = val;
                }
              }
              const COUNTRY_LABELS: Record<string, string> = {
                CA: "Canadá", BE: "Bélgica", GB: "Reino Unido", US: "Estados Unidos",
                DE: "Alemania", FR: "Francia", ES: "España", IT: "Italia", PT: "Portugal",
                NL: "Países Bajos", BR: "Brasil", MX: "México", AR: "Argentina",
                CL: "Chile", CO: "Colombia", PE: "Perú", AU: "Australia", JP: "Japón",
                KR: "Corea del Sur", CN: "China", IN: "India", SE: "Suecia", NO: "Noruega",
                DK: "Dinamarca", FI: "Finlandia", PL: "Polonia", AT: "Austria",
                CH: "Suiza", IE: "Irlanda", NZ: "Nueva Zelanda", SG: "Singapur",
                HK: "Hong Kong", IL: "Israel", ZA: "Sudáfrica", RU: "Rusia",
                TR: "Turquía", EG: "Egipto", NG: "Nigeria", KE: "Kenia",
              };
              if (countryCode) {
                badges = {
                  country: {
                    label: COUNTRY_LABELS[countryCode] || countryCode,
                    code: countryCode,
                  },
                  tag: monthsVal ? `${monthsVal} ${t("monthsLabel")}` : undefined,
                };
              }
            } else if (isSelectedSimCategory && !isTimProvider && product._selectedVariant) {
              // SIM Encriptadas expandidas: usar el tag de la variante
              const selectedVar = product._selectedVariant as any;

              // Determinar si es un producto de minutos o de datos (multi-idioma)
              const isMinutesRecharge = isMinutosProduct; // "Recarga Minutos" / "Recharge Minutes" / "Ricarica Minuti"
              // Detectar productos de datos en todos los idiomas:
              // ES: "Recarga Datos", "eSIM + Datos", "eSIM + Recarga Datos"
              // EN: "Data Recharge", "eSIM + Data"
              // FR: "Recharge Données", "eSIM + Données"
              // IT: "Ricarica Dati", "eSIM + Dati"
              // PT: "Recarga Dados", "eSIM + Dados"
              const isDataRecharge =
                /(datos?|data|dati|donn[ée]es|dados)/i.test(simName) ||
                /esim\s*\+\s*(recarga|recharge|ricarica)?\s*(datos?|data|dati|donn[ée]es|dados)/i.test(simName) ||
                /(recarga|recharge|ricarica)\s+(datos?|data|dati|donn[ée]es|dados)/i.test(simName);

              let tag: string | undefined;

              if (isMinutesRecharge) {
                // Para "Recarga Minutos": mostrar minutos desde la variante
                let minutesValue = selectedVar.minutes;
                // Fallback: buscar en attributes de la variante
                if (!minutesValue && selectedVar.attributes) {
                  const minutesAttr = (selectedVar.attributes as { name: string; option: string }[])
                    ?.find((a: { name: string }) => /minuto/i.test(a.name));
                  if (minutesAttr) {
                    minutesValue = parseInt(minutesAttr.option, 10) || undefined;
                  }
                }
                // Fallback: calcular como precio / 2 (misma lógica que checkout)
                if (!minutesValue) {
                  const price = Number(selectedVar.price) || Number(selectedVar.cost) || 0;
                  if (price > 0) {
                    minutesValue = Math.floor(price / 2);
                  }
                }
                if (minutesValue) {
                  tag = `${minutesValue} ${minuteUnit}`;
                }
              } else if (isDataRecharge) {
                // Para "Recarga Datos" y "eSIM + Datos": mostrar GB del plan (columna gb del módulo de costos)
                const gbNum = typeof selectedVar.gb === 'number' ? selectedVar.gb : parseInt(selectedVar.gb, 10);
                if (gbNum > 0) {
                  tag = `${gbNum} GB`;
                } else if (selectedVar.planTag) {
                  // Fallback al planTag del backend
                  tag = selectedVar.planTag;
                } else if (selectedVar.name) {
                  // Fallback: parsear GB del nombre de la variante
                  const gbMatch = selectedVar.name.match(/(\d+)\s*GB/i);
                  if (gbMatch) {
                    tag = `${gbMatch[1]} GB`;
                  } else {
                    tag = selectedVar.name;
                  }
                }
              } else {
                // Para otros productos (eSIM simple, SIM Física): usar gb o name
                tag = selectedVar.gb || selectedVar.name || undefined;
              }

              if (tag) {
                badges = { tag };
              }
            } else if (isEncryptedMinutes) {
              const minutesTag = getMinutesTag();
              if (minutesTag) {
                badges = { tag: minutesTag };
              }
            } else if (isSelectedLicenseCategory) {
              // Para Apps, Sistemas, Router y Activar Apps: mostrar licencia en meses
              // Si el producto fue expandido, usar la variante seleccionada
              const getLicenseTag = (): string | undefined => {
                // Cat 371 (Activar Apps) / Cat 372 (Activar Número Fijo): no usa licensetime — usar atributo de variante WooCommerce
                if (isSelectedActivateAppsCategory) {
                  if (product._selectedVariant) {
                    const vid = (product._selectedVariant as any)?.id;
                    const fullVariant = ((product as any).variants ?? []).find((v: any) => v.id === vid);
                    const attrOption = fullVariant?.attributes?.[0]?.option;
                    if (attrOption && String(attrOption).trim()) {
                      const trimmed = String(attrOption).trim();
                      // Para Activar Número Fijo: el atributo es numérico (meses)
                      if (isActivateFixedNumberCategoryId(product.category?.id) && /^\d+$/.test(trimmed)) {
                        return `${trimmed} ${t("monthsLabel")}`;
                      }
                      return trimmed;
                    }
                  }
                  return undefined;
                }

                const uniqueLicense = t("uniqueLicense");
                const monthsLabel = t("monthsLabel");
                const isUnique = (value: unknown) => {
                  if (value === 0 || value === "0") return true;
                  if (!value) return false;
                  const normalized = String(value).trim().toLowerCase();
                  return (
                    normalized === "única" ||
                    normalized === "unica" ||
                    normalized === "unique" ||
                    normalized === "single" ||
                    normalized === "one-time"
                  );
                };
                const isFree = (value: unknown) => {
                  if (!value) return false;
                  const n = String(value).trim().toLowerCase();
                  return n === "gratis" || n === "free" || n === "prueba" || /^pre[\-\s]?activ/i.test(n);
                };

                // Si hay una variante seleccionada (del proceso de expansión), usarla
                if (product._selectedVariant) {
                  const time = (product._selectedVariant as any).licensetime;
                  if (time) {
                    if (isUnique(time)) return uniqueLicense;
                    if (isFree(time)) return t("freeTrial") || "Prueba gratis";
                    return `${time} ${monthsLabel}`;
                  }
                }

                // Fallback: buscar en variantes (no debería llegar aquí si se expandió)
                const variants = product.variants ?? [];
                const licenseVariants = (product as any).licenseVariants ?? [];

                // Si hay variantes con licensetime, usar la primera
                if (variants.length > 0 && variants[0]?.licensetime) {
                  const time = variants[0].licensetime;
                  if (isUnique(time)) return uniqueLicense;
                  if (isFree(time)) return t("freeTrial") || "Prueba gratis";
                  return `${time} ${monthsLabel}`;
                }

                // Si hay licenseVariants, usar la primera
                if (licenseVariants.length > 0 && licenseVariants[0]?.licensetime) {
                  const time = licenseVariants[0].licensetime;
                  if (isUnique(time)) return uniqueLicense;
                  if (isFree(time)) return t("freeTrial") || "Prueba gratis";
                  return `${time} ${monthsLabel}`;
                }

                // Fallback al licensetime del producto
                const productLicense = product.licensetime;
                if (productLicense && productLicense !== "0" && productLicense !== "") {
                  if (isUnique(productLicense)) return uniqueLicense;
                  if (isFree(productLicense)) return t("freeTrial") || "Prueba gratis";
                  return `${productLicense} ${monthsLabel}`;
                }

                return undefined;
              };

              const licenseTag = getLicenseTag();
              if (licenseTag) {
                badges = { tag: licenseTag };
              }
            }

            return (
              <CardProduct
                key={key}
                id={product.id}
                priceDiscount={(product._selectedVariant as any)?.sale_price ?? product.sale_price}
                productImage={product.images[0]?.src ?? ""}
                features={[]}
                priceRange={`${priceToShow}$`}
                headerIcon={""}
                headerTitle={product.name}
                filters={filters}
                checks={product.checks || []}
                badges={badges}
                provider={product.provider}
                typeProduct={product.type_product}
                planDataAmount={effectivePlanDataAmount}
                variantId={variantId}
                variants={
                  isSelectedSimCategory
                    ? (product.variants ?? [])
                    : (filters.provider === "activarnumerofijo")
                      ? (product.variants ?? [])
                      : undefined
                }
                onSale={currentIsOnSale}
                regularPrice={regularPrice}
                iconUrl={product.iconUrl}
                purchaseType={product.purchase_type}
                telegramLink={product.telegram_link}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListOfProducts;
