"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";
import Button from "@/shared/components/Button";
import { MdShoppingBag } from "react-icons/md";

const BannerOurProductsMobile = () => {
  const t = useTranslations("OurProductsPage");
  const { setValue } = useFormContext();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden bg-black text-white">
      {/* Fondo de puntos */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/our-products/2f4c437915945215a21a8478b499fc508f3a35a2.png"
          alt="Dot background"
          fill
          objectFit="cover"
          className="opacity-20"
        />
      </div>

      {/* Imagen de la persona */}
      <div className="relative z-10 w-full h-64 xs:h-72 sm:h-80 mb-[-40px] xs:mb-[-50px]">
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

      {/* Texto + Botón */}
      <div className="relative z-20 flex flex-col items-center px-4 xs:px-6 pt-4 xs:pt-6 pb-6 xs:pb-8 space-y-3 xs:space-y-4">
        {/* Badge */}
        <div className="inline-block border border-[#7EE0FF] text-[#0AB4E9] px-3 xs:px-4 py-1 rounded-full text-xs xs:text-sm font-semibold">
          {t("banner.securityFromStartToEnd")}
        </div>
        
        {/* Título */}
        <Typography 
          variant="h2" 
          as="h1" 
          className="text-2xl xs:text-3xl text-center leading-tight xs:leading-snug"
        >
          <span className="text-[#0AB4E9]">{t("banner.titleNewConnectWith")}</span>{" "}
          <span className="text-white">{t("banner.titleNewTotalSecurity")}</span>{" "}
          <span className="text-[#0AB4E9]">{t("banner.titleNewInComunication")}</span>
        </Typography>
        
        {/* Descripción */}
        <Paragraph 
          variant="body" 
          color="secondary" 
          className="text-sm xs:text-base text-center max-w-xs xs:max-w-sm"
        >
          {t("banner.descriptionNew")}
        </Paragraph>
        
        {/* Botón CTA */}
        <div className="pt-2">
          <Button
            intent="light"
            size="md"
            icon={<MdShoppingBag size={20} />}
            iconPosition="left"
            onClick={() => {
              scrollToSection("buysimappsection");
              setValue("selectedOption", "sim");
            }}
            className="text-[#00485E] hover:bg-[#00b0dd] hover:text-white"
          >
            {t("banner.goToStore")}
          </Button>
        </div>
      </div>
    </section>
  );
};


export default BannerOurProductsMobile;
