"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";

export default function AboutUsBannerMobile() {
  const t = useTranslations();
  const Banner = "/images/about-us/phone-hand.png";

  return (
    <SectionWrapper className="relative z-10 py-6 block sm:hidden">
      <div
        className="relative overflow-hidden bg-gradient-to-b from-[#001D25] to-[#151515]
        rounded-2xl p-5 pb-0 flex flex-col items-center justify-between
        w-[calc(100%-32px)] max-w-[450px] min-h-[400px] mx-auto"
        >

        {/* Gradiente de abajo hacia arriba sobre la imagen */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]
          bg-gradient-to-t from-[#151515] via-[#151515]/60 to-transparent z-20 rounded-b-2xl" />

        {/* Contenido */}
        <div className="relative z-30 w-full flex flex-col items-center gap-4 mt-4">
          <div className="text-[#7EE1FE] border border-[#7EE1FE] rounded-full py-1 px-4 text-xs w-max mx-auto">
            {t("AboutUsPage.banner.title")}
          </div>

          <h1 className="text-white text-[20px] font-bold text-center leading-snug max-w-[280px] mx-auto">
            {t("AboutUsPage.banner.description")}
          </h1>
        </div>

        {/* Imagen del teléfono - siempre en el borde inferior */}
        <div className="relative z-0 w-full flex justify-center mt-auto">
          <Image
            src={Banner}
            alt="Phone in Hand"
            width={320}
            height={320}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
