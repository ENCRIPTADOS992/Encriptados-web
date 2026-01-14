"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";
import Typography from "@/shared/components/Typography";

export default function AboutUsBannerTablet() {
  const t = useTranslations();
  const Banner = "/images/about-us/phone-hand.webp";

  return (
    <SectionWrapper className="relative z-10 !px-0 py-6 sm:py-8 hidden sm:block lg:hidden">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#001D25] to-[#151515] rounded-3xl sm:rounded-[36px] px-6 sm:px-8 pt-6 sm:pt-8 pb-0 flex flex-col items-center justify-between w-full max-w-[640px] min-h-[480px] sm:min-h-[520px] md:max-w-[704px] md:min-h-[560px] mx-auto">
        {/* Gradiente */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#151515] via-[#151515]/60 to-transparent z-20 rounded-b-3xl sm:rounded-b-[36px]" />

        {/* Contenido */}
        <div className="relative z-30 flex flex-col gap-4 sm:gap-5 w-full max-w-[500px] sm:max-w-[573px] mt-6 sm:mt-8 md:mt-12">
          {/* Badge */}
          <div className="text-[#7EE1FE] border-2 border-[#7EE1FE] rounded-full py-1.5 sm:py-2 px-8 sm:px-10 text-sm w-max mx-auto">
            {t("AboutUsPage.banner.title")}
          </div>

          {/* Título */}
          <Typography 
            variant="h3" 
            as="h1" 
            className="text-white text-2xl sm:text-[28px] md:text-[32px] font-bold text-center leading-snug max-w-[300px] sm:max-w-[380px] md:max-w-[420px] mx-auto"
          >
            {t("AboutUsPage.banner.description")}
          </Typography>
        </div>

        {/* Imagen */}
        <div className="relative z-0 w-full flex justify-center -mx-6 sm:-mx-8">
          <Image
            src={Banner}
            alt="Phone in Hand"
            width={360}
            height={360}
            className="object-contain sm:w-[380px] sm:h-[380px]"
            priority
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
