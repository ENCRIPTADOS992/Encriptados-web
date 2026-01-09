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
    <section className="relative overflow-hidden w-screen left-1/2 -translate-x-1/2 sm:w-full sm:left-0 sm:translate-x-0 max-w-screen-2xl mx-auto bg-gradient-to-b from-[#0B0B0B] to-[#00242E] rounded-none sm:rounded-2xl md:rounded-3xl py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 text-white">
      
      {/* Wrapper general */}
      <div className="mx-auto flex flex-col items-center justify-center gap-6 sm:gap-8">
        
        {/* Contenedor de columnas */}
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-4 lg:flex-row lg:items-start lg:justify-between w-full">
          
          {/* Columna izquierda */}
          <div className="w-full text-center space-y-3 sm:space-y-4 lg:w-1/2 lg:pl-4 xl:pl-16 lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <EncryptedLogoSvg width={160} height={70} className="sm:w-[180px] sm:h-[80px]" />
            </div>
            
            <Typography 
              variant="h3" 
              as="h2" 
              className="text-lg sm:text-xl md:text-2xl lg:text-[30px] leading-snug"
            >
              {t("title")}
            </Typography>
            
            <div className="w-10 border-b-2 border-[#7EE0FF] mx-auto lg:mx-0"></div>
          </div>

          {/* Columna derecha */}
          <div className="w-full text-center lg:w-1/2 lg:pl-8 xl:pl-20 flex flex-col gap-3 sm:gap-4 lg:text-left">
            {checkItems.map((text, idx) => (
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 text-[#7EE0FF]" key={idx}>
                <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <Typography 
                  variant="body-lg" 
                  className="text-sm sm:text-base md:text-lg font-semibold"
                >
                  {text}
                </Typography>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SecureCommunicationBanner;
