// src/app/[locale]/our-products/components/FilterProductsBar/FilterProductsBar.tsx
"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import ListOfFiltersButton from "./ListOfFiltersButton";
import SimProductsBarIcon from "./icons/SimProductsBarIcon";
import AplicationsProductsBarIcon from "./icons/AplicationsProductsBarIcon";
import PhoneProductsBarIcon from "./icons/PhoneProductsBarIcon";
import RoutersBarIcon from "./icons/RoutersBarIcon";
import FilterAppWithLicense from "./FilterAppWithLicense";
import { PRODUCT_CATEGORY_IDS } from "@/shared/constants/productCategories";
import FilterRegionCountry from "./FilterRegionCountry";
import SectionWrapper from "@/shared/components/SectionWrapper";
import MenuDropdownProductBar from "./MenuDropdownProductBar";

import { ProductFilters } from "@/features/products/types/ProductFilters";
import { Product } from "@/features/products/types/AllProductsResponse";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useAppMobile } from "@/shared/context/AppMobileContext";
import MobileMenuSvg from "@/shared/svgs/EncryptedLogoSvg";
import {
  SIM_SERVICE_OPTION_ORDER,
  TIM_SERVICE_OPTION_ORDER,
} from "@/shared/constants/simServiceOptions";

const ICON_COLOR_SELECTED = "#CCCCCC";
const ICON_COLOR_UNSELECTED = "#7E7E7E";

const FILTER_OPTIONS = [
  { key: "sim", catId: PRODUCT_CATEGORY_IDS.SIMS, Icon: SimProductsBarIcon },
  { key: "app", catId: PRODUCT_CATEGORY_IDS.APPS, Icon: AplicationsProductsBarIcon },
  { key: "mobile", catId: PRODUCT_CATEGORY_IDS.SOFTWARE, Icon: PhoneProductsBarIcon },
  { key: "routers", catId: PRODUCT_CATEGORY_IDS.ROUTERS, Icon: RoutersBarIcon },
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
  const { appMode } = useAppMobile();

  const selectedCat = parseInt(filters.selectedOption, 10);

  const items = FILTER_OPTIONS.map(({ key, catId, Icon }) => ({
    value: String(catId),
    label: t(`filterProducts.categories.${key}`),
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
  type ProviderType = "encriptados" | "tim" | "activarapps" | undefined;
  const currentProvider = filters.provider as ProviderType;

  const providerLogoClass = "h-[25px] w-auto max-w-[144px] object-contain";

  const encriptadosProviderIcon = (
    <Image
      src="/icons/sim_encriptada.svg"
      alt="Encriptados SIM"
      width={137}
      height={34}
      className={providerLogoClass}
      loading="lazy"
    />
  );

  const timProviderIcon = (
    <Image
      src="/icons/sim_tim.svg"
      alt="TIM SIM"
      width={106}
      height={34}
      className={providerLogoClass}
      loading="lazy"
    />
  );

  // Activar Apps oculto del selector de proveedor
  // const activarAppsProviderIcon = ...

  const optionByProvider: Record<any, JSX.Element | undefined> = {
    encriptados: (
      <div className="w-full">
        <span className="text-sm text-[#7E7E7E] font-semibold mb-2 block">{t("filterProducts.servicesTitle")}</span>
        <MenuDropdownProductBar
          name="encriptadosprovider"
          externalValue={filters.encriptadosprovider}
          dropdownClassName="w-[calc(100vw-5rem)] max-w-[calc(100vw-5rem)] right-0 left-auto md:w-full md:max-w-none md:left-0 md:right-auto"
          options={SIM_SERVICE_OPTION_ORDER.map((option) => ({
            label: t(`filterProducts.${option.translationKey}` as any),
            value: option.value,
          }))}
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
        <span className="text-sm text-[#7E7E7E] font-semibold mb-2 block">{t("filterProducts.servicesTitle")}</span>
        <MenuDropdownProductBar
          name="timprovider"
          externalValue={filters.timprovider}
          dropdownClassName="w-[calc(100vw-5rem)] max-w-[calc(100vw-5rem)] right-0 left-auto md:w-full md:max-w-none md:left-0 md:right-auto"
          options={TIM_SERVICE_OPTION_ORDER.map((option) => ({
            label: t(`filterProducts.${option.translationKey}` as any),
            value: option.value,
          }))}
          onChangeExternal={(value) => {
            updateFilters({ timprovider: value });
          }}
        />
      </div>
    ),
    // activarapps: oculto del selector de proveedor
  };

  // Rendering logic for subfilters based on Flex to fill space dynamically
  const renderSimFilters = () => {
    const gridColsSm = shouldShowTimRegion ? "sm:grid-cols-3" : "sm:grid-cols-2";

    return (
      <div className={`grid grid-cols-2 ${gridColsSm} lg:flex lg:flex-row gap-3 w-full items-end`}>
        {/* 1. Proveedor */}
        <div className="flex-1 w-full min-w-0">
          <span className="text-sm text-[#7E7E7E] font-semibold mb-2 block">{t("filterProducts.providerTitle")}</span>
          <MenuDropdownProductBar
            name="provider"
            externalValue={filters.provider}
            dropdownClassName="w-[calc(100vw-5rem)] max-w-[calc(100vw-5rem)] left-0 md:w-full md:max-w-none"
            options={[
              {
                label: " ",
                value: "encriptados",
                icon: encriptadosProviderIcon,
              },
              {
                label: " ",
                value: "tim",
                icon: timProviderIcon,
              },
              // activarapps oculto del selector
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
          <div className="col-span-2 sm:col-span-1 flex-1 w-full min-w-0">
            <FilterRegionCountry
              filters={filters}
              updateFilters={updateFilters}
              service={activeTimService}
            />
          </div>
        )}
      </div>
    );
  };


  // Variante flotante (barra fija abajo - responsive para mobile/tablet/desktop)
  if (variant === "floating") {
    // ... (Mantener lógica variante flotante sin cambios) ...
    const modalRef = useRef<HTMLDivElement>(null);

    const navItems: {
      key: "sims" | "apps" | "systems" | "routers";
      label: string;
      catId?: number;
    }[] = [
        { key: "sims", label: t("filterProducts.floating.sims"), catId: PRODUCT_CATEGORY_IDS.SIMS },
        { key: "apps", label: t("filterProducts.floating.apps"), catId: PRODUCT_CATEGORY_IDS.APPS },
        { key: "systems", label: t("filterProducts.floating.systems"), catId: PRODUCT_CATEGORY_IDS.SOFTWARE },
        { key: "routers", label: t("filterProducts.floating.routers"), catId: PRODUCT_CATEGORY_IDS.ROUTERS },
      ];

    const handleNavClick = (item: (typeof navItems)[number]) => {
      // In user mode (from=user), send native navigation events
      if (appMode === "user") {
        const eventMap: Record<string, string> = {
          sims: "OPEN_SIMS",
          apps: "OPEN_APPS",
          systems: "OPEN_SISTEMAS",
          routers: "OPEN_ROUTERS",
        };
        const action = eventMap[item.key];
        if (action && typeof window !== "undefined" && (window as any).ReactNativeWebView) {
          (window as any).ReactNativeWebView.postMessage(JSON.stringify({ action }));
          return;
        }
      }

      if (item.catId) {
        // Check if we're on the home page or our-products page
        const currentPath = window.location.pathname;
        const isHomePage = currentPath === "/" || currentPath.match(/^\/[a-z]{2}(\/)?$/) || currentPath.includes("/our-products");

        if (isHomePage) {
          // Si estamos en home, actualizar filtros y hacer scroll
          updateFilters({ selectedOption: String(item.catId) });

          const filtersEl = document.getElementById("filters-section");
          if (filtersEl) {
            const rect = filtersEl.getBoundingClientRect();
            const offset = window.scrollY + rect.top - 16;
            window.scrollTo({ top: offset, behavior: "smooth" });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        } else {
          // Si NO estamos en home, redirigir al home con el filtro seleccionado
          const locale = currentPath.match(/^\/([a-z]{2})/)?.[1] || "es";
          window.location.href = `/${locale}/?category=${item.catId}`;
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
          id="floating-nav-menu"
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
      className={`w-full mx-auto bg-[#161616] rounded-xl px-4 lg:px-8 py-6 ${selectedCat === PRODUCT_CATEGORY_IDS.ROUTERS
        ? "max-w-4xl xl:max-w-fit"
        : (selectedCat === PRODUCT_CATEGORY_IDS.APPS || selectedCat === PRODUCT_CATEGORY_IDS.SOFTWARE || (selectedCat === PRODUCT_CATEGORY_IDS.SIMS && !shouldShowTimRegion))
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
        <div className={`w-full xl:shrink-0 ${selectedCat === PRODUCT_CATEGORY_IDS.ROUTERS ? "xl:w-auto" : "xl:w-[360px] xl:mr-6"}`}>
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
          {selectedCat === PRODUCT_CATEGORY_IDS.SIMS ? (
            renderSimFilters()
          ) : (selectedCat === PRODUCT_CATEGORY_IDS.APPS || selectedCat === PRODUCT_CATEGORY_IDS.SOFTWARE) ? (
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
