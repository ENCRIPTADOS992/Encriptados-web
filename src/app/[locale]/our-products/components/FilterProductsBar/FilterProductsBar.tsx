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

import { Product } from "@/features/products/types/AllProductsResponse";
import SearchSvg from "@/shared/svgs/SearchSvg";

const ICON_COLOR_SELECTED = "#CCCCCC";
const ICON_COLOR_UNSELECTED = "#7E7E7E";

const FILTER_OPTIONS = [
  { key: "sim", label: "SIM", catId: 40, Icon: SimProductsBarIcon },
  { key: "app", label: "Aplicaciones", catId: 38, Icon: AplicationsProductsBarIcon },
  { key: "mobile", label: "Software", catId: 35, Icon: PhoneProductsBarIcon },
] as const;

interface FilterProductsBarProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
  products?: Product[];
}

export default function FilterProductsBar({ filters, updateFilters, products }: FilterProductsBarProps) {
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
    icon: <Icon color={selectedCat === catId ? ICON_COLOR_SELECTED : ICON_COLOR_UNSELECTED} />,
  }));


  let SubFilterComponent: React.ReactNode = null;
  switch (selectedCat) {
    case 40:
      SubFilterComponent = <FilterProviderServices filters={filters} updateFilters={updateFilters} />;
      break;
    case 38:
    case 35:
      SubFilterComponent = <FilterAppWithLicense filters={filters} updateFilters={updateFilters} products={products} />;
      break;
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto bg-[#161616] rounded-xl px-4 lg:px-8 py-6">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-end sm:space-x-4 justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0">
         <div className="w-full sm:w-[340px] sm:mr-6">
              <h2 className="text-sm text-[#7E7E7E] font-semibold mb-2">
                {t("filterProducts.categoryTitle")}
              </h2>
              <ListOfFiltersButton
                items={items}
                value={filters.selectedOption}
                onChange={(value) => {
                  console.log("[FilterProductsBar] Cambio de categoría:", value);
                  updateFilters({ selectedOption: value });
                }}
              />
            </div >
            {SubFilterComponent}
          </div>
        </div>

        <div className="flex w-full justify-end items-center">
          {/* 1️⃣ Input completo en <640px */}
          <div className="w-full sm:hidden">
            <SearchProduct
              name="searchinputproduct"
              placeholder={t("filterProducts.searchPlaceholder")}
              containerClassName="w-full"
            />
          </div>

          {/* 2️⃣ Botón redondo SOLO en md (768–1023px) */}
          <div className="hidden sm:flex xl:hidden">
            <button
              type="button"
              className="bg-[#222222] p-5 rounded-3xl shadow-sm"
              onClick={() => {
                /* aquí podrías abrir un modal o cambiar un estado para desplegar el input */
              }}
            >
              <SearchSvg color="#CCCCCC" />
            </button>
          </div>

          {/* 3️⃣ Input completo en ≥lg (≥1024px) */}
          <div className="hidden xl:block w-full xl:w-80">
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
