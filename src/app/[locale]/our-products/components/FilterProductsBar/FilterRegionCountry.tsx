"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { CircleFlag } from "react-circle-flags";
import { ChevronDown } from "lucide-react";
import { ProductFilters } from "@/features/products/types/ProductFilters";

import {
  useRegionCountryFilter,
  UseRegionCountryFilterArgs,
  normalizeAlpha2,
  formatMinFrom,
} from "@/shared/hooks/useRegionCountryFilter";

interface FilterRegionCountryProps extends UseRegionCountryFilterArgs { }

const RegionIcon: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <span
    className="rounded-full flex items-center justify-center bg-[#1C1E21]"
    style={{ width: size, height: size }}
  >
    <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} fill="none">
      <circle cx="12" cy="12" r="10.5" stroke="#3393F7" strokeWidth="1.5" />
      <path
        d="M6.5 10.5l1.2-.6 1 .5v1l1 1 .4 1.4-.3 1.2 1.4.6.5 1 .9.4h1l.4-1v-1l1-1 .5-1 .5-.5 1 .5h1l1-1v-1l-.5-1-.5-.5H17l-.5-1 .4-.9v-1l-1-.5-1 .5-.5 1-1 .5h-1l-1-.5-.5-1-1-.5-1 .5-.5 1-.5.5-.5 1z"
        fill="#3393F7"
      />
    </svg>
  </span>
);

const FilterRegionCountry: React.FC<FilterRegionCountryProps> = (props) => {
  const t = useTranslations("OurProductsPage");
  const {
    open,
    setOpen,
    dropdownRef,
    searchTerm,
    setSearchTerm,
    filters,
    visibleRegions,
    visibleCountries,
    loadingRegions,
    loadingCountries,
    loadingSearch,
    selectedInfo,
    handleSelectRegion,
    handleSelectCountry,
  } = useRegionCountryFilter(props);

  return (
    <div className="flex flex-col h-full">
      <span
        className="
          mb-2 text-sm font-semibold text-[#7E7E7E] block pl-[4px]
        "
      >
        {t("filterProducts.regionTitle") || "Región / País"}
      </span>

      <div
        ref={dropdownRef}
        className="relative flex-1 min-w-0 max-w-full"
      >
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`
            flex items-center justify-between
            w-full
            border rounded-2xl shadow-md
            px-4 py-4
            transition duration-150 ease-in-out
            ${open
              ? "border-[#CCCCCC] text-[#CCCCCC] bg-[#3E3E3E]"
              : "border-gray-300 text-[#7E7E7E] bg-[#222222]"
            }
          `}
          style={{
            width: "100%",
            minWidth: 0,
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <span className="flex items-center gap-x-2 truncate">
            {selectedInfo.isCountry && selectedInfo.flagCode ? (
              <CircleFlag
                countryCode={selectedInfo.flagCode}
                style={{ width: "18px", height: "18px", flexShrink: 0 }}
              />
            ) : (
              <RegionIcon size={22} />
            )}

            <span className="truncate text-left">
              {(() => {
                const text =
                  filters.regionOrCountryType === "country" &&
                    selectedInfo.code !== "global"
                    ? selectedInfo.label || selectedInfo.code
                    : selectedInfo.label;

                if (!text) return "";
                // Title Case conversion
                return text.replace(/\w\S*/g, (txt) =>
                  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
              })()}
            </span>
          </span>

          <ChevronDown
            className={`
              ml-2 w-4 h-4 ml-2 opacity-60
              ${open ? "text-[#CCCCCC]" : "text-[#7E7E7E]"}
            `}
          />
        </button>

        {open && (
          <div
            className="
              absolute z-20 mt-2 rounded-[12px] shadow-xl
              right-0 border bg-[#222222] border-[#3E3E3E]
            "
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
                  w-full md:w-auto px-4 py-2 rounded-full text-sm font-semibold
                  transition
                  ${filters.regionOrCountryType === "region"
                    ? "bg-[#3393F7] text-white"
                    : "bg-transparent text-[#3393F7] border border-[#3393F7]"
                  }
                `}
                type="button"
                onClick={() => {
                  props.updateFilters({ regionOrCountryType: "region" });
                  setSearchTerm("");
                }}
              >
                Región
              </button>

              <button
                className={`
                  w-full md:w-auto px-4 py-2 rounded-full text-sm font-semibold
                  transition
                  ${filters.regionOrCountryType === "country"
                    ? "bg-[#3393F7] text-white"
                    : "bg-transparent text-[#3393F7] border border-[#3393F7]"
                  }
                `}
                type="button"
                onClick={() => {
                  props.updateFilters({ regionOrCountryType: "country" });
                  setSearchTerm("");
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
                className="
                  w-full rounded-2xl
                  pl-10 pr-4 py-3 text-sm outline-none border
                  bg-[#18191B] text-white border-[#3E3E3E]
                  placeholder:text-[#7E7E7E]
                "
                placeholder={
                  filters.regionOrCountryType === "region"
                    ? "Buscar región..."
                    : "Buscar país..."
                }
              />
            </div>

            {/* Lista */}
            <div className="mb-4 max-h-60 overflow-y-auto custom-scrollbar">
              {filters.regionOrCountryType === "region" && (
                <>
                  <div
                    className="font-semibold text-sm mb-3 text-[#CCCCCC]"
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
                          className="
                            flex items-center justify-between
                            w-full rounded-xl border
                            px-4 py-3 mb-2 transition
                            bg-[#18191B] border-[#333] hover:bg-[#232427]
                          "
                          style={{ minHeight: 60 }}
                          onClick={() => handleSelectRegion(r)}
                        >
                          <span className="flex items-center gap-3 text-left">
                            <RegionIcon size={36} />
                            <span className="flex flex-col text-left">
                              <span className="font-bold text-[16px] text-white">
                                {r.name}
                              </span>
                              <span className="text-xs text-[#CCCCCC]">
                                {formatMinFrom(r.minFrom)}
                              </span>
                            </span>
                          </span>

                          <span className="w-5 h-5 flex items-center justify-center">
                            <span
                              className="
                                flex items-center justify-center w-4 h-4 rounded-full border border-[#555] bg-[#232427]
                              "
                            >
                              {isActive && (
                                <span className="w-2 h-2 rounded-full bg-white" />
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
                    className="font-semibold text-sm mb-3 text-[#CCCCCC]"
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
                          className="
                            flex items-center justify-between
                            w-full rounded-xl border
                            px-4 py-3 mb-2 transition
                            bg-[#18191B] border-[#333] hover:bg-[#232427]
                          "
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
                              <span className="font-bold text-[14px] text-white">
                                {c.name}
                              </span>
                              <span className="text-xs text-[#CCCCCC]">
                                Cobertura 4G/5G
                              </span>
                            </span>
                          </span>

                          <span className="w-5 h-5 flex items-center justify-center">
                            <span
                              className={`
                                flex items-center justify-center w-4 h-4 rounded-full border transition-all
                                ${isActive
                                  ? "border-[#3393F7] bg-[#3393F7]"
                                  : "border-[#555] bg-[#232427]"
                                }
                              `}
                            >
                              {isActive && (
                                <span className="w-2 h-2 rounded-full bg-white" />
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
