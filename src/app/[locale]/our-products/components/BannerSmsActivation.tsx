"use client";

import Image from "next/image";
import React from "react";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import Button from "@/shared/components/Button";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";
import { useTranslations } from "next-intl";

const BannerSmsActivation = () => {
  const { openModal } = useModalPayment();
  const t = useTranslations("OurProductsPage.smsBanner");

  const handleBuyClick = () => {
    openModal({ productid: "503", languageCode: "es" });
  };

  return (
    <section className="relative overflow-hidden w-screen left-1/2 -translate-x-1/2 sm:w-full sm:left-0 sm:translate-x-0 bg-[#0B0B0B] text-white py-6 sm:py-8 md:py-10 rounded-none sm:rounded-2xl md:rounded-3xl">

      {/* Desktop: imagen absoluta a la derecha */}
      <div
        className="hidden md:block absolute inset-y-0 right-12 md:right-16 lg:right-20 w-2/5 overflow-hidden rounded-tr-2xl md:rounded-tr-3xl"
        style={{
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
          maskImage: "linear-gradient(to left, black 0%, black 75%, transparent 100%)",
        }}
      >
        <Image
          src="/images/our-products/Wire 2025-06-18 at 11_48.png"
          alt="Imagen mujer globe"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Texto */}
        <div className="flex-1 space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-left max-w-lg md:max-w-none">
          <Typography 
            variant="h3" 
            as="h2" 
            className="text-xl sm:text-2xl md:text-[30px] leading-snug"
          >
            {t("title")}
          </Typography>
          
          <Paragraph 
            variant="body" 
            color="secondary" 
            className="text-sm sm:text-base text-[#9CA3AF]"
          >
            {t("subtitle")}
          </Paragraph>
          
          <Paragraph 
            variant="small" 
            className="text-xs italic text-[#9CA3AF] flex items-center gap-2 justify-center md:justify-start"
          >
            <Image
              src="/images/our-products/emojione_flag-for-colombia.png"
              alt="Bandera de Colombia"
              width={18}
              height={13}
              className="sm:w-5 sm:h-[14px]"
              priority
            />
            <span>{t("note")}</span>
          </Paragraph>
          
          {/* Botón CTA */}
          <div className="flex justify-center md:justify-start w-full md:w-auto pt-2">
            <Button
              intent="primary"
              size="md"
              rounded="lg"
              onClick={handleBuyClick}
              className="!bg-[#00CCFF] !text-black hover:!bg-[#00B8E6] px-6 sm:px-8 w-fit"
            >
              {t("button")}
            </Button>
          </div>
        </div>
        
        {/* Spacer para desktop */}
        <div className="flex-1 hidden lg:block" />
      </div>

      {/* Móvil: imagen debajo del texto */}
      <div className="block md:hidden relative w-full h-64 sm:h-80 overflow-hidden mt-4">
        <div className="absolute inset-x-0 bottom-0 h-full">
          <Image
            src="/images/our-products/Wire 2025-06-18 at 11_48.png"
            alt="Imagen mujer globe"
            layout="fill"
            objectFit="contain"
            objectPosition="bottom"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default BannerSmsActivation;
