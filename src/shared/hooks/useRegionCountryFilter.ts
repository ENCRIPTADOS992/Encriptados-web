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

  useEffect(() => {
    if (debouncedSearch.trim().length < 2) {
      setVisibleRegions(regions);
      setVisibleCountries(countries);
      return;
    }

    let cancelled = false;

    async function doSearch() {
      setLoadingSearch(true);
      try {
        if (filters.regionOrCountryType === "region") {
          const res = await searchRegions(debouncedSearch.trim());
          if (!cancelled) setVisibleRegions(res);
        } else {
          const res = await searchCountries(debouncedSearch.trim());
          if (!cancelled) setVisibleCountries(res);
        }
      } finally {
        if (!cancelled) setLoadingSearch(false);
      }
    }

    doSearch();

    return () => {
      cancelled = true;
    };
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
    if (!filters.regionOrCountryType) {
      updateFilters({ regionOrCountryType: "region" });
    }
    if (!filters.regionOrCountry) {
      updateFilters({ regionOrCountry: "global" });
    }
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
