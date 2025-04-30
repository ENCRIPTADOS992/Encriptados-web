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

type IconKeys = "sim" | "app" | "mobile";

interface IconProps {
  height?: any;
  width?: any;
  color?: any;
}

const icons: Record<IconKeys, React.FC<IconProps>> = {
  sim: SimProductsBarIcon,
  app: AplicationsProductsBarIcon,
  mobile: PhoneProductsBarIcon,
};

export default function FilterProductsBar() {
  const t = useTranslations("OurProductsPage");
  const { getValues } = useFormContext();
  const selected = getValues("selectedOption") as IconKeys;

  const ICON_COLOR_SELECTED = "#0AAEE1";
  const ICON_COLOR_UNSELECTED = "#7E7E7E";
  const items = Object.keys(icons).map((key) => {
    const iconKey = key as IconKeys;
    return {
      value: iconKey,
      label:
        iconKey === "app"
          ? t("filterProducts.apps")
          : iconKey === "mobile"
          ? "Sistemas"
          : key.charAt(0).toUpperCase() + key.slice(1),
      icon: React.createElement(icons[iconKey], {
        color:
          selected === iconKey ? ICON_COLOR_SELECTED : ICON_COLOR_UNSELECTED,
      }),
    };
  });

  const selectedSubfilter = {
    app: <FilterAppWithLicense />,
    sim: <FilterProviderServices />,
    mobile: <FilterAppWithLicense />,
  };

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

            {selectedSubfilter[selected]}
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
