// src/app/[locale]/tim-sim/components/WhereUseSimSection.tsx
"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CircleFlag } from "react-circle-flags";
import SectionWrapper from "@/shared/components/SectionWrapper";
import FilterRegionCountryTim from "@/app/[locale]/our-products/components/FilterProductsBar/FilterRegionCountryTim";
import ListOfProducts from "@/app/[locale]/our-products/components/ListOfProducts";

import { ProductFilters } from "@/features/products/types/ProductFilters";

type TimServiceType = "esim_datos" | "recarga_datos" | "sim_fisica";

const TIM_SERVICE_OPTIONS: {
  id: TimServiceType;
  label: string;
  timprovider: string;
  icon: string;
}[] = [
  {
    id: "sim_fisica",
    label: "SIM Física",
    timprovider: "physicsimtim",
    icon: "/images/encrypted-sim/icons/sim_card.png",
  },
  {
    id: "recarga_datos",
    label: "Recargar",
    timprovider: "datarechargetim",
    icon: "/images/encrypted-sim/icons/currency_exchange.png",
  },
  {
    id: "esim_datos",
    label: "eSIM + Datos",
    timprovider: "esimplusdatatim",
    icon: "/images/encrypted-sim/icons/apps.png",
  },
];

const WhereUseSimSection = () => {
  const t = useTranslations("BneSimPage");
  const tProducts = useTranslations("OurProductsPage");

  const [filters, setFilters] = useState<ProductFilters>({
    selectedOption: "40",
    provider: "tim",
    timService: "sim_fisica",
    timprovider: "physicsimtim",
    regionOrCountry: "GLOBAL",
  } as ProductFilters);

  const updateFilters = (partial: Partial<ProductFilters>) =>
    setFilters((prev) => ({ ...prev, ...partial }));

  const activeTimService =
    (filters.timService as TimServiceType) ?? "sim_fisica";

  const isTim = filters.provider === "tim";
  const isTimSimFisica = isTim && activeTimService === "sim_fisica";
  const shouldShowTimRegion = isTim && !isTimSimFisica;

  return (
    <section className="py-10 lg:py-16 bg-[#F4F8FA]">
      <SectionWrapper>
        <div className="flex flex-col items-center text-center mb-8 lg:mb-10">
          <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.3] mb-4 text-[#333333]">
            ¿Dónde vas a usar tu SIM?
          </h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-[720px] text-[#555555]">
            Conéctate a Internet con tu SIM o eSIM en más de 200 países.
            Disfruta de internet seguro y con total anonimato.
          </p>
        </div>

        <div className="w-full bg-white rounded-[24px] md:rounded-[32px] px-3 sm:px-4 md:px-8 py-5 sm:py-6 mb-10 shadow-lg">
          {/* Layout responsive: Móvil (columna) | Tablet (2 filas) | Desktop (1 fila) */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-6">
            
            {/* Categoría */}
            <div className="w-full lg:w-auto lg:flex-1">
              <p className="text-sm font-medium text-[#7E7E7E] mb-3">
                Categoría
              </p>
              <div className="grid grid-cols-3 gap-2">
                {TIM_SERVICE_OPTIONS.map((option) => {
                  const isActive = activeTimService === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        updateFilters({
                          timService: option.id,
                          timprovider: option.timprovider,
                        })
                      }
                      className={`
                        flex flex-col items-center justify-center
                        py-3 sm:py-4 px-1 sm:px-3
                        rounded-xl sm:rounded-[18px]
                        border-2
                        transition-all
                        ${
                          isActive
                            ? "bg-[#E8F4FF] border-[#00A3FF] text-[#00A3FF]"
                            : "bg-[#F5F5F5] border-transparent text-[#7E7E7E] hover:border-[#00A3FF]"
                        }
                      `}
                    >
                      <span className={`relative w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 transition ${isActive ? "filter-none opacity-100" : "opacity-60"}`}>
                        <Image
                          src={option.icon}
                          alt={option.label}
                          fill
                          className="object-contain"
                        />
                      </span>
                      <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Región/País y Buscar (lado a lado en tablet+, apilados en móvil) */}
            <div className="w-full lg:w-auto lg:flex-1 flex flex-col sm:flex-row gap-4">
              
              {/* Región / País */}
              {shouldShowTimRegion && (
                <div className="w-full sm:flex-1">
                  <p className="text-sm font-medium text-[#7E7E7E] mb-3">
                    Región/País
                  </p>
                  <FilterRegionCountryTim
                    filters={filters}
                    updateFilters={updateFilters}
                    service={activeTimService}
                  />
                </div>
              )}

              {/* Buscar */}
              <div className="w-full sm:flex-1 lg:w-auto lg:min-w-[280px]">
                <p className={`text-sm font-medium text-[#7E7E7E] mb-3 ${shouldShowTimRegion ? 'opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto' : ''}`} aria-hidden={shouldShowTimRegion ? "true" : "false"}>
                  Buscar
                </p>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar SIM (ej: SIM Física, eSIM, Recarga...)" 
                    value={filters.searchQuery || ""}
                    className="w-full h-[48px] sm:h-[56px] pl-4 pr-20 bg-[#F5F5F5] border-2 border-transparent rounded-xl sm:rounded-[24px] text-sm sm:text-base focus:outline-none focus:border-[#00A3FF] transition-all"
                    onChange={(e) => updateFilters({ searchQuery: e.target.value })}
                  />
                  {filters.searchQuery && (
                    <button 
                      type="button" 
                      onClick={() => updateFilters({ searchQuery: "" })}
                      className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
                      title="Limpiar búsqueda"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <ListOfProducts filters={filters} />
      </SectionWrapper>
    </section>
  );
};

export default WhereUseSimSection;
