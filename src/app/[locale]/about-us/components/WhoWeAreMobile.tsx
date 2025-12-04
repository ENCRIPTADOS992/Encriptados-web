"use client";
import React from "react";
import SectionWrapper from "@/shared/components/SectionWrapper";
import { useTranslations } from "next-intl";

export default function WhoWeAreMobile() {
  const t = useTranslations();
  return (
    <SectionWrapper className="py-12 block md:hidden">
      <div className="flex flex-col justify-start gap-[14px] w-[380px] ml-[10px]">
        {/* Título */}
        <h1
          className="bg-gradient-to-r from-[#45D4FF] to-[#A8EBFF]
          bg-clip-text text-transparent font-bold text-[24px] leading-[24px]
          w-[182px] text-center self-center"
        >
          {t("AboutUsPage.aboutUs.title")}
        </h1>

        {/* Descripción */}
        <p className="text-white text-[16px] leading-[20px] font-light text-justify w-[380px]">
          {t("AboutUsPage.aboutUs.description")}
        </p>
      </div>
    </SectionWrapper>
  );
}
