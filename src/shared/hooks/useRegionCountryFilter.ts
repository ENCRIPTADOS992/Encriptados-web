"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import {
  getRegions,
  getCountries,
  searchRegions,
  searchCountries,
  Region,
  Country,
} from "@/services/simtimService";

const SIM_REGION_VALUES = [
  "norteamerica",
  "centro-sur-america",
  "europa",
  "africa",
  "asia",
  "oceania",
  "global",
] as const;

type SimRegion = (typeof SIM_REGION_VALUES)[number];

const REGION_CODE_TO_SIM_REGION: Record<string, SimRegion> = {
  norteamerica: "norteamerica",
  "centro-sur-america": "centro-sur-america",
  europa: "europa",
  africa: "africa",
  asia: "asia",
  oceania: "oceania",
  global: "global",

  "north-america": "norteamerica",
  "central-south-america": "centro-sur-america",
  europe: "europa",
  worldwide: "global",
};

function mapRegionCodeToSimRegion(code?: string): SimRegion | undefined {
  if (!code) return undefined;
  const key = code.trim().toLowerCase();
  return REGION_CODE_TO_SIM_REGION[key];
}

export function normalizeAlpha2(raw?: string): string | undefined {
  if (!raw) return undefined;
  let c = raw.trim().toLowerCase();
  if (c === "uk") c = "gb";
  if (c === "el") c = "gr";
  if (c.length > 2) c = c.slice(0, 2);
  return c.length === 2 ? c : undefined;
}

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export function formatMinFrom(minFrom: Region["minFrom"]) {
  if (!minFrom) return "—";
  const { amount, currency } = minFrom;
  return `Desde ${amount} ${currency}`;
}

export interface UseRegionCountryFilterArgs {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
  service: "esim_datos" | "recarga_datos" | "sim_fisica";
}

export function useRegionCountryFilter({
  filters,
  updateFilters,
  service,
}: UseRegionCountryFilterArgs) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [regions, setRegions] = useState<Region[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  const [visibleRegions, setVisibleRegions] = useState<Region[]>([]);
  const [visibleCountries, setVisibleCountries] = useState<Country[]>([]);

  const [loadingRegions, setLoadingRegions] = useState(true);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Estado para controlar si ya se realizó la detección automática por IP
  const [autoDetectDone, setAutoDetectDone] = useState(false);

  const safeRegionOrCountry = filters.regionOrCountry ?? "global";

  useEffect(() => {
    let cancelled = false;

    async function initRegions() {
      setLoadingRegions(true);
      try {
        const r = await getRegions(service);
        if (!cancelled) {
          setRegions(r);
          setVisibleRegions(r);
        }
      } finally {
        if (!cancelled) setLoadingRegions(false);
      }
    }

    async function initCountries() {
      setLoadingCountries(true);
      try {
        const c = await getCountries();
        if (!cancelled) {
          setCountries(c);
          setVisibleCountries(c);
        }
      } finally {
        if (!cancelled) setLoadingCountries(false);
      }
    }

    initRegions();
    initCountries();

    return () => {
      cancelled = true;
    };
  }, [service]);

  // Detección automática de país por IP
  useEffect(() => {
    // Si ya detectamos, o aún cargando países, no hacer nada
    if (autoDetectDone || loadingCountries || countries.length === 0) return;

    // Si ya hay un país seleccionado explícitamente (incluso global), no sobrescribir
    if (filters.regionOrCountry && filters.regionOrCountry !== "global") {
      console.log("📍 [Geo] Ya hay selección:", filters.regionOrCountry);
      setAutoDetectDone(true);
      return;
    }

    const detectCountry = async () => {
      console.log("📍 [Geo] Iniciando detección...");
      try {
        // Usar ipapi.co para obtener el código de país (ISO Alpha-2)
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("IP API response not ok");
        
        const data = await response.json();
        const countryCode = data.country_code; // Ej: "CO", "US", "MX"
        console.log("📍 [Geo] Código detectado:", countryCode);

        if (countryCode) {
          // Buscar si el país detectado está soportado en nuestra lista de países
          const supportedCountry = countries.find(
            (c) => 
              normalizeAlpha2(c.code)?.toUpperCase() === countryCode.toUpperCase() ||
              c.code.toUpperCase() === countryCode.toUpperCase()
          );

          if (supportedCountry) {
            console.log("📍 [Geo] País soportado encontrado:", supportedCountry.name);
            const iso2 = normalizeAlpha2(supportedCountry.code) ?? supportedCountry.code;
            
            updateFilters({
              regionOrCountryType: "country",
              regionOrCountry: supportedCountry.code,
              simCountry: iso2.toUpperCase(),
              simCountryLabel: supportedCountry.name,
            });
          } else {
            console.log("📍 [Geo] País no soportado en la lista:", countryCode);
          }
        }
      } catch (error) {
        console.error("📍 [Geo] Error:", error);
      } finally {
        setAutoDetectDone(true);
      }
    };

    detectCountry();
  }, [autoDetectDone, loadingCountries, countries, filters.regionOrCountry, updateFilters]);

  // Helper para normalizar texto (quitar acentos, lowercase)
  const normalizeText = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  useEffect(() => {
    // Si no hay búsqueda suficiente, mostrar todo
    if (debouncedSearch.trim().length < 1) {
      setVisibleRegions(regions);
      setVisibleCountries(countries);
      setLoadingSearch(false);
      return;
    }

    setLoadingSearch(true);

    // Búsqueda LOCAL en lugar de API
    // Esto permite filtrar por acentos correctamente ("mexico" -> "México") 
    // y es más rápido ya que ya tenemos los datos
    const term = normalizeText(debouncedSearch.trim());

    if (filters.regionOrCountryType === "region") {
      const filtered = regions.filter(r =>
        normalizeText(r.name).includes(term)
      );
      setVisibleRegions(filtered);
    } else {
      const filtered = countries.filter(c =>
        normalizeText(c.name).includes(term)
      );
      setVisibleCountries(filtered);
    }

    setLoadingSearch(false);

  }, [debouncedSearch, filters.regionOrCountryType, regions, countries]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    const next: Partial<ProductFilters> = {};
    if (!filters.regionOrCountryType) next.regionOrCountryType = "region";
    if (!filters.regionOrCountry) next.regionOrCountry = "global";

    const effectiveType = filters.regionOrCountryType ?? next.regionOrCountryType;
    const effectiveCode = filters.regionOrCountry ?? next.regionOrCountry;

    if (effectiveType === "region") {
      if (!filters.simRegion) {
        const simRegion = mapRegionCodeToSimRegion(effectiveCode);
        if (simRegion) next.simRegion = simRegion;
      }
    } else if (effectiveType === "country") {
      if (!filters.simCountry && typeof effectiveCode === "string") {
        const iso2 = normalizeAlpha2(effectiveCode) ?? effectiveCode;
        next.simCountry = iso2.toUpperCase();
      }
    }

    if (Object.keys(next).length > 0) updateFilters(next);
  }, [filters.regionOrCountryType, filters.regionOrCountry, updateFilters]);

  const selectedInfo = useMemo(() => {
    const fallback = {
      label: "Global",
      code: "global",
      flagCode: undefined as string | undefined,
      isCountry: false,
    };

    if (!filters.regionOrCountry) return fallback;

    if (filters.regionOrCountryType === "country") {
      const found = countries.find(
        (c) => c.code.toUpperCase() === safeRegionOrCountry.toUpperCase()
      );
      if (found) {
        return {
          label: found.name,
          code: found.code,
          flagCode: normalizeAlpha2(found.code),
          isCountry: true,
        };
      }
    }

    const foundR = regions.find(
      (r) => r.code.toUpperCase() === safeRegionOrCountry.toUpperCase()
    );
    if (foundR) {
      return {
        label: foundR.name,
        code: foundR.code,
        flagCode: undefined,
        isCountry: false,
      };
    }

    return fallback;
  }, [
    filters.regionOrCountry,
    filters.regionOrCountryType,
    countries,
    regions,
    safeRegionOrCountry,
  ]);

  function handleSelectRegion(r: Region) {
    const simRegion = mapRegionCodeToSimRegion(r.code);
    updateFilters({
      regionOrCountryType: "region",
      regionOrCountry: r.code,
      simCountry: undefined,
      simRegion,
    });
    setOpen(false);
  }

  function handleSelectCountry(c: Country) {
    const iso2 = normalizeAlpha2(c.code) ?? c.code;
    updateFilters({
      regionOrCountryType: "country",
      regionOrCountry: c.code,
      simCountry: iso2.toUpperCase(),
      simCountryLabel: c.name,
    });
    setOpen(false);
  }

  return {
    open,
    setOpen,
    dropdownRef,
    searchTerm,
    setSearchTerm,

    filters,
    regions,
    countries,
    visibleRegions,
    visibleCountries,
    loadingRegions,
    loadingCountries,
    loadingSearch,

    selectedInfo,

    handleSelectRegion,
    handleSelectCountry,
  };
}
