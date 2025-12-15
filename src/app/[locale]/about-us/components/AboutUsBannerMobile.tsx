"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";
import Typography from "@/shared/components/Typography";

export default function AboutUsBannerMobile() {
  const t = useTranslations();
  const Banner = "/images/about-us/phone-hand.png";

  return (
    <SectionWrapper className="relative z-10 !px-0 py-4 xs:py-6 block sm:hidden">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#001D25] to-[#151515] rounded-xl xs:rounded-2xl px-4 xs:px-5 pt-4 xs:pt-5 pb-0 flex flex-col items-center justify-between w-[calc(100%-24px)] xs:w-[calc(100%-32px)] max-w-[450px] min-h-[380px] xs:min-h-[400px] mx-auto">

        {/* Gradiente */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#151515] via-[#151515]/60 to-transparent z-20 rounded-b-xl xs:rounded-b-2xl" />

        {/* Contenido */}
        <div className="relative z-30 w-full flex flex-col items-center gap-3 xs:gap-4 mt-3 xs:mt-4">
          {/* Badge */}
          <div className="text-[#7EE1FE] border border-[#7EE1FE] rounded-full py-1 px-3 xs:px-4 text-xs w-max mx-auto">
            {t("AboutUsPage.banner.title")}
          </div>

          {/* Título */}
          <Typography 
            variant="h4" 
            as="h1" 
            className="text-white text-lg xs:text-xl font-bold text-center leading-snug max-w-[260px] xs:max-w-[280px] mx-auto"
          >
            {t("AboutUsPage.banner.description")}
          </Typography>
        </div>

        {/* Imagen */}
        <div className="relative z-0 w-full flex justify-center -mx-4 xs:-mx-5">
          <Image
            src={Banner}
            alt="Phone in Hand"
            width={300}
            height={300}
            className="object-contain xs:w-[320px] xs:h-[320px]"
            priority
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
