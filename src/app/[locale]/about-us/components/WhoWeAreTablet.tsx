"use client";
import React from "react";
import SectionWrapper from "@/shared/components/SectionWrapper";
import { useTranslations } from "next-intl";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";

export default function WhoWeAreTablet() {
  const t = useTranslations();
  return (
    <SectionWrapper className="py-12 sm:py-16 md:py-20 hidden sm:block lg:hidden">
      <div className="flex flex-col sm:flex-row items-start justify-center gap-6 sm:gap-10 md:gap-[65px] w-full max-w-[90%] sm:max-w-[712px] mx-auto px-4 sm:px-8 md:px-[44px]">
        {/* Título */}
        <Typography 
          variant="h1" 
          as="h1" 
          className="text-[#5CDAFF] font-bold text-3xl sm:text-[38px] md:text-[44px] leading-tight text-center sm:text-left w-full sm:w-auto sm:min-w-[185px] flex-shrink-0"
        >
          {t("AboutUsPage.aboutUs.title")}
        </Typography>

        {/* Descripción */}
        <Paragraph 
          variant="body" 
          className="text-white text-base sm:text-lg font-light leading-relaxed text-justify w-full sm:flex-1 sm:max-w-[374px]"
        >
          {t("AboutUsPage.aboutUs.description")}
        </Paragraph>
      </div>
    </SectionWrapper>
  );
}
