"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";
import Typography from "@/shared/components/Typography";

export default function AboutUsBannerDesktop() {
  const t = useTranslations();
  const Banner = "/images/about-us/phone-hand.webp";

  return (
    <SectionWrapper className="relative z-10 !px-0 py-6 md:py-8 lg:py-10 hidden lg:block">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#001D25] to-[#151515] rounded-3xl lg:rounded-[44px] px-8 lg:px-10 pt-8 lg:pt-10 pb-0 flex flex-col items-center justify-between w-full max-w-[1372px] min-h-[600px] lg:min-h-[700px] xl:min-h-[871px] mx-auto">

        {/* Gradiente de abajo hacia arriba sobre la imagen */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#151515] via-[#151515]/70 to-transparent z-20 rounded-b-3xl lg:rounded-b-[44px]" />

        {/* Contenido */}
        <div className="flex flex-col items-center gap-4 lg:gap-6 w-full max-w-[500px] lg:max-w-[573px] mt-16 lg:mt-[80px] xl:mt-[120px]">
          {/* Badge */}
          <div className="relative z-30 text-[#7EE1FE] text-center border-2 border-[#7EE1FE] w-[180px] lg:w-[200px] min-h-[36px] lg:min-h-[40px] rounded-full py-1 px-4 lg:px-6 text-sm lg:text-base">
            {t("AboutUsPage.banner.title")}
          </div>

          {/* Título Hero */}
          <Typography 
            variant="h1" 
            as="h1" 
            className="relative z-30 text-white text-3xl lg:text-[36px] xl:text-[44px] font-bold text-center leading-tight"
          >
            {t("AboutUsPage.banner.description")}
          </Typography>
        </div>

        {/* Imagen del teléfono */}
        <div className="relative z-0 w-full flex justify-center -mx-8 lg:-mx-10">
          <Image
            src={Banner}
            alt="Phone in Hand"
            width={480}
            height={480}
            className="object-contain lg:w-[520px] lg:h-[520px]"
            priority
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
