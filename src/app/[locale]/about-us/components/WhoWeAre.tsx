"use client";
import React from "react";
import SectionWrapper from "@/shared/components/SectionWrapper";
import { useTranslations } from "next-intl";

export default function WhoWeAreDesktop() {
  const t = useTranslations();
  return (
    <SectionWrapper className="py-20 hidden lg:block">
      <div className="flex flex-row justify-center gap-[55px] w-[1058px] h-[216px] lg:ml-[98px]">
        {/* Título */}
        <h1 className="text-[#5CDAFF] font-bold text-[74px] text-left w-6/14 leading-tight">
          {t("AboutUsPage.aboutUs.title")}
        </h1>

        {/* Descripción */}
        <p className="text-white text-lg xl:text-[22px] text-justify w-6/14">
          {t("AboutUsPage.aboutUs.description")}
        </p>
      </div>
    </SectionWrapper>
  );
}
