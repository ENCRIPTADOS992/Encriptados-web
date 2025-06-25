"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";
import LocalMallSvgNew from "./svgs/LocalMallSvgNew";

const BannerOurProductsMobile = () => {
  const t = useTranslations("OurProductsPage");
  const { setValue } = useFormContext();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden bg-black text-white">
      {/* 1️⃣ FONDO DE PUNTOS (100%) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/our-products/2f4c437915945215a21a8478b499fc508f3a35a2.png"
          alt="Dot background"
          fill
          objectFit="cover"
          className="opacity-20"
        />
      </div>

      {/* 2️⃣ IMAGEN DE LA PERSONA */}
      <div className="relative z-10 w-full h-80 mb-[-50px]">
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
        <div className="inline-block border border-[#7EE0FF] text-[#0AB4E9] px-4 py-1 rounded-full text-2x1 font-semibold">
          {t("banner.securityFromStartToEnd")}
        </div>
        <h1 className="text-3xl font-extrabold text-center leading-snug">
          <span className="text-[#0AB4E9]">{t("banner.titleNewConnectWith")}</span>{" "}
          <span className="text-white">{t("banner.titleNewTotalSecurity")}</span>{" "}
          <span className="text-[#0AB4E9]">{t("banner.titleNewInComunication")}</span>
        </h1>
        <p className="text-xl text-center text-gray-300 max-w-xs">
          {t("banner.descriptionNew")}
        </p>
        <button
          onClick={() => {
            scrollToSection("#buysimappsection");
            setValue("selectedOption", "sim");
          }}
          className="mt-2 bg-white text-[#00485E] font-semibold px-6 py-3 rounded-full hover:bg-[#00b0dd] transition-colors flex items-center gap-2"
        >
          {/* El SVG usará fill-current para pintar con currentColor */}
          <LocalMallSvgNew className="w-5 h-5 fill-current" />
          <span>{t("banner.goToStore")}</span>
        </button>
      </div>
    </section>
  );
};


export default BannerOurProductsMobile;
