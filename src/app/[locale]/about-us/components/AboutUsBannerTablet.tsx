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
        rounded-[36px] p-8 flex flex-col items-center justify-center space-y-5
        w-[640px] h-[520px] md:w-[704px] md:h-[560px] mx-auto"
      >
        {/* Vignette general */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.6)_100%)] z-10" />
        {/* Fades laterales */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/30 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/30 to-transparent z-10" />
        {/* Gradiente de abajo hacia arriba sobre la imagen */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#151515] via-[#151515]/60 to-[#001D25]/0 z-20" />

        {/* Contenido */}
        <div className="relative z-30 flex flex-col gap-5 w-[573px] min-h-[115px] md:mt-[140px]">
          <div className="text-[#7EE1FE] border-2 border-[#7EE1FE] rounded-full py-2 px-10 text-sm w-max mx-auto mt-10">
            {t("AboutUsPage.banner.title")}
          </div>

          <h1 className="text-white text-[20px] font-bold text-center leading-snug max-w-[320px] md:max-w-[420px] mx-auto">
  {t("AboutUsPage.banner.description")}
</h1>

        </div>

        <Image
          src={Banner}
          alt="Phone in Hand"
          width={380}
          height={380}
          className="relative z-0 object-contain translate-y-2"
          priority
        />
      </div>
    </SectionWrapper>
  );
}
