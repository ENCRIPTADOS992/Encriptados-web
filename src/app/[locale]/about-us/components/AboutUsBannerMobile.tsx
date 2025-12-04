"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";

export default function AboutUsBannerMobile() {
  const t = useTranslations();
  const Banner = "/images/about-us/phone-hand.png";

  return (
    <SectionWrapper className="relative z-10 py-6 block md:hidden">
      <div
        className="relative overflow-hidden bg-gradient-to-b from-[#001D25] to-[#151515]
        rounded-2xl p-5 flex flex-col items-center justify-center space-y-4
        w-[99%] w-[450px] ml-8 -translate-x-[30px]"
        >

        {/* Vignette general */}
        <div className="pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_42%,rgba(0,0,0,0.6)_100%)] z-10" />
        {/* Fades laterales suaves */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/25 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/25 to-transparent z-10" />
        {/* Gradiente de abajo hacia arriba sobre la imagen */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]
          bg-gradient-to-t from-[#151515] via-[#151515]/60 to-transparent z-20" />

        {/* Contenido */}
        <div className="relative z-30 w-full flex flex-col items-center gap-4">
          <div className="text-[#7EE1FE] border border-[#7EE1FE] rounded-full py-1 px-4 text-xs w-max mx-auto">
            {t("AboutUsPage.banner.title")}
          </div>

          <h1 className="text-white text-[20px] font-bold text-center leading-snug max-w-[280px] mx-auto">
            {t("AboutUsPage.banner.description")}
          </h1>
        </div>

        <Image
          src={Banner}
          alt="Phone in Hand"
          width={320}
          height={320}
          className="relative z-0 object-contain translate-y-1"
          priority
        />
      </div>
    </SectionWrapper>
  );
}
