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
  translationKey: string;
  timprovider: string;
  icon: string;
}[] = [
  {
    id: "sim_fisica",
    translationKey: "physicalSim",
    timprovider: "physicsimtim",
    icon: "/images/encrypted-sim/icons/sim_card.png",
  },
  {
    id: "recarga_datos",
    translationKey: "recharge",
    timprovider: "datarechargetim",
    icon: "/images/encrypted-sim/icons/currency_exchange.png",
  },
  {
    id: "esim_datos",
    translationKey: "esimData",
    timprovider: "esimplusdatatim",
    icon: "/images/encrypted-sim/icons/apps.png",
  },
];

interface WhereUseSimSectionProps {
  locale: string;
}

const WhereUseSimSection = ({ locale }: WhereUseSimSectionProps) => {
  const t = useTranslations("BneSimPage.simSelection");
  const tProducts = useTranslations("OurProductsPage");

  const [filters, setFilters] = useState<ProductFilters>({
    selectedOption: "40",
    provider: "tim",
    timService: "sim_fisica",
    timprovider: "physicsimtim",
    regionOrCountry: "GLOBAL",
    regionOrCountryType: "region",
    simRegion: "global",
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
            {t('mainTitle')}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-[720px] text-[#555555]">
            {t('subtitle')}
          </p>
        </div>

        <div className="w-full bg-white rounded-[24px] md:rounded-[32px] px-3 sm:px-4 md:px-8 py-5 sm:py-6 mb-10 shadow-lg">
          {/* Layout responsive con flex-wrap */}
          <div className="flex flex-wrap items-start gap-4 md:gap-6">
            
            {/* Categoría */}
            <div className="w-auto">
              <p className="text-sm font-medium text-[#7E7E7E] mb-3">
                {t('category')}
              </p>
              <div className="flex gap-2 justify-start">
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
                        group
                        flex flex-col items-center justify-center
                        w-[124px] h-[64px]
                        px-6
                        gap-1
                        rounded-lg
                        border
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-white border-[#1E90FF] text-[#1E90FF] shadow-sm"
                            : "bg-[#E8EAED] border-[#E8EAED] text-[#5F6368] hover:bg-white hover:border-[#1E90FF] hover:text-[#1E90FF] hover:shadow-sm"
                        }
                      `}
                    >
                      <span className="relative w-6 h-6">
                        <Image
                          src={option.icon}
                          alt={option.translationKey}
                          fill
                          className={`object-contain transition-all duration-200 ${
                            isActive 
                              ? "[filter:brightness(0)_saturate(100%)_invert(42%)_sepia(99%)_saturate(2479%)_hue-rotate(200deg)_brightness(101%)_contrast(101%)]" 
                              : "[filter:brightness(0)_saturate(0%)_opacity(0.5)] group-hover:[filter:brightness(0)_saturate(100%)_invert(42%)_sepia(99%)_saturate(2479%)_hue-rotate(200deg)_brightness(101%)_contrast(101%)]"
                          }`}
                        />
                      </span>
                      <span className="text-[10px] font-medium text-center leading-tight">
                        {t(option.translationKey as any)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Región/País */}
            {shouldShowTimRegion && (
              <div className="w-auto flex-1 min-w-[200px]">
                <p className="text-sm font-medium text-[#7E7E7E] mb-3">
                  {t('region')}
                </p>
                <FilterRegionCountryTim
                  filters={filters}
                  updateFilters={updateFilters}
                  service={activeTimService}
                />
              </div>
            )}
          </div>
        </div>

        <ListOfProducts filters={filters} />
      </SectionWrapper>
    </section>
  );
};

export default WhereUseSimSection;
