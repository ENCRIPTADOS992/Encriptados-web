// src/app/[locale]/our-products/components/FilterProductsBar/FilterProductsBar.tsx
"use client";

import React, { useRef, useEffect, useCallback } from "react";
import ListOfFiltersButton from "./ListOfFiltersButton";
import SimProductsBarIcon from "./icons/SimProductsBarIcon";
import AplicationsProductsBarIcon from "./icons/AplicationsProductsBarIcon";
import PhoneProductsBarIcon from "./icons/PhoneProductsBarIcon";
import RoutersBarIcon from "./icons/RoutersBarIcon";
import FilterAppWithLicense from "./FilterAppWithLicense";
import FilterRegionCountry from "./FilterRegionCountry";
import SectionWrapper from "@/shared/components/SectionWrapper";
import MenuDropdownProductBar from "./MenuDropdownProductBar";
import EncryptedSimIcon from "./simicons/EncryptedSimIcon";
import TimSimIcon from "./simicons/TimSimIcon";

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

  // Logic for SIM Provider/Services (Inline)
  type ProviderType = "encriptados" | "tim" | undefined;
  const currentProvider = filters.provider as ProviderType;

  // Helper to capitalize text in Title Case
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const optionByProvider: Record<any, JSX.Element | undefined> = {
    encriptados: (
      <div className="w-full">
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2">Servicios</h1>
        <MenuDropdownProductBar
          name="encriptadosprovider"
          externalValue={filters.encriptadosprovider}
          options={[
            { label: "Todos", value: "all" },
            { label: "Sim Física", value: "physicsim" },
            { label: "eSim", value: "esim" },
            { label: "Recarga Datos", value: "datarecharge" },
            { label: "Recarga Minutos", value: "minuterecharge" },
            { label: "eSIM + Datos", value: "eSimData" },
          ]}
          onChangeExternal={(value) => {
            const normalized = Array.isArray(value)
              ? value[value.length - 1]
              : value;
            updateFilters({ encriptadosprovider: normalized });
          }}
        />
      </div>
    ),
    tim: (
      <div className="w-full">
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2">Servicios</h1>
        <MenuDropdownProductBar
          name="timprovider"
          externalValue={filters.timprovider}
          options={[
            { label: "Todos", value: "all" },
            { label: "Sim Física", value: "physicsimtim" },
            { label: "eSIM + Datos", value: "esimplusdatatim" },
            { label: "Recarga Datos", value: "datarechargetim" },
          ]}
          onChangeExternal={(value) => {
            updateFilters({ timprovider: value });
          }}
        />
      </div>
    ),
  };

  // Rendering logic for subfilters based on Flex to fill space dynamically
  const renderSimFilters = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-row gap-3 w-full items-end">
      {/* 1. Proveedor */}
      <div className="flex-1 w-full min-w-0">
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2">Proveedor</h1>
        <MenuDropdownProductBar
          name="provider"
          externalValue={filters.provider}
          options={[
            {
              label: " ",
              value: "encriptados",
              icon: <EncryptedSimIcon width={115} height={25} />
            },
            {
              label: " ",
              value: "tim",
              icon: <TimSimIcon width={88} height={25} />
            },
          ]}
          onChangeExternal={(value) => {
            updateFilters({
              provider: value,
              encriptadosprovider: "all",
              timprovider: "all",
              timService: undefined
            });
          }}
        />
      </div>

      {/* 2. Servicios */}
      <div className="flex-1 w-full min-w-0">
        {currentProvider && optionByProvider[currentProvider]}
      </div>

      {/* 3. Región */}
      {shouldShowTimRegion && (
        <div className="flex-1 w-full min-w-0">
          <FilterRegionCountry
            filters={filters}
            updateFilters={updateFilters}
            service={activeTimService}
          />
        </div>
      )}
    </div>
  );


  // Variante flotante (barra fija abajo - responsive para mobile/tablet/desktop)
  if (variant === "floating") {
    // ... (Mantener lógica variante flotante sin cambios) ...
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
        <div
          className="fixed inset-0 z-40"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
        <div
          ref={modalRef}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl"
        >
          <div
            className="
              bg-[#161616]
              rounded-2xl
              px-3 sm:px-4 md:px-6
              py-2 sm:py-2.5 md:py-3
              flex items-center 
              justify-center sm:justify-between
              gap-2 sm:gap-3 md:gap-6
              shadow-xl
              shadow-black/60
            "
          >
            <div className="hidden sm:flex items-center gap-2 pr-2 sm:pr-4">
              <MobileMenuSvg width={120} height={35} className="sm:w-[160px] md:w-[180px]" />
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1 md:gap-2 overflow-x-auto scrollbar-hide">
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
    <div
      className={`w-full mx-auto bg-[#161616] rounded-xl px-4 lg:px-8 py-6 ${selectedCat === 36
        ? "max-w-fit"
        : (selectedCat === 38 || selectedCat === 35 || (selectedCat === 40 && !shouldShowTimRegion))
          ? "max-w-4xl"
          : "max-w-screen-xl"
        }`}
    >
      <div
        className="
          flex flex-col gap-4
          xl:flex-row xl:items-end xl:justify-between
        "
      >
        {/* Categoría */}
        <div className={`w-full xl:shrink-0 ${selectedCat === 36 ? "w-auto" : "xl:w-[360px] xl:mr-6"}`}>
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
        <div className="flex-1 w-full">
          {selectedCat === 40 ? (
            renderSimFilters()
          ) : (selectedCat === 38 || selectedCat === 35) ? (
            // Apps / Software - Keeping layout as is or adapting if they need filtering
            <div className="flex flex-wrap sm:flex-nowrap items-end gap-2 w-full">
              <div className="w-full sm:flex-auto min-w-0">
                <FilterAppWithLicense
                  filters={filters}
                  updateFilters={updateFilters}
                  products={products}
                />
              </div>
              {/* Region for Apps? Check original logic */}
              {shouldShowTimRegion && (
                <div className="w-full sm:w-[200px] md:w-[150px] min-w-0 flex-shrink-0">
                  <FilterRegionCountry
                    filters={filters}
                    updateFilters={updateFilters}
                    service={activeTimService}
                  />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div >
  );
}
