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

const FilterRegionCountry: React.FC<FilterRegionCountryProps> = ({
  filters,
  updateFilters,
}) => {
  console.log("[FilterRegionCountry] filters.regionOrCountryType:", filters.regionOrCountryType);
console.log("[FilterRegionCountry] filters.regionOrCountry:", filters.regionOrCountry);

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

useEffect(() => {
  if (!filters.regionOrCountryType || !filters.regionOrCountry) {
    updateFilters({
      regionOrCountryType: filters.regionOrCountryType ?? "region",
      regionOrCountry: filters.regionOrCountry ?? "global",
    });
  }
  // eslint-disable-next-line
}, []);


// if (!filters.regionOrCountryType || !filters.regionOrCountry) {
//   return null;
// }

  return (
    <div className="flex flex-col h-full">
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

      <div
        className="relative flex-1 min-w-0 max-w-full md:max-w-[120px] xl:max-w-[120px]"
        ref={dropdownRef}
      >
        <button
          type="button"
          className={`
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
  `}
          style={{
            width: "100%",
            minWidth: 0,
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex items-center gap-x-2 truncate">
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
            <span className="uppercase truncate">
              {countryFlagImages[selected.value]
                ? selected.value.toUpperCase()
                : selected.label}
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
            {/* Toggle Región / País */}
            <div className="flex gap-3 mb-6">
              <button
                className={`
          px-4 py-2 rounded-full text-sm font-semibold
          transition
          ${
            filters.regionOrCountryType === "region"
              ? "bg-[#3393F7] text-white"
              : "bg-[#18191B] text-[#CCCCCC] border border-[#3393F7]"
          }
        `}
                type="button"
                onClick={() => updateFilters({ regionOrCountryType: "region" })}
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
              : "bg-[#18191B] text-[#CCCCCC] border border-[#3393F7]"
          }
        `}
                type="button"
                onClick={() =>
                  updateFilters({ regionOrCountryType: "country" })
                }
              >
                País
              </button>
            </div>
            {/* Lista dinámica según toggle */}
            <div className="mb-4">
              {filters.regionOrCountryType === "region" && (
                <>
                  <div
                    className="font-semibold text-[#CCCCCC] text-sm mb-3"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {t("filterProducts.regionTitle") || "Regiones"}
                  </div>
                  <div className="flex flex-col gap-2">
                    {REGION_OPTIONS.map((r) => (
                      <button
                        key={r.value}
                        className={`
                  flex items-center justify-between
                  w-full
                  rounded-xl
                  border
                  px-4 py-3
                  transition
                  ${
                    filters.regionOrCountry === r.value
                      ? "bg-[#25272B] border-[#3393F7]"
                      : "bg-[#18191B] border-[#333] hover:bg-[#232427]"
                  }
                `}
                        style={{ minHeight: 60 }}
                        onClick={() => {
                          setOpen(false);
                          updateFilters({ regionOrCountry: r.value });
                        }}
                      >
                        {/* Izquierda: ícono (globo genérico) */}
                        <span className="flex items-center gap-3">
                          <span className="bg-[#1C1E21] rounded-full w-9 h-9 flex items-center justify-center mr-3">
                            <svg
                              width={22}
                              height={22}
                              fill="none"
                              viewBox="0 0 22 22"
                            >
                              <circle
                                cx="11"
                                cy="11"
                                r="10"
                                stroke="#3393F7"
                                strokeWidth="2"
                              />
                              <ellipse
                                cx="11"
                                cy="11"
                                rx="6"
                                ry="10"
                                stroke="#3393F7"
                                strokeWidth="2"
                              />
                            </svg>
                          </span>
                          <span className="flex flex-col text-left">
                            <span className="font-bold text-[16px] text-white">
                              {r.label}
                            </span>
                            <span className="text-xs text-[#CCCCCC]">
                              Desde €9.99
                            </span>
                          </span>
                        </span>
                        {/* Derecha: radio */}
                        <span className="w-5 h-5 flex items-center justify-center">
                          <span
                            className={`block w-4 h-4 rounded-full border transition-all
                      ${
                        filters.regionOrCountry === r.value
                          ? "border-[#3393F7] bg-[#3393F7]"
                          : "border-[#555] bg-[#232427]"
                      }
                    `}
                          >
                            {filters.regionOrCountry === r.value && (
                              <span className="block m-auto w-2 h-2 rounded-full bg-white"></span>
                            )}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {filters.regionOrCountryType === "country" && (
                <>
                  <div
                    className="font-semibold text-[#CCCCCC] text-sm mb-3"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {t("filterProducts.countryTitle") || "Países"}
                  </div>
                  <div className="flex flex-col gap-2">
                    {COUNTRY_OPTIONS.map((c) => (
                      <button
                        key={c.value}
                        className={`
                  flex items-center justify-between
                  w-full
                  rounded-xl
                  border
                  px-4 py-3
                  transition
                  ${
                    filters.regionOrCountry === c.value
                      ? "bg-[#25272B] border-[#3393F7]"
                      : "bg-[#18191B] border-[#333] hover:bg-[#232427]"
                  }
                `}
                        style={{ minHeight: 60 }}
                        onClick={() => {
                          setOpen(false);
                          updateFilters({ regionOrCountry: c.value });
                        }}
                      >
                        <span className="flex items-center gap-3">
                          {countryFlagImages[c.value] && (
                            <Image
                              src={countryFlagImages[c.value]}
                              alt={c.label}
                              width={34}
                              height={34}
                              className="rounded-full mr-3"
                            />
                          )}
                          <span className="flex flex-col text-left">
                            <span className="font-bold text-[16px] text-white">
                              {c.label}
                            </span>
                            <span className="text-xs text-[#CCCCCC]">
                              Desde €9.99
                            </span>
                          </span>
                        </span>
                        <span className="w-5 h-5 flex items-center justify-center">
                          <span
                            className={`block w-4 h-4 rounded-full border transition-all
                      ${
                        filters.regionOrCountry === c.value
                          ? "border-[#3393F7] bg-[#3393F7]"
                          : "border-[#555] bg-[#232427]"
                      }
                    `}
                          >
                            {filters.regionOrCountry === c.value && (
                              <span className="block m-auto w-2 h-2 rounded-full bg-white"></span>
                            )}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
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
