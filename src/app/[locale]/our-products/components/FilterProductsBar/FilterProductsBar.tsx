// src/app/[locale]/our-products/components/FilterProductsBar/FilterProductsBar.tsx
"use client";

import React, { useRef, useEffect, useCallback } from "react";
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
  onClose?: () => void;
}

export default function FilterProductsBar({
  filters,
  updateFilters,
  products,
  variant = "static",
  onClose,
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

  // Variante flotante (barra fija abajo - responsive para mobile/tablet/desktop)
  if (variant === "floating") {
    const modalRef = useRef<HTMLDivElement>(null);

    const navItems: {
      key: "sims" | "apps" | "systems" | "routers" | "offers";
      label: string;
      catId?: number;
    }[] = [
        { key: "sims", label: "SIM's", catId: 40 },
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

    // Handler para cerrar al hacer click fuera
    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    }, [onClose]);

    return (
      <>
        {/* Overlay para cerrar al hacer click fuera */}
        <div
          className="fixed inset-0 z-40"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />

        {/* Modal flotante */}
        <div
          ref={modalRef}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            className="
              bg-[#161616]
              rounded-2xl
              px-3 sm:px-4 md:px-6
              py-2 sm:py-2.5 md:py-3
              flex items-center 
              gap-2 sm:gap-3 md:gap-6
              shadow-xl
              shadow-black/60
            "
          >
            {/* Logo / marca */}
            <div className="flex items-center gap-2 pr-2 sm:pr-4">
              <MobileMenuSvg width={120} height={35} className="sm:w-[160px] md:w-[180px]" />
            </div>

            {/* Tabs - responsive con scroll horizontal en mobile */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 overflow-x-auto scrollbar-hide">
              {navItems.map((item) => {
                const isActive =
                  item.catId !== undefined && item.catId === selectedCat;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={`
                      px-3 sm:px-4 md:px-5
                      py-1.5 sm:py-2
                      rounded-lg
                      text-xs sm:text-sm
                      font-medium
                      whitespace-nowrap
                      transition-all duration-200
                      ${isActive
                        ? "bg-[#404040] text-white"
                        : "text-[#888888] hover:text-white hover:bg-[#404040]"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </>
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
