"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";

const BannerOurProductsMobile = () => {
  const t = useTranslations("OurProductsPage");
  const { setValue } = useFormContext();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden bg-black text-white">
      {/* 1️⃣ FONDO DE PUNTOS */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/our-products/2f4c437915945215a21a8478b499fc508f3a35a2.png"
          alt="Dot background"
          fill
          objectFit="cover"
          className="opacity-20"
        />
      </div>

      {/* 2️⃣ IMAGEN DE LA PERSONA - SOLO 10% VISIBLE POR DETRÁS */}
      <div className="absolute inset-x-0 top-[10%] h-[80%] z-10 pointer-events-none">
        <Image
          src="/images/our-products/070e8ce9e05a772be2fda80c02b3733778db1afd.png"
          alt="Persona hablando"
          fill
          objectFit="contain"
          objectPosition="top"
          priority
          style={{ filter: "saturate(1.2)" }}
        />
      </div>

      {/* 3️⃣ TEXTO + BOTÓN */}
      <div className="relative z-20 flex flex-col items-center px-4 pt-6 pb-8 space-y-4">
        <div className="inline-block border border-[#7EE0FF] text-[#0AB4E9] px-4 py-1 rounded-full text-xs">
          {t("banner.securityFromStartToEnd")}
        </div>
        <h1 className="text-2xl font-extrabold text-center leading-snug">
          <span className="text-[#0AB4E9]">{t("banner.titleNewConnectWith")}</span>{" "}
          <span className="text-white">{t("banner.titleNewTotalSecurity")}</span>{" "}
          <span className="text-[#0AB4E9]">{t("banner.titleNewInComunication")}</span>
        </h1>
        <p className="text-sm text-center text-gray-300 max-w-xs">
          {t("banner.descriptionNew")}
        </p>
        <button
          onClick={() => {
            scrollToSection("#buysimappsection");
            setValue("selectedOption", "sim");
          }}
          className="mt-2 bg-[#00CCFF] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#00b0dd] transition-colors"
        >
          {t("banner.goToStore")}
        </button>
      </div>
    </section>
  );
};

export default BannerOurProductsMobile;
