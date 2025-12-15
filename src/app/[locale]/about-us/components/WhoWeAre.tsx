"use client";
import React from "react";
import SectionWrapper from "@/shared/components/SectionWrapper";
import { useTranslations } from "next-intl";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";

export default function WhoWeAreDesktop() {
  const t = useTranslations();
  return (
    <SectionWrapper className="py-12 md:py-16 lg:py-20 hidden lg:block">
      <div className="flex flex-col lg:flex-row justify-center items-start gap-6 lg:gap-8 xl:gap-[55px] w-full max-w-[1058px] mx-auto">
        {/* Título */}
        <Typography 
          variant="promo" 
          as="h1" 
          className="text-[#5CDAFF] font-bold text-4xl lg:text-[56px] xl:text-[74px] text-center lg:text-left w-full lg:w-2/5 leading-tight flex-shrink-0"
        >
          {t("AboutUsPage.aboutUs.title")}
        </Typography>

        {/* Descripción */}
        <Paragraph 
          variant="body" 
          className="text-white text-base lg:text-lg xl:text-[22px] text-center lg:text-justify w-full lg:w-3/5 leading-relaxed"
        >
          {t("AboutUsPage.aboutUs.description")}
        </Paragraph>
      </div>
    </SectionWrapper>
  );
}
