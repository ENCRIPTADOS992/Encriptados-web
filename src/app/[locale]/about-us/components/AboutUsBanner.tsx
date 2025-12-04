"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";

export default function AboutUsBannerDesktop() {
  const t = useTranslations();
  const Banner = "/images/about-us/phone-hand.png";

  return (
    <SectionWrapper className="relative z-10 py-10 hidden lg:block">
     <div className="bg-gradient-to-b from-[#001D25] to-[#151515]
  rounded-[44px] p-10 flex flex-col items-center justify-center space-y-6
  lg:w-[1372px] lg:h-[871px]
  lg:ml-0 lg:-translate-x-[110px]">

<div className="pointer-events-none absolute inset-0
    bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.7)_100%)] z-10" />

  {/* Fades laterales */}
  <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/40 to-transparent z-10" />
  <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/40 to-transparent z-10" />

  {/* NUEVO: gradiente de abajo hacia arriba sobre la imagen */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2
    bg-gradient-to-t from-[#151515] via-[#151515]/70 to-[#001D25]/0 z-20" />

  {/* Contenido */}
  <div className="flex flex-col gap-6 w-[573px] min-h-[170px] lg:mt-[210px] lg:ml-[433px] lg:-translate-x-[210px]">
    <div className="relative z-30 text-[#7EE1FE] text-center border-2 border-[#7EE1FE] w-[200px] min-h-[40px] rounded-full py-1 px-6 lg:-translate-x-[-180px]">
      {t("AboutUsPage.banner.title")}
    </div>

    <h1 className="relative z-30 text-white text-[44px]  font-bold text-center leading-tight">
      {t("AboutUsPage.banner.description")}
    </h1>
  </div>


  <Image
    src={Banner}
    alt="Phone in Hand"
    width={520}
    height={520}
    className="relative z-0 object-contain translate-y-2"
    priority
  />
</div>
    </SectionWrapper>
  );
}
