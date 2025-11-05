"use client";

import React from "react";
import ListOfFiltersButton from "./ListOfFiltersButton";
import SimProductsBarIcon from "./icons/SimProductsBarIcon";
import AplicationsProductsBarIcon from "./icons/AplicationsProductsBarIcon";
import PhoneProductsBarIcon from "./icons/PhoneProductsBarIcon";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import SearchProduct from "./SearchProduct";
import { useTranslations } from "next-intl";
import FilterAppWithLicense from "./FilterAppWithLicense";
import FilterProviderServices from "./FilterProviderServices";
import FilterRegionCountry from "./FilterRegionCountry";
import { Product } from "@/features/products/types/AllProductsResponse";
import RoutersBarIcon from "./icons/RoutersBarIcon";

const ICON_COLOR_SELECTED = "#CCCCCC";
const ICON_COLOR_UNSELECTED = "#7E7E7E";

const FILTER_OPTIONS = [
  { key: "sim", label: "SIM", catId: 40, Icon: SimProductsBarIcon },
  {
    key: "app",
    label: "Aplicaciones",
    catId: 38,
    Icon: AplicationsProductsBarIcon,
  },
  { key: "mobile", label: "Software", catId: 35, Icon: PhoneProductsBarIcon },
  { key: "routers", label: "Routers", catId: 36, Icon: RoutersBarIcon },
] as const;

interface FilterProductsBarProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
  products?: Product[];
  variant?: "static" | "floating"; // 👈 nuevo
}

export default function FilterProductsBar({
  filters,
  updateFilters,
  products,
  variant = "static",
}: FilterProductsBarProps) {
  const t = useTranslations("OurProductsPage");
  const selectedCat = parseInt(filters.selectedOption, 10);

  const items = FILTER_OPTIONS.map(({ key, label, catId, Icon }) => ({
    value: String(catId),
    label:
      key === "app"
        ? t("filterProducts.apps")
        : key === "mobile"
        ? "Software"
        : label,
    icon: (
      <Icon
        color={
          selectedCat === catId ? ICON_COLOR_SELECTED : ICON_COLOR_UNSELECTED
        }
      />
    ),
  }));

  const activeTimService =
    filters.timService ?? ("esim_datos" as "esim_datos");

  let subfilters: React.ReactNode[] = [];
  if (selectedCat === 40) {
    subfilters = [
      <FilterProviderServices
        filters={filters}
        updateFilters={updateFilters}
        key="provider-services"
      />,
    ];
    if (filters.provider === "tim") {
      subfilters.push(
        <FilterRegionCountry
          filters={filters}
          updateFilters={updateFilters}
          service={filters.timService || "esim_datos"}
          key="region-country"
        />
      );
    }
  } else if (selectedCat === 38 || selectedCat === 35) {
    subfilters = [
      <FilterAppWithLicense
        filters={filters}
        updateFilters={updateFilters}
        products={products}
        key="app-license"
      />,
    ];
    if (filters.provider === "tim") {
      subfilters.push(
        <FilterRegionCountry
          filters={filters}
          updateFilters={updateFilters}
          service={activeTimService}
          key="region-country"
        />
      );
    }
  }

  const containerClass = `
    w-full max-w-screen-xl mx-auto
    bg-[#161616] rounded-xl
    px-4 lg:px-8 py-6
    ${variant === "floating" ? "shadow-[0_14px_54px_rgba(0,0,0,0.8)]" : ""}
  `;

  const content = (
    <div className={containerClass}>
      <div
        className="
          flex flex-col gap-4
          xl:flex-row xl:items-end xl:justify-between
        "
      >
        {/* Categoría */}
        <div className="w-full xl:w-[360px]">
          <h2 className="text-sm text-[#7E7E7E] font-semibold mb-2">
            {t("filterProducts.categoryTitle")}
          </h2>
          <ListOfFiltersButton
            items={items}
            value={filters.selectedOption}
            onChange={(value) => {
              updateFilters({ selectedOption: value });
            }}
          />
        </div>

        {/* Subfiltros + búsqueda */}
        <div className="flex flex-col flex-1 gap-2 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex flex-wrap sm:flex-nowrap items-end gap-2 flex-1">
            {subfilters.map((child, idx) => {
              const element = React.isValidElement(child) ? child : null;
              const childKey = element?.key?.toString();
              const isRegion = childKey === "region-country";

              return (
                <div
                  key={idx}
                  className={
                    isRegion
                      ? "w-full sm:w-[200px] md:w-[150px] min-w-0 flex-shrink-0"
                      : "w-full sm:w-[200px] sm:flex-auto min-w-0"
                  }
                >
                  {child}
                </div>
              );
            })}
          </div>

          <div className="w-full mt-2 xl:mt-0 xl:w-56 xl:ml-auto">
            <SearchProduct
              name="searchinputproduct"
              placeholder={t("filterProducts.searchPlaceholder")}
              containerClassName="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === "floating") {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 pb-2 bg-[#0B0B0B]/70 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
