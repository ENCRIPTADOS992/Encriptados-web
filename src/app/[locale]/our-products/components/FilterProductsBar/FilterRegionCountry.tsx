// src/components/FilterRegionCountry.tsx
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import PortalDropdown from "@/shared/components/PortalDropdown";

type Option = {
  label: string;
  value: string;
  icon?: string;
};

const REGION_OPTIONS: Option[] = [
  { label: "Global", value: "global" },
  { label: "Europa", value: "europe" },
  { label: "Asia", value: "asia" },
  { label: "América del norte", value: "north_america" },
  { label: "Latinoamérica", value: "latam" },
  { label: "África", value: "africa" },
  { label: "Oriente M. y Asia", value: "middle_east_asia" },
  { label: "Islas del Caribe", value: "caribbean" },
];

const COUNTRY_OPTIONS: Option[] = [
  { label: "Colombia", value: "co", icon: "🇨🇴" },
  { label: "México", value: "mx", icon: "🇲🇽" },
  { label: "Reino Unido", value: "uk", icon: "🇬🇧" },
  { label: "España", value: "es", icon: "🇪🇸" },
  { label: "Italia", value: "it", icon: "🇮🇹" },
  { label: "Francia", value: "fr", icon: "🇫🇷" },
  { label: "Australia", value: "au", icon: "🇦🇺" },
  { label: "Alemania", value: "de", icon: "🇩🇪" },
  { label: "Portugal", value: "pt", icon: "🇵🇹" },
  { label: "Canadá", value: "ca", icon: "🇨🇦" },
];

const countryFlagImages: Record<string, string> = {
  co: "/images/dashboard/Colombia.png",
  mx: "/images/dashboard/mexico.png",
  uk: "/images/dashboard/united_kingdom.png",
  es: "/images/dashboard/spain.png",
  it: "/images/dashboard/italy.png",
  fr: "/images/dashboard/france.png",
  au: "/images/dashboard/australia.png",
  de: "/images/dashboard/germany.png",
  ca: "/images/dashboard/canada.png",
};

interface FilterRegionCountryProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
}

const FilterRegionCountry: React.FC<FilterRegionCountryProps> = ({
  filters,
  updateFilters,
}) => {
  const t = useTranslations("OurProductsPage");

  // Determina la opción seleccionada (región o país)
  const selected =
    COUNTRY_OPTIONS.find((c) => c.value === filters.regionOrCountry) ||
    REGION_OPTIONS.find((r) => r.value === filters.regionOrCountry) ||
    COUNTRY_OPTIONS[0];

  // Botón que abre/cierra el dropdown
  const toggleButton = (
    <button
      type="button"
      className={`
        flex items-center justify-between
        w-full md:w-[120px]
        border rounded-2xl shadow-md
        px-4 py-4
        transition duration-150 ease-in-out
        ${
          filters.regionOrCountry
            ? "border-[#CCCCCC] text-[#CCCCCC] bg-[#3E3E3E]"
            : "border-[#3E3E3E] text-[#7E7E7E] bg-[#222222]"
        }
      `}
    >
      <span className="flex items-center gap-x-2 truncate">
        {countryFlagImages[selected.value] && (
          <Image
            src={countryFlagImages[selected.value]}
            alt={selected.label}
            width={22}
            height={22}
            className="rounded-full"
          />
        )}
        <span className="uppercase truncate">
          {countryFlagImages[selected.value]
            ? selected.value.toUpperCase()
            : selected.label}
        </span>
      </span>
      <svg
        className="ml-2 w-4 h-4 text-[#7E7E7E]"
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
    </button>
  );

  // Contenido del dropdown: regiones y países
  const dropdownContent = (
    <div
      className="
        bg-[#222222]
        border border-[#3E3E3E]
        rounded-[12px] shadow-xl
        p-4
      "
      style={{ width: 520 }}
    >
      {/* Sección Regiones */}
      <div className="mb-4">
        <div className="font-semibold text-[#CCCCCC] text-sm mb-1">
          {t("filterProducts.regionTitle") || "Regiones"}
        </div>
        <div
          className="grid gap-2 mb-4"
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {REGION_OPTIONS.map((r) => (
            <button
              key={r.value}
              className={`
                flex items-center justify-center
                w-full h-[45px]
                rounded-[8px]
                uppercase font-semibold text-[12px]
                transition
                ${
                  filters.regionOrCountry === r.value
                    ? "bg-[#3E3E3E] border-[#CCCCCC] text-[#FFFFFF]"
                    : "bg-[#222222] border-[#3E3E3E] text-[#CCCCCC] hover:bg-[#3E3E3E]"
                }
              `}
              style={{ padding: "14px 10px" }}
              onClick={() => {
                updateFilters({ regionOrCountry: r.value });
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Sección Países */}
        <div className="font-semibold text-[#CCCCCC] text-sm mb-1">
          {t("filterProducts.countryTitle") || "Países"}
        </div>
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {COUNTRY_OPTIONS.map((c) => (
            <button
              key={c.value}
              className={`
                flex items-center justify-start
                w-full h-[45px]
                rounded-[8px]
                uppercase font-semibold text-[12px]
                transition
                ${
                  filters.regionOrCountry === c.value
                    ? "bg-[#3E3E3E] border-[#CCCCCC] text-[#FFFFFF]"
                    : "bg-[#222222] border-[#3E3E3E] text-[#CCCCCC] hover:bg-[#3E3E3E]"
                }
              `}
              style={{ padding: "14px 10px" }}
              onClick={() => {
                updateFilters({ regionOrCountry: c.value });
              }}
            >
              {countryFlagImages[c.value] && (
                <Image
                  src={countryFlagImages[c.value]}
                  alt={c.label}
                  width={20}
                  height={20}
                  className="mr-2 rounded-full"
                />
              )}
              {!countryFlagImages[c.value] && c.icon && (
                <span className="mr-2 text-lg">{c.icon}</span>
              )}
              <span className="truncate">{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <span className="mb-2 text-sm font-semibold text-[#7E7E7E]">
        {t("filterProducts.regionTitle") || "Región / País"}
      </span>

      <PortalDropdown
        toggle={toggleButton}
        dropdownClass="z-50"
      >
        {dropdownContent}
      </PortalDropdown>
    </div>
  );
};

export default FilterRegionCountry;