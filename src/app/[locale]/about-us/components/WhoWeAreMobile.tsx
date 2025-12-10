"use client";
import React from "react";
import SectionWrapper from "@/shared/components/SectionWrapper";
import { useTranslations } from "next-intl";

export default function WhoWeAreMobile() {
  const t = useTranslations();
  return (
    <SectionWrapper className="py-12 block sm:hidden">
      <div className="flex flex-col justify-start gap-4 w-full px-4">
        {/* Título */}
        <h1
          className="text-[#5CDAFF] font-bold text-[24px] leading-[28px]
          text-center self-center"
        >
          {t("AboutUsPage.aboutUs.title")}
        </h1>

        {/* Descripción */}
        <p className="text-white text-[14px] xs:text-[16px] leading-[22px] font-light text-justify w-full">
          {t("AboutUsPage.aboutUs.description")}
        </p>
      </div>
    </SectionWrapper>
  );
}
