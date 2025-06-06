"use client";

import React from "react";
import ListOfFiltersButton from "./ListOfFiltersButton";
import SimProductsBarIcon from "./icons/SimProductsBarIcon";
import AplicationsProductsBarIcon from "./icons/AplicationsProductsBarIcon";
import PhoneProductsBarIcon from "./icons/PhoneProductsBarIcon";
import { useFormContext } from "react-hook-form";
import { ProductFilters } from "@/features/products/types/ProductFilters";

import SearchProduct from "./SearchProduct";
import { useTranslations } from "next-intl";

import FilterAppWithLicense from "./FilterAppWithLicense";
import FilterProviderServices from "./FilterProviderServices";

const ICON_COLOR_SELECTED = "#0AAEE1";
const ICON_COLOR_UNSELECTED = "#7E7E7E";

const FILTER_OPTIONS = [
  { key: "sim", label: "SIM", catId: 40, Icon: SimProductsBarIcon },
  { key: "app", label: "Aplicaciones", catId: 38, Icon: AplicationsProductsBarIcon },
  { key: "mobile", label: "Sistemas", catId: 35, Icon: PhoneProductsBarIcon },
] as const;

interface FilterProductsBarProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
}

export default function FilterProductsBar({ filters, updateFilters }: FilterProductsBarProps) {
  const t = useTranslations("OurProductsPage");
  const selectedCat = parseInt(filters.selectedOption, 10);


    const items = FILTER_OPTIONS.map(({ key, label, catId, Icon }) => ({
    value: String(catId),
    label:
      key === "app"
        ? t("filterProducts.apps")
        : key === "mobile"
        ? "Sistemas"
        : label,
    icon: <Icon color={selectedCat === catId ? ICON_COLOR_SELECTED : ICON_COLOR_UNSELECTED} />,
  }));


 let SubFilterComponent: React.ReactNode = null;
  switch (selectedCat) {
    case 40:
      SubFilterComponent = <FilterProviderServices filters={filters} updateFilters={updateFilters} />;
      break;
    case 38:
    case 35:
      SubFilterComponent = <FilterAppWithLicense filters={filters} updateFilters={updateFilters} />;
      break;
  }

  return (
    <div className="bg-white rounded-xl p-5 md:p-7 w-full max-w-7xl mx-auto ">
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-end lg:space-x-4 justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <div className="w-full lg:w-[340px] lg:mr-6">
              <h1 className="text-[rgb(8,93,119)] font-semibold mb-2">
                {t("filterProducts.categoryTitle")}
              </h1>
              <ListOfFiltersButton
                items={items}
                value={filters.selectedOption}
                onChange={(value) => {
                  console.log("[FilterProductsBar] Cambio de categoría:", value);
                  updateFilters({ selectedOption: value });
                }}
              />


            </div>

            {SubFilterComponent}
          </div>
        </div>

        <div className="flex  w-full sm:w-auto ">
          <SearchProduct
            name="searchinputproduct"
            placeholder={t("filterProducts.searchPlaceholder")}
          />
        </div>
      </div>
    </div>
  );
}
