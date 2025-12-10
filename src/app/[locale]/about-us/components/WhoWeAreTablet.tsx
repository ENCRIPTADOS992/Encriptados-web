"use client";
import React from "react";
import SectionWrapper from "@/shared/components/SectionWrapper";
import { useTranslations } from "next-intl";

export default function WhoWeAreTablet() {
  const t = useTranslations();
  return (
    <SectionWrapper className="py-20 hidden sm:block lg:hidden">
      <div
        className="flex flex-row items-start justify-start
        w-[712px] h-[171px] px-[44px] gap-[65px] ml-[16px]"
      >
        {/* Título */}
        <h1
          className="text-[#5CDAFF] font-bold text-[44px]
          leading-[44px] w-[185px] text-left"
        >
          {t("AboutUsPage.aboutUs.title")}
        </h1>

        {/* Descripción */}
        <p
          className="text-white text-[16px] font-light leading-[16px]
          text-justify w-[374px]"
        >
          {t("AboutUsPage.aboutUs.description")}
        </p>
      </div>
    </SectionWrapper>
  );
}
