"use client";

import React from "react";
import CheckIcon from "./svgs/CheckIcon";
import EncryptedLogoSvg from "@/shared/svgs/EncryptedLogoSvg";
import Typography from "@/shared/components/Typography";
import { useTranslations } from "next-intl";

const SecureCommunicationBanner = () => {
  const t = useTranslations("OurProductsPage.secureCommunication");

  const checkItems = [
    t("checks.item1"),
    t("checks.item2"),
    t("checks.item3"),
    t("checks.item4"),
  ];

  return (
    <section className="relative overflow-hidden w-screen left-1/2 -translate-x-1/2 sm:w-full sm:left-0 sm:translate-x-0 max-w-screen-2xl mx-auto bg-gradient-to-b from-[#0B0B0B] to-[#00242E] rounded-none sm:rounded-2xl md:rounded-3xl py-10 sm:py-12 md:py-14 px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-20 text-white">
      
      {/* Contenedor de columnas */}
      <div className="mx-auto flex flex-col items-center justify-center gap-8 sm:gap-10 lg:flex-row lg:items-center lg:justify-between w-full">
        
        {/* Columna izquierda */}
        <div className="w-full text-center space-y-4 sm:space-y-5 lg:w-1/2 lg:pl-4 xl:pl-16 lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <EncryptedLogoSvg width={150} height={60} className="sm:w-[170px] sm:h-[68px]" />
          </div>
          
          <Typography 
            variant="h3" 
            as="h2" 
            className="text-xl sm:text-2xl md:text-[28px] lg:text-[30px] leading-snug font-bold"
          >
            {t("title")}
          </Typography>
          
          <div className="w-10 border-b-2 border-[#7EE0FF] mx-auto lg:mx-0"></div>
        </div>

        {/* Columna derecha */}
        <div className="w-full text-center lg:w-1/2 lg:pl-8 xl:pl-20 flex flex-col gap-5 sm:gap-6 lg:text-left">
          {checkItems.map((text, idx) => (
            <div className="flex items-center justify-center lg:justify-start gap-3 text-[#7EE0FF]" key={idx}>
              <CheckIcon className="w-5 h-5 sm:w-[22px] sm:h-[22px] flex-shrink-0" />
              <Typography 
                variant="body-lg" 
                className="text-base sm:text-lg md:text-xl font-bold tracking-wide"
              >
                {text}
              </Typography>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SecureCommunicationBanner;
