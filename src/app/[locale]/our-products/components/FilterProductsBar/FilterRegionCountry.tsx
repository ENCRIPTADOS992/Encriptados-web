"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { ProductFilters } from "@/features/products/types/ProductFilters";

import { CircleFlag } from "react-circle-flags";

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

function normalizeAlpha2(raw?: string): string | undefined {
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

interface FilterRegionCountryProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
  service: "esim_datos" | "recarga_datos" | "sim_fisica";
  variant?: "dark" | "tim";
}

function formatMinFrom(minFrom: Region["minFrom"]) {
  if (!minFrom) return "—";
  const { amount, currency } = minFrom;
  return `Desde ${amount} ${currency}`;
}

const RegionIcon: React.FC<{ size?: number; variant?: "dark" | "tim" }> = ({
  size = 36,
  variant = "dark",
}) => {
  return (
    <span
      className={`
        rounded-full flex items-center justify-center
        ${variant === "tim" ? "bg-white" : "bg-[#1C1E21]"}
      `}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.6}
        height={size * 0.6}
        fill="none"
      >
        <circle cx="12" cy="12" r="10.5" stroke="#3393F7" strokeWidth="1.5" />
        <path
          d="M6.5 10.5l1.2-.6 1 .5v1l1 1 .4 1.4-.3 1.2 1.4.6.5 1 .9.4h1l.4-1v-1l1-1 .5-1 .5-.5 1 .5h1l1-1v-1l-.5-1-.5-.5H17l-.5-1 .4-.9v-1l-1-.5-1 .5-.5 1-1 .5h-1l-1-.5-.5-1-1-.5-1 .5-.5 1-.5.5-.5 1z"
          fill="#3393F7"
        />
      </svg>
    </span>
  );
};

const FilterRegionCountry: React.FC<FilterRegionCountryProps> = ({
  filters,
  updateFilters,
  service,
  variant = "dark",
}) => {
  const t = useTranslations("OurProductsPage");

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
  const safeRegionOrCountryType = filters.regionOrCountryType ?? "region";

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
      } catch (e) {
        console.error("[FilterRegionCountry] getRegions error:", e);
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
      } catch (e) {
        console.error("[FilterRegionCountry] getCountries error:", e);
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
      } catch (e) {
        console.error("[FilterRegionCountry] search error:", e);
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

    if (!filters.regionOrCountry) {
      return fallback;
    }

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
    console.log("[FilterRegionCountry] seleccionaste región:", {
      region: r,
      service,
    });
    const simRegion = mapRegionCodeToSimRegion(r.code);

    updateFilters({
      regionOrCountryType: "region",
      regionOrCountry: r.code,
      simCountry: undefined,
      simRegion: undefined,
    });
    setOpen(false);
  }

  function handleSelectCountry(c: Country) {
    const iso2 = normalizeAlpha2(c.code) ?? c.code;
    console.log("[FilterRegionCountry] seleccionaste país:", {
      country: c,
      iso2,
      service,
    });
    updateFilters({
      regionOrCountryType: "country",
      regionOrCountry: c.code,
      simCountry: iso2.toUpperCase(),
      simCountryLabel: c.name,
    });
    setOpen(false);
  }

  useEffect(() => {
    console.log("[FilterRegionCountry] filtros actuales:", {
      regionOrCountryType: filters.regionOrCountryType,
      regionOrCountry: filters.regionOrCountry,
      simCountry: filters.simCountry,
      simCountryLabel: filters.simCountryLabel,
      service,
    });
  }, [
    filters.regionOrCountryType,
    filters.regionOrCountry,
    filters.simCountry,
    service,
  ]);
  return (
  <div className="flex flex-col h-full">
    {variant === "dark" && (
      <span
        className="
          mb-2
          text-sm
          font-semibold
          text-[#7E7E7E]
          block
          pl-[4px]
        "
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {t("filterProducts.regionTitle") || "Región / País"}
      </span>
    )}

    <div
      ref={dropdownRef}
      className={
        variant === "tim"
          ? "relative"
          : "relative flex-1 min-w-0 max-w-full md:max-w-[120px] xl:max-w-[120px]"
      }
    >
      {/* TRIGGER */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          variant === "tim"
            ? `
              inline-flex items-center
              w-[190px] h-[64px]
              rounded-[12px]
              border border-[#D0D0D0]
              bg-[#EDEDED]
              px-[14px]
            `
            : `
              flex items-center justify-between
              w-full
              md:w-[120px]
              border
              rounded-2xl shadow-md
              px-4 py-4
              transition duration-150 ease-in-out
              ${
                open
                  ? "border-[#CCCCCC] text-[#CCCCCC] bg-[#3E3E3E]"
                  : "border-gray-300 text-[#7E7E7E] bg-[#222222]"
              }
            `
        }
        style={
          variant === "tim"
            ? undefined
            : {
                width: "100%",
                minWidth: 0,
                maxWidth: "100%",
                boxSizing: "border-box",
              }
        }
      >
        {variant === "tim" ? (
          // 🔹 Versión TIM: botón gris claro
          <div className="flex items-center gap-3 h-[36px]">
            <span className="inline-flex w-[32px] h-[32px]">
              {selectedInfo.isCountry && selectedInfo.flagCode ? (
                <CircleFlag
                  countryCode={selectedInfo.flagCode}
                  style={{ width: "32px", height: "32px" }}
                />
              ) : (
                <RegionIcon size={32} variant="tim" />
              )}
            </span>

            <span
              className="
                inline-flex items-center 
                text-[16px] font-semibold
                text-[#171717]
                w-[102px] h-[15px]
                text-center
              "
            >
              {selectedInfo.label}
            </span>
          </div>
        ) : (
          // 🔸 Versión DARK original
          <>
            <span className="flex items-center gap-x-2 truncate">
              {selectedInfo.isCountry && selectedInfo.flagCode ? (
                <CircleFlag
                  countryCode={selectedInfo.flagCode}
                  style={{
                    width: "18px",
                    height: "18px",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <RegionIcon size={22} />
              )}

              <span className="uppercase truncate text-left">
                {filters.regionOrCountryType === "country" &&
                selectedInfo.code !== "global"
                  ? selectedInfo.code.toUpperCase()
                  : selectedInfo.label}
              </span>
            </span>

            <svg
              className={`
                ml-2 w-4 h-4
                ${open ? "text-[#CCCCCC]" : "text-[#7E7E7E]"}
              `}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </button>

      {open && (
        <div
          className={`
            absolute z-20 mt-2
            rounded-[12px]
            shadow-xl
            right-0
            border
            ${
              variant === "tim"
                ? "bg-white border-[#D0D0D0]"
                : "bg-[#222222] border-[#3E3E3E]"
            }
          `}
          style={{
            width: "min(100vw - 52px, 518px)", 
            maxWidth: "100vw",
            padding: "18px 24px",
            boxShadow: "0px 24px 44px 0px rgba(0,0,0,0.08)",
          }}

        >
          {/* Toggle Región / País */}
          <div className="flex gap-3 mb-4">
            <button
              className={`
                px-4 py-2 rounded-full text-sm font-semibold
                transition
                ${
                  filters.regionOrCountryType === "region"
                    ? "bg-[#3393F7] text-white"
                    : "bg-transparent text-[#3393F7] border border-[#3393F7]"
                }
              `}
              type="button"
              onClick={() => {
                updateFilters({ regionOrCountryType: "region" });
                setSearchTerm("");
                setVisibleRegions(regions);
              }}
            >
              Región
            </button>

            <button
              className={`
                px-4 py-2 rounded-full text-sm font-semibold
                transition
                ${
                  filters.regionOrCountryType === "country"
                    ? "bg-[#3393F7] text-white"
                    : "bg-transparent text-[#3393F7] border border-[#3393F7]"
                }
              `}
              type="button"
              onClick={() => {
                updateFilters({ regionOrCountryType: "country" });
                setSearchTerm("");
                setVisibleCountries(countries);
              }}
            >
              País
            </button>
          </div>

          {/* Buscador */}
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                w-full rounded-2xl
                pl-10 pr-4 py-3 text-sm outline-none border
                ${
                  variant === "tim"
                    ? "bg-[#F4F4F4] text-[#171717] border-[#D0D0D0] placeholder:text-[#9CA3AF]"
                    : "bg-[#18191B] text-white border-[#3E3E3E] placeholder:text-[#7E7E7E]"
                }
              `}
              placeholder={
                filters.regionOrCountryType === "region"
                  ? "Buscar región..."
                  : "Buscar país..."
              }
            />
          </div>

          {/* Lista dinámica */}
          <div
  className={`
    mb-4 max-h-60 overflow-y-auto
    ${variant === "tim" ? "custom-scrollbar-light" : "custom-scrollbar"}
  `}
>

            {filters.regionOrCountryType === "region" && (
              <>
                <div
                  className={`
                    font-semibold text-sm mb-3
                    ${
                      variant === "tim"
                        ? "text-[#171717]"
                        : "text-[#CCCCCC]"
                    }
                  `}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t("filterProducts.regionTitle") || "Regiones"}
                </div>

                {loadingRegions && (
                  <div className="text-[#7E7E7E] text-sm py-2">
                    Cargando regiones...
                  </div>
                )}

                {!loadingRegions &&
                  loadingSearch &&
                  searchTerm.length >= 2 && (
                    <div className="text-[#7E7E7E] text-sm py-2">
                      Buscando...
                    </div>
                  )}

                {!loadingRegions &&
                  visibleRegions.map((r) => {
                    const isActive =
                      filters.regionOrCountry === r.code &&
                      filters.regionOrCountryType === "region";

                    return (
                      <button
                        key={r.code}
                        type="button"
                        className={`
                          flex items-center justify-between
                          w-full
                          rounded-xl
                          border
                          px-4 py-3
                          mb-2
                          transition
                          ${
                            variant === "tim"
                              ? isActive
                                ? "bg-[#F0F9FF] border-[#009DFF]"
                                : "bg-white border-[#D0D0D0] hover:bg-[#F4F8FA]"
                              : isActive
                              ? "bg-[#25272B] border-[#3393F7]"
                              : "bg-[#18191B] border-[#333] hover:bg-[#232427]"
                          }
                        `}
                        style={{ minHeight: 60 }}
                        onClick={() => handleSelectRegion(r)}
                      >
                        <span className="flex items-center gap-3 text-left">
                          <RegionIcon size={36} variant={variant} />

                          <span className="flex flex-col text-left">
                            <span
                              className={`
                                font-bold text-[16px]
                                ${
                                  variant === "tim"
                                    ? "text-[#171717]"
                                    : "text-white"
                                }
                              `}
                            >
                              {r.name}
                            </span>
                            <span
                              className={`
                                text-xs
                                ${
                                  variant === "tim"
                                    ? "text-[#4B5563]"
                                    : "text-[#CCCCCC]"
                                }
                              `}
                            >
                              Desde $17.5
                            </span>
                          </span>
                        </span>

                        <span className="w-5 h-5 flex items-center justify-center">
                          <span
                            className={`
                              block w-4 h-4 rounded-full border transition-all
                              ${
                                isActive
                                  ? "border-[#3393F7] bg-[#3393F7]"
                                  : variant === "tim"
                                  ? "border-[#D0D0D0] bg-white"
                                  : "border-[#555] bg-[#232427]"
                              }
                            `}
                          >
                            {isActive && (
                              <span className="block m-auto w-2 h-2 rounded-full bg-white"></span>
                            )}
                          </span>
                        </span>
                      </button>
                    );
                  })}
              </>
            )}

            {filters.regionOrCountryType === "country" && (
              <>
                <div
                  className={`
                    font-semibold text-sm mb-3
                    ${
                      variant === "tim"
                        ? "text-[#171717]"
                        : "text-[#CCCCCC]"
                    }
                  `}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t("filterProducts.countryTitle") || "Países"}
                </div>

                {loadingCountries && (
                  <div className="text-[#7E7E7E] text-sm py-2">
                    Cargando países...
                  </div>
                )}

                {!loadingCountries &&
                  loadingSearch &&
                  searchTerm.length >= 2 && (
                    <div className="text-[#7E7E7E] text-sm py-2">
                      Buscando...
                    </div>
                  )}

                {!loadingCountries &&
                  visibleCountries.map((c) => {
                    const iso2 = normalizeAlpha2(c.code);
                    const isActive =
                      filters.regionOrCountry === c.code &&
                      filters.regionOrCountryType === "country";

                    return (
                      <button
                        key={c.code}
                        type="button"
                        className={`
                          flex items-center justify-between
                          w-full
                          rounded-xl
                          border
                          px-4 py-3
                          mb-2
                          transition
                          ${
                            variant === "tim"
                              ? isActive
                                ? "bg-[#F0F9FF] border-[#009DFF]"
                                : "bg-white border-[#D0D0D0] hover:bg-[#F4F8FA]"
                              : isActive
                              ? "bg-[#25272B] border-[#3393F7]"
                              : "bg-[#18191B] border-[#333] hover:bg-[#232427]"
                          }
                        `}
                        style={{ minHeight: 60 }}
                        onClick={() => handleSelectCountry(c)}
                      >
                        <span className="flex items-center gap-3 text-left">
                          {iso2 ? (
                            <CircleFlag
                              countryCode={iso2}
                              style={{
                                width: "18px",
                                height: "18px",
                                flexShrink: 0,
                              }}
                            />
                          ) : (
                            <span className="text-2xl leading-none mr-2">
                              {c.flag}
                            </span>
                          )}

                          <span className="flex flex-col">
                            <span
                              className={`
                                font-bold text-[14px]
                                ${
                                  variant === "tim"
                                    ? "text-[#171717]"
                                    : "text-white"
                                }
                              `}
                            >
                              {c.name}
                            </span>
                            <span
                              className={`
                                text-xs
                                ${
                                  variant === "tim"
                                    ? "text-[#4B5563]"
                                    : "text-[#CCCCCC]"
                                }
                              `}
                            >
                              Cobertura 4G/5G
                            </span>
                          </span>
                        </span>

                        <span className="w-5 h-5 flex items-center justify-center">
                          <span
                            className={`
                              block w-4 h-4 rounded-full border transition-all
                              ${
                                isActive
                                  ? "border-[#3393F7] bg-[#3393F7]"
                                  : variant === "tim"
                                  ? "border-[#D0D0D0] bg-white"
                                  : "border-[#555] bg-[#232427]"
                              }
                            `}
                          >
                            {isActive && (
                              <span className="block m-auto w-2 h-2 rounded-full bg-white"></span>
                            )}
                          </span>
                        </span>
                      </button>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);

};

export default FilterRegionCountry;
