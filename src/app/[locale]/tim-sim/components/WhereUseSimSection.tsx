// src/app/[locale]/tim-sim/components/WhereUseSimSection.tsx
"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CircleFlag } from "react-circle-flags";
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            ¿Donde vas a usar tu SIM?
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-[720px] text-[#4B5563]">
            Conéctate a Internet con tu SIM o eSIM en más de 200 países.
            Disfruta de internet seguro y con total anonimato.
          </p>
        </div>

        <div className="w-full bg-white rounded-[24px] md:rounded-[32px] px-4 md:px-8 py-5 mb-10 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            {/* IZQUIERDA: Categoría + Región/País (grupo 563px) */}
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-[54px] lg:w-[623px]">
              {/* Categoría */}
              <div className="w-full lg:w-[379px]">
                <p className="text-[14px] font-medium text-[#7E7E7E] leading-[17px] mb-3">
                  Categoría
                </p>

                <div className="inline-flex rounded-[18px] gap-1">
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
                  flex flex-col items-center justify-center text-center
                  min-w-[127px] h-[64px]
                  rounded-[12px]
                  px-6
                  text-[12px] font-semibold
                  border-2
                  transition
                  ${
                    isActive
                      ? "bg-[#F0F9FF] border-[#009DFF] text-[#009DFF] shadow-sm"
                      : "bg-[#D0D0D0] border-[#D0D0D0] text-[#374151] hover:bg-[#F0F9FF] hover:border-[#009DFF] hover:text-[#009DFF]"
                  }
                `}
                      >
                        <span
                          className={`
    relative w-6 h-6 mb-1
    transition
    ${isActive ? "filter-none opacity-100" : "grayscale opacity-60"}
  `}
                        >
                          <Image
                            src={option.icon}
                            alt={option.label}
                            fill
                            className="object-contain"
                          />
                        </span>

                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Región / País */}
              {shouldShowTimRegion && (
                <div className="w-full lg:w-[190px]">
                  <p className="text-[14px] font-medium text-[#7E7E7E] leading-[17px] mb-3">
                    Región/País
                  </p>

                  <FilterRegionCountry
                    filters={filters}
                    updateFilters={updateFilters}
                    service={activeTimService}
                    variant="tim" // 👈 activamos el modo nuevo
                  />
                </div>
              )}
            </div>

            {/* DERECHA: Buscador fuera del grupo de botones */}
            <div className="w-full lg:flex-1 flex justify-start lg:justify-end">
              <div className="ml-auto w-[286px]">
                <div
                  className="
        flex items-center justify-between
        w-full h-[64px]
        rounded-[50px]
        bg-[#EDEDED]
        px-6
      "
                >
                  <SearchProduct
                    name="searchTimSim"
                    placeholder={tProducts("filterProducts.searchPlaceholder")}
                    containerClassName="w-full"
                    inputClassName="
    !bg-[#EDEDED]
    !text-[#171717]
    placeholder:!text-black
    shadow-none
    !pl-2
  "
                  />
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
