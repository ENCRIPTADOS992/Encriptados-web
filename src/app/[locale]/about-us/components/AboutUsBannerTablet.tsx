"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";

export default function AboutUsBannerTablet() {
  const t = useTranslations();
  const Banner = "/images/about-us/phone-hand.png";

  return (
    <SectionWrapper className="relative z-10 py-8 hidden sm:block lg:hidden">
      <div
        className="relative overflow-hidden bg-gradient-to-b from-[#001D25] to-[#151515]
        rounded-[36px] p-8 pb-0 flex flex-col items-center justify-between
        w-[640px] min-h-[520px] md:w-[704px] md:min-h-[560px] mx-auto"
      >
        {/* Gradiente de abajo hacia arriba sobre la imagen */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#151515] via-[#151515]/60 to-transparent z-20 rounded-b-[36px]" />

        {/* Contenido */}
        <div className="relative z-30 flex flex-col gap-5 w-full max-w-[573px] mt-8 md:mt-12">
          <div className="text-[#7EE1FE] border-2 border-[#7EE1FE] rounded-full py-2 px-10 text-sm w-max mx-auto">
            {t("AboutUsPage.banner.title")}
          </div>

          <h1 className="text-white text-[20px] font-bold text-center leading-snug max-w-[320px] md:max-w-[420px] mx-auto">
            {t("AboutUsPage.banner.description")}
          </h1>
        </div>

        {/* Imagen del teléfono - siempre en el borde inferior */}
        <div className="relative z-0 w-full flex justify-center mt-auto">
          <Image
            src={Banner}
            alt="Phone in Hand"
            width={380}
            height={380}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
