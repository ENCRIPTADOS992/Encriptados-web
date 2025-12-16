import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";

export default function Component() {
  const t = useTranslations();

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ minHeight: "450px" }}
    >
      {/* Imagen de fondo */}
      <Image
        src="/images/where-to-find-us/backgroundbanner.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={450}
        priority
      />

      {/* Capa de fondo negro semitransparente */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenedor principal */}
      <SectionWrapper className="relative z-10 flex h-full min-h-[300px] flex-col items-center justify-between mx-1 py-8 sm:px-6 lg:flex-row lg:px-8">
        {/* Sección de texto */}
        <div className="flex flex-col text-center lg:text-left mt-10 sm:mt-14">
          <div className="px-2">
            <p className="text-lg leading-relaxed text-white mb-6">
              {t("WhereToFindUs.banner.titleEasyToBuyLicense")}
            </p>
            <h1 className="text-[30px] md:text-[38px] lg:text-[44px] leading-[1.3] font-bold text-white text-center lg:text-left">
              {t("WhereToFindUs.banner.moreThanTitle")} {" "}
              <span className="font-bold text-[#35CDFB] text-[40px] md:text-[48px] lg:text-[54px]">36.732</span>{" "}
              <span className="whitespace-nowrap">{t("WhereToFindUs.banner.pointsOfPay")}</span>
              <br />
              <span className="font-bold text-[#04FFB2] text-[30px] md:text-[38px] lg:text-[44px]">{t("WhereToFindUs.banner.forYou")}</span>
            </h1>
          </div>
        </div>

        {/* Imagen del representante */}
        <div className="mt-8 lg:mt-0 flex justify-center items-center">
          <Image
            src="/images/where-to-find-us/man.png"
            alt="Representative"
            width={400}
            height={400}
            className="h-auto w-auto object-contain max-h-[300px] sm:max-h-[350px] md:max-h-[400px] translate-y-5 sm:translate-y-10"
            priority
          />
        </div>
      </SectionWrapper>
    </div>
  );
}
