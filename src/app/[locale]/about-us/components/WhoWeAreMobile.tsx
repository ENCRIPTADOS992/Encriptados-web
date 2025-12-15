"use client";
import React from "react";
import SectionWrapper from "@/shared/components/SectionWrapper";
import { useTranslations } from "next-intl";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";

export default function WhoWeAreMobile() {
  const t = useTranslations();
  return (
    <SectionWrapper className="py-8 xs:py-10 sm:py-12 block sm:hidden">
      <div className="flex flex-col justify-start gap-4 xs:gap-5 w-full px-4 xs:px-6">
        {/* Título */}
        <Typography 
          variant="h3" 
          as="h1" 
          className="text-[#5CDAFF] font-bold text-2xl xs:text-[28px] leading-tight text-center self-center"
        >
          {t("AboutUsPage.aboutUs.title")}
        </Typography>

        {/* Descripción */}
        <Paragraph 
          variant="body" 
          className="text-white text-sm xs:text-base leading-relaxed font-light text-justify w-full"
        >
          {t("AboutUsPage.aboutUs.description")}
        </Paragraph>
      </div>
    </SectionWrapper>
  );
}
