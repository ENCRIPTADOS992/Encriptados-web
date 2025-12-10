"use client";
import React from "react";
import SectionWrapper from "@/shared/components/SectionWrapper";
import { useTranslations } from "next-intl";

export default function WhoWeAreDesktop() {
  const t = useTranslations();
  return (
    <SectionWrapper className="py-20 hidden lg:block">
      <div className="flex flex-row justify-center items-start gap-8 xl:gap-[55px] w-full max-w-[1058px] mx-auto">
        {/* Título */}
        <h1 className="text-[#5CDAFF] font-bold text-[56px] xl:text-[74px] text-left w-2/5 leading-tight flex-shrink-0">
          {t("AboutUsPage.aboutUs.title")}
        </h1>

        {/* Descripción */}
        <p className="text-white text-lg xl:text-[22px] text-justify w-3/5">
          {t("AboutUsPage.aboutUs.description")}
        </p>
      </div>
    </SectionWrapper>
  );
}
