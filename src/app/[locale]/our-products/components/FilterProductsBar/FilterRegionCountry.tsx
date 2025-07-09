import React from "react";
import MenuDropdownProductBar from "./MenuDropdownProductBar";
import { useTranslations } from "next-intl";
import { ProductFilters } from "@/features/products/types/ProductFilters";

const REGION_OPTIONS = [
  { label: "Global", value: "global" },
  { label: "Europa", value: "europe" },
  { label: "Asia", value: "asia" },
  { label: "América del norte", value: "north_america" },
  { label: "Latinoamérica", value: "latam" },
  { label: "África", value: "africa" },
  { label: "Oriente M. y Asia", value: "middle_east_asia" },
  { label: "Islas del Caribe", value: "caribbean" },
];

const COUNTRY_OPTIONS = [
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
  // ...más países
];

interface FilterRegionCountryProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
}

const FilterRegionCountry: React.FC<FilterRegionCountryProps> = ({
  filters,
  updateFilters,
}) => {
  const t = useTranslations("OurProductsPage");

  return (
    <div className="flex flex-row space-x-4">
      {/* REGIÓN */}
      <div>
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2 whitespace-nowrap">
          {t("filterProducts.regionTitle") || "Región"}
        </h1>
        <MenuDropdownProductBar
          name="region"
          options={REGION_OPTIONS}
          value={filters.region || "global"}
          onChangeExternal={(value) => {
            updateFilters({ region: value, country: undefined });
          }}
        />
      </div>
      {/* PAÍS */}
      <div>
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2 whitespace-nowrap">
          {t("filterProducts.countryTitle") || "País"}
        </h1>
        <MenuDropdownProductBar
          name="country"
          options={COUNTRY_OPTIONS.map((c) => ({
            ...c,
            label: (
              <span className="flex items-center space-x-2">
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </span>
            ),
          }))}
          value={filters.country || "co"}
          onChangeExternal={(value) => {
            updateFilters({ country: value });
          }}
        />
      </div>
    </div>
  );
};

export default FilterRegionCountry;
