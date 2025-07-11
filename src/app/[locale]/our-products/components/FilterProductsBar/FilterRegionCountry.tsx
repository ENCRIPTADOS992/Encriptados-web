import React, { useState, useRef, useEffect } from "react";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import { useTranslations } from "next-intl";
import Image from "next/image";

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

interface FilterRegionCountryProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
}

const countryFlagImages: Record<string, string> = {
  co: "/images/dashboard/colombia.png",
  mx: "/images/dashboard/mexico.png",
  uk: "/images/dashboard/united_kingdom.png",
  es: "/images/dashboard/spain.png",
  it: "/images/dashboard/italy.png",
  fr: "/images/dashboard/france.png",
  au: "/images/dashboard/australia.png",
  de: "/images/dashboard/germany.png",
  ca: "/images/dashboard/canada.png",
};

const FilterRegionCountry: React.FC<FilterRegionCountryProps> = ({
  filters,
  updateFilters,
}) => {
  const t = useTranslations("OurProductsPage");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const selected =
    COUNTRY_OPTIONS.find((c) => c.value === filters.regionOrCountry) ||
    REGION_OPTIONS.find((r) => r.value === filters.regionOrCountry) ||
    COUNTRY_OPTIONS[0];

  return (
    <div>
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

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className={`
            flex items-center justify-between
            w-full h-[58px]
            p-4
            border
            rounded-2xl
            text-sm
            transition-all
            focus:outline-none
            ${
              open
                ? "bg-[#3E3E3E] border-[#CCCCCC] text-[#CCCCCC]"
                : "bg-[#222222] border-[#3E3E3E] text-[#CCCCCC]"
            }
            hover:bg-[#3E3E3E]"
          `}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex items-center gap-2 truncate">
            {countryFlagImages[selected.value] && (
              <Image
                src={countryFlagImages[selected.value]}
                alt={selected.label}
                width={22}
                height={22}
                className="rounded-full"
                priority
              />
            )}
            <span className="uppercase ">
              {countryFlagImages[selected.value]
                ? selected.value.toUpperCase()
                : selected.label}
            </span>
          </span>
          {/* Flecha */}
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
        </button>

        {open && (
          <div
            className="
              absolute z-20 mt-2
              bg-[#222222]
              border border-[#3E3E3E]
              rounded-[12px]
              shadow-xl
              right-0
            "
            style={{
              width: 518,
              padding: "18px 24px",
              boxShadow: "0px 24px 44px 0px rgba(0,0,0,0.08)",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#3E3E3E",
            }}
          >
            <div className="mb-4">
              <div
                className="font-semibold text-[#CCCCCC] text-sm mb-1"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t("filterProducts.regionTitle") || "Regiones"}
              </div>
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  width: 470,
                  marginBottom: 8,
                }}
              >
                {REGION_OPTIONS.map((r) => (
                  <button
                    key={r.value}
                    className={`
                      flex items-center justify-start
                      w-full
                      h-[45px]
                      rounded-[8px]
                      uppercase
                      font-semibold
                      text-[12px]
                      
                      transition
                      ${
                        filters.regionOrCountry === r.value
                          ? "bg-[#3E3E3E] border-[#CCCCCC] text-[#FFFFFF]"
                          : "bg-[#222222] border-[#3E3E3E] text-[#CCCCCC] hover:bg-[#3E3E3E]"
                      }
                    `}
                    style={{ padding: "14px 10px" }}
                    onClick={() => {
                      setOpen(false);
                      updateFilters({ regionOrCountry: r.value });
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <div
                className="mb-1 font-semibold text-[#CCCCCC] text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t("filterProducts.countryTitle") || "Países"}
              </div>
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  width: 470,
                  marginBottom: 8,
                }}
              >
                {COUNTRY_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    className={`
                      flex items-center justify-start
                      w-full
                      h-[45px]
                      rounded-[8px]
                      uppercase
                      font-semibold
                      text-[12px]
                      transition
                      ${
                        filters.regionOrCountry === c.value
                          ? "bg-[#3E3E3E] border-[#CCCCCC] text-[#FFFFFF]"
                          : "bg-[#222222] border-[#3E3E3E] text-[#CCCCCC] hover:bg-[#3E3E3E]"
                      }
                    `}
                    style={{ padding: "14px 10px" }}
                    onClick={() => {
                      setOpen(false);
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
                    <span
                      className="
                        text-[12px]
                        leading-[12px]
                        font-semibold
                        uppercase
                        text-left
                        truncate
                      "
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {c.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterRegionCountry;
