"use client";

import React from "react";
import ListOfFiltersButton from "./ListOfFiltersButton";
import SimProductsBarIcon from "./icons/SimProductsBarIcon";
import AplicationsProductsBarIcon from "./icons/AplicationsProductsBarIcon";
import PhoneProductsBarIcon from "./icons/PhoneProductsBarIcon";
import { useFormContext } from "react-hook-form";

import SearchProduct from "./SearchProduct";
import { useTranslations } from "next-intl";

import FilterAppWithLicense from "./FilterAppWithLicense";
import FilterProviderServices from "./FilterProviderServices";

const ICON_COLOR_SELECTED = "#0AAEE1";
const ICON_COLOR_UNSELECTED = "#7E7E7E";

const FILTER_OPTIONS = [
  {
    key: "sim",
    label: "SIM",
    catId: 40,
    Icon: SimProductsBarIcon,
  },
  {
    key: "app",
    label: "Aplicaciones",
    catId: 38,
    Icon: AplicationsProductsBarIcon,
  },
  {
    key: "mobile",
    label: "Sistemas",
    catId: 35,
    Icon: PhoneProductsBarIcon,
  },
] as const;


export default function FilterProductsBar() {
  const t = useTranslations("OurProductsPage");
  const { getValues } = useFormContext<{ selectedOption: number }>();
  const selectedCat = getValues("selectedOption");
  console.log("[FilterProductsBar] selectedOption (cat ID):", selectedCat);


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
    case 40: // SIM
      SubFilterComponent = <FilterProviderServices />;
      break;
    case 38: // Aplicaciones
    case 35: // Sistemas
      SubFilterComponent = <FilterAppWithLicense />;
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
              <ListOfFiltersButton items={items} name="selectedOption" />
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
