// src/app/[locale]/our-products/components/FilterProductsBar/FilterProductsBar.tsx
"use client";

import React from "react";
import ListOfFiltersButton from "./ListOfFiltersButton";
import SimProductsBarIcon from "./icons/SimProductsBarIcon";
import AplicationsProductsBarIcon from "./icons/AplicationsProductsBarIcon";
import PhoneProductsBarIcon from "./icons/PhoneProductsBarIcon";
import RoutersBarIcon from "./icons/RoutersBarIcon";
import FilterAppWithLicense from "./FilterAppWithLicense";
import FilterProviderServices from "./FilterProviderServices";
import FilterRegionCountry from "./FilterRegionCountry";
import SectionWrapper from "@/shared/components/SectionWrapper";

import { ProductFilters } from "@/features/products/types/ProductFilters";
import { Product } from "@/features/products/types/AllProductsResponse";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

import MobileMenuSvg from "@/shared/svgs/EncryptedLogoSvg";

const ICON_COLOR_SELECTED = "#CCCCCC";
const ICON_COLOR_UNSELECTED = "#7E7E7E";

const FILTER_OPTIONS = [
  { key: "sim", label: "SIM", catId: 40, Icon: SimProductsBarIcon },
  { key: "app", label: "Aplicaciones", catId: 38, Icon: AplicationsProductsBarIcon },
  { key: "mobile", label: "Software", catId: 35, Icon: PhoneProductsBarIcon },
  { key: "routers", label: "Routers", catId: 36, Icon: RoutersBarIcon },
] as const;

interface FilterProductsBarProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
  products?: Product[];
  variant?: "static" | "floating";
}

export default function FilterProductsBar({
  filters,
  updateFilters,
  products,
  variant = "static",
}: FilterProductsBarProps) {
  const t = useTranslations("OurProductsPage");
  const router = useRouter();

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

  type TimServiceType = "esim_datos" | "recarga_datos" | "sim_fisica";

  const activeTimService: TimServiceType =
    (filters.timService as TimServiceType) ?? "esim_datos";

  const isTim = filters.provider === "tim";
  const isTimSimFisica = isTim && activeTimService === "sim_fisica";
  const shouldShowTimRegion = isTim && !isTimSimFisica;

  let subfilters: React.ReactNode[] = [];

  if (selectedCat === 40) {
    // SIMs
    subfilters = [
      <FilterProviderServices
        filters={filters}
        updateFilters={updateFilters}
        key="provider-services"
      />,
    ];

    if (shouldShowTimRegion) {
      subfilters.push(
        <FilterRegionCountry
          filters={filters}
          updateFilters={updateFilters}
          service={activeTimService}
          key="region-country"
        />
      );
    }
  } else if (selectedCat === 38 || selectedCat === 35) {
    // Apps / Software
    subfilters = [
      <FilterAppWithLicense
        filters={filters}
        updateFilters={updateFilters}
        products={products}
        key="app-license"
      />,
    ];

    if (shouldShowTimRegion) {
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

  // Variante flotante (barra fija abajo en mobile)
  if (variant === "floating") {
    const navItems: {
      key: "sims" | "apps" | "systems" | "routers" | "offers";
      label: string;
      catId?: number;
    }[] = [
      { key: "sims", label: "SIMs", catId: 40 },
      { key: "apps", label: "Apps", catId: 38 },
      { key: "systems", label: "Sistemas", catId: 35 },
      { key: "routers", label: "Routers", catId: 36 },
      { key: "offers", label: "Ofertas" },
    ];

    const handleNavClick = (item: (typeof navItems)[number]) => {
      if (item.key === "offers") {
        router.push("/offers");
        return;
      }

      if (item.catId) {
        updateFilters({ selectedOption: String(item.catId) });

        const filtersEl = document.getElementById("filters-section");
        if (filtersEl) {
          const rect = filtersEl.getBoundingClientRect();
          const offset = window.scrollY + rect.top - 16;
          window.scrollTo({ top: offset, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#050505]/70 backdrop-blur-sm">
        <SectionWrapper className="py-3">
          <div
            className="
              w-full
              bg-[#161616]
              rounded-xl
              px-4 md:px-6 py-3
              flex items-center justify-between gap-4
            "
          >
            {/* Logo / marca */}
            <div className="flex items-center gap-3">
              <MobileMenuSvg width={180} height={52} />
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive =
                  item.catId !== undefined && item.catId === selectedCat;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium
                      transition-colors
                      ${
                        isActive
                          ? "bg-[#2A2A2A] text-white"
                          : "text-[#A3A3A3] hover:text-white"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </SectionWrapper>
      </div>
    );
  }

  // Variante estática
  return (
    <div className="w-full max-w-screen-xl mx-auto bg-[#161616] rounded-xl px-4 lg:px-8 py-6">
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

        {/* Subfiltros */}
        <div className="flex flex-col flex-1 gap-2 xl:flex-row xl:items-end xl:justify-start">
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
                      ? "relative w-full sm:w-[200px] md:w-[150px] min-w-0 flex-shrink-0"
                      : "relative w-full sm:w-[200px] sm:flex-auto min-w-0"
                  }
                >
                  {child}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
