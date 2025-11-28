// src/app/[locale]/tim-sim/components/WhereUseSimSection.tsx
"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

import SectionWrapper from "@/shared/components/SectionWrapper";

import FilterRegionCountry from "@/app/[locale]/our-products/components/FilterProductsBar/FilterRegionCountry";
import SearchProduct from "@/app/[locale]/our-products/components/FilterProductsBar/SearchProduct";
import ListOfProducts from "@/app/[locale]/our-products/components/ListOfProducts";

import { ProductFilters } from "@/features/products/types/ProductFilters";

type TimServiceType = "esim_datos" | "recarga_datos" | "sim_fisica";

const TIM_SERVICE_OPTIONS: {
  id: TimServiceType;
  label: string;
  timprovider: string;
}[] = [
  {
    id: "sim_fisica",
    label: "SIM Física",
    timprovider: "physicsimtim",
  },
  {
    id: "recarga_datos",
    label: "Recargar",
    timprovider: "datarechargetim",
  },
  {
    id: "esim_datos",
    label: "eSIM + Datos",
    timprovider: "esimplusdatatim",
  },
];

const WhereUseSimSection = () => {
  const t = useTranslations("BneSimPage");
  const tProducts = useTranslations("OurProductsPage");

  const [filters, setFilters] = useState<ProductFilters>({
    selectedOption: "40", // categoría SIM
    provider: "tim", // solo TIM
    timService: "sim_fisica",
    timprovider: "physicsimtim",
    regionOrCountry: "GLOBAL",
  } as ProductFilters);

  const updateFilters = (partial: Partial<ProductFilters>) =>
    setFilters((prev) => ({ ...prev, ...partial }));

  const activeTimService = (filters.timService as TimServiceType) ?? "sim_fisica";

  const isTim = filters.provider === "tim";
  const isTimSimFisica = isTim && activeTimService === "sim_fisica";
  const shouldShowTimRegion = isTim && !isTimSimFisica;

  return (
    <section className="py-10 lg:py-16 bg-[#F4F8FA]">
      <SectionWrapper>
        {/* Título + descripción */}
        <div className="flex flex-col items-center text-center mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            ¿Donde vas a usar tu SIM?
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-[720px] text-[#4B5563]">
            Conéctate a Internet con tu SIM o eSIM en más de 200 países.
            Disfruta de internet seguro y con total anonimato.
          </p>
        </div>

        {/* Barra de filtros */}
        <div className="w-full bg-white rounded-[24px] md:rounded-[32px] px-4 md:px-8 py-4 md:py-5 mb-10 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            {/* Categoría TIM: SIM Física / Recargar / eSIM + Datos */}
            <div className="w-full lg:w-[420px]">
              <p className="text-xs text-[#6B7280] font-semibold mb-2">
                Categoría
              </p>

              <div
                className="
                  inline-flex
                  bg-[#F3F4F6]
                  rounded-[18px]
                  p-1
                  gap-1
                "
              >
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
                          // opcional: reset región cuando cambias de servicio
                          // regionOrCountry: "GLOBAL",
                        })
                      }
                      className={`
                        px-4 py-2 rounded-[14px]
                        text-sm font-semibold
                        min-w-[110px]
                        border
                        transition
                        ${
                          isActive
                            ? "bg-white border-[#19BBFF] text-[#19BBFF] shadow-sm"
                            : "bg-[#F3F4F6] border-transparent text-[#6B7280] hover:bg-white"
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Región + buscador */}
            <div className="flex flex-col flex-1 gap-3 lg:flex-row lg:items-end">
              {shouldShowTimRegion && (
                <div className="w-full lg:w-[260px]">
                  <p className="text-xs text-[#6B7280] font-semibold mb-2">
                    Región/País
                  </p>
                  <FilterRegionCountry
                    filters={filters}
                    updateFilters={updateFilters}
                    service={activeTimService}
                  />
                </div>
              )}

              <div className="w-full lg:w-[260px]">
                <p className="text-xs text-[#6B7280] font-semibold mb-2">
                  Buscar
                </p>
                <SearchProduct
                  name="searchTimSim"
                  placeholder={tProducts("filterProducts.searchPlaceholder")}
                  containerClassName="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Productos TIM usando todos los filtros anteriores */}
        <ListOfProducts filters={filters} />
      </SectionWrapper>
    </section>
  );
};

export default WhereUseSimSection;
