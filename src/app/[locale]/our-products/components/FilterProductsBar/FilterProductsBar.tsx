"use client";

import React, { isValidElement } from "react";
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
  { key: "routers", label: "Routers", catId: 50, Icon: RoutersBarIcon },
] as const;

interface FilterProductsBarProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
  products?: Product[];
}

export default function FilterProductsBar({
  filters,
  updateFilters,
  products,
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
          key="region-country"
        />
      );
    }
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto bg-[#161616] rounded-xl px-4 lg:px-8 py-6">
      <div className="flex flex-col gap-4
                lg:flex-row lg:flex-wrap lg:items-end lg:justify-between
                xl:flex-nowrap">

        {/* Categoría */}
        <div className="w-full  xl:w-[360px]">
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

        {/* Subfiltros */}
        <div className="flex flex-wrap items-end gap-4 flex-1 min-w-0">

          {subfilters.map((child, idx) => {
            const isRegion =
              isValidElement(child) &&
              ((typeof child.type === "function" && child.type.name === "FilterRegionCountry") ||
                child.props?.key === "region-country");

            return (
              <div
                key={idx}
                className={
                  isRegion
                    ? "w-full sm:w-[200px] md:w-[150px]"
                    : "w-full sm:w-[200px] sm:flex-1 min-w-0"
                }
              >
                {child}
              </div>
            );
          })}

          {/* Search */}
          <div className="w-full xl:w-56 xl:ml-auto">
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

}
