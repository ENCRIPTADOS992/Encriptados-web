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
     <div className="relative overflow-hidden bg-gradient-to-b from-[#001D25] to-[#151515]
  rounded-[44px] p-10 pb-0 flex flex-col items-center justify-between
  w-full max-w-[1372px] min-h-[700px] xl:min-h-[871px] mx-auto">

  {/* Gradiente de abajo hacia arriba sobre la imagen */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2
    bg-gradient-to-t from-[#151515] via-[#151515]/70 to-transparent z-20 rounded-b-[44px]" />

  {/* Contenido */}
  <div className="flex flex-col items-center gap-6 w-full max-w-[573px] mt-[80px] xl:mt-[120px]">
    <div className="relative z-30 text-[#7EE1FE] text-center border-2 border-[#7EE1FE] w-[200px] min-h-[40px] rounded-full py-1 px-6">
      {t("AboutUsPage.banner.title")}
    </div>

    <h1 className="relative z-30 text-white text-[36px] xl:text-[44px] font-bold text-center leading-tight">
      {t("AboutUsPage.banner.description")}
    </h1>
  </div>

  {/* Imagen del teléfono - siempre en el borde inferior */}
  <div className="relative z-0 w-full flex justify-center mt-auto">
    <Image
      src={Banner}
      alt="Phone in Hand"
      width={520}
      height={520}
      className="object-contain"
      priority
    />
  </div>
</div>
    </SectionWrapper>
  );
}
