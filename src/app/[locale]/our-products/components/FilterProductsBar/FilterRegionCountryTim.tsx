"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { CircleFlag } from "react-circle-flags";
import {
  useRegionCountryFilter,
  UseRegionCountryFilterArgs,
  normalizeAlpha2,
  formatMinFrom,
} from "@/shared/hooks/useRegionCountryFilter";

interface FilterRegionCountryTimProps extends UseRegionCountryFilterArgs {}

const RegionIconTim: React.FC<{ size?: number; active?: boolean }> = ({
  size = 36,
  active = false,
}) => {
  const stroke = active ? "#FFFFFF" : "#3393F7";
  const fill = active ? "#FFFFFF" : "#3393F7";

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <circle cx="12" cy="12" r="10.5" stroke={stroke} strokeWidth="1.5" />
      <path
        d="M6.5 10.5l1.2-.6 1 .5v1l1 1 .4 1.4-.3 1.2 1.4.6.5 1 .9.4h1l.4-1v-1l1-1 .5-1 .5-.5 1 .5h1l1-1v-1l-.5-1-.5-.5H17l-.5-1 .4-.9v-1l-1-.5-1 .5-.5 1-1 .5h-1l-1-.5-.5-1-1-.5-1 .5-.5 1-.5.5-.5 1z"
        fill={fill}
      />
    </svg>
  );
};

const FilterRegionCountryTim: React.FC<FilterRegionCountryTimProps> = (
  props
) => {
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

  // De momento solo 0 ó 1, pero dejamos el cálculo centralizado por si luego agregamos arrays
  const selectedCount =
    (filters as any).selectedRegions?.length ??
    (filters as any).selectedCountries?.length ??
    (filters.regionOrCountry ? 1 : 0);

  return (
    <div className="flex flex-col h-full">
      <div ref={dropdownRef} className="relative">
        {/* Trigger TIM */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="
            inline-flex items-center
            w-[190px] h-[64px]
            rounded-[12px]
            border border-[#D0D0D0]
            bg-[#EDEDED]
            px-[14px]
          "
        >
          <div className="flex items-center gap-3 h-[36px]">
            <span className="inline-flex w-[32px] h-[32px]">
              {selectedInfo.isCountry && selectedInfo.flagCode ? (
                <CircleFlag
                  countryCode={selectedInfo.flagCode}
                  style={{ width: "32px", height: "32px" }}
                />
              ) : (
                <RegionIconTim size={30} />
              )}
            </span>

            <span
              className="
                inline-flex items-center 
                text-[16px] font-semibold
                text-[#171717]
              "
            >
              {selectedInfo.label}
            </span>
          </div>
        </button>

        {open && (
          <div
            className="
              absolute z-20 mt-2
              rounded-[12px]
              shadow-xl
              right-0
              border bg-white border-[#D0D0D0]
            "
            style={{
              width: "min(100vw - 52px, 518px)",
              maxWidth: "100vw",
              padding: "18px 24px",
              boxShadow: "0px 24px 44px 0px rgba(0,0,0,0.08)",
            }}
          >
            {/* Título + botón cerrar */}
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[14px] font-semibold text-[#111827]">
                Elige una región o país
              </p>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[#6B7280] hover:text-[#111827]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Buscador */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="
                    w-full rounded-2xl
                    pl-4 pr-9 py-3 text-sm outline-none border
                    bg-[#F4F4F4] text-[#171717] border-[#D0D0D0]
                    placeholder:text-[#9CA3AF]
                  "
                  placeholder="Buscar"
                />

                {/* Lupa a la DERECHA */}
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-[#9CA3AF]"
                    aria-hidden="true"
                  >
                    <path
                      d="M11 5a6 6 0 014.472 9.994l3.267 3.267a1 1 0 01-1.414 1.414l-3.267-3.267A6 6 0 1111 5z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Tabs País / Región + Aplicar filtro */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <button
                  className={`
                    px-4 py-2 rounded-full text-sm font-semibold
                    transition h-[38px] w-[100px]
                    ${
                      filters.regionOrCountryType === "country"
                        ? "bg-[#009DFF] text-white"
                        : "bg-transparent text-black"
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

                <button
                  className={`
                    px-4 py-2 rounded-full text-sm font-semibold
                    transition h-[38px] w-[100px]
                    ${
                      filters.regionOrCountryType === "region"
                        ? "bg-[#009DFF] text-white"
                        : "bg-transparent text-black"
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
              </div>

              {/* Enlace Aplicar filtro */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="
                  text-[13px] font-semibold
                  text-[#009DFF]
                  hover:underline underline-offset-2
                "
              >
                Aplicar filtro ({selectedCount})
              </button>
            </div>

            {/* Lista */}
            <div className="mb-4 max-h-60 overflow-y-auto custom-scrollbar-light">
              {filters.regionOrCountryType === "region" && (
                <>
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

                      const countriesCount =
                        (r as any).countriesCount ?? (r as any).numCountries;

                      return (
                        <button
                          key={r.code}
                          type="button"
                          onClick={() => handleSelectRegion(r)}
                          className={`
                            flex items-center justify-between
                            w-full rounded-[16px]
                            px-5 py-4 mb-2
                            transition
                            ${isActive ? "bg-[#E6F3FF]" : "bg-transparent"}
                          `}
                        >
                          <span className="flex items-center gap-2 text-left">
                            <span
                              className={`
                                flex items-center justify-center
                                w-[48px] h-[48px]
                                rounded-[14px]
                                ${
                                  isActive
                                    ? "bg-[#009DFF]"
                                    : "bg-transparent"
                                }
                              `}
                            >
                              <RegionIconTim size={28} active={isActive} />
                            </span>

                            <span className="flex flex-col text-left">
                              <span className="text-[16px] font-semibold text-[#171717]">
                                {r.name}{" "}
                                {typeof countriesCount === "number" &&
                                  countriesCount > 0 && (
                                    <span className="font-normal text-[#6B7280]">
                                      ({countriesCount} países)
                                    </span>
                                  )}
                              </span>
                              <span className="text-[13px] text-[#6B7280]">
                                {formatMinFrom(r.minFrom)}
                              </span>
                            </span>
                          </span>

                          <span className="w-5 h-5 flex items-center justify-center">
                            <span
                              className={`
                                block w-4 h-4 rounded-full border transition-all
                                ${
                                  isActive
                                    ? "border-[#009DFF] bg-[#009DFF]"
                                    : "border-[#D1D5DB] bg-white"
                                }
                              `}
                            >
                              {isActive && (
                                <span className="block m-auto w-2 h-2 rounded-full bg-white" />
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
                          onClick={() => handleSelectCountry(c)}
                          className={`
                            flex items-center justify-between
                            w-full rounded-[16px]
                            px-5 py-4 mb-2 transition
                            ${isActive ? "bg-[#E6F3FF]" : "bg-transparent"}
                          `}
                        >
                          <span className="flex items-center gap-2 text-left">
                            <span
                              className={`
                                flex items-center justify-center
                                w-[48px] h-[48px]
                                rounded-[14px]
                                ${
                                  isActive
                                    ? "bg-[#009DFF]"
                                    : "bg-transparent"
                                }
                              `}
                            >
                              {iso2 ? (
                                <CircleFlag
                                  countryCode={iso2}
                                  style={{
                                    width: 28,
                                    height: 28,
                                  }}
                                />
                              ) : (
                                <span className="text-[24px] leading-none">
                                  {c.flag}
                                </span>
                              )}
                            </span>

                            <span className="flex flex-col text-left">
                              <span className="text-[16px] font-semibold text-[#171717]">
                                {c.name}
                              </span>
                              <span className="text-[13px] text-[#6B7280]">
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
                                    ? "border-[#009DFF] bg-[#009DFF]"
                                    : "border-[#D1D5DB] bg-white"
                                }
                              `}
                            >
                              {isActive && (
                                <span className="block m-auto w-2 h-2 rounded-full bg-white" />
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

export default FilterRegionCountryTim;
