"use client";

import Image from "next/image";
import React from "react";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import Button from "@/shared/components/Button";
import { useTranslations } from "next-intl";

const BannerSmsActivation = () => {
  const { openModal } = useModalPayment();

  const handleBuyClick = () => {
    openModal({ productid: "503", languageCode: "es" });
  };

  return (
    <section className="relative w-full bg-[#0B0B0B] text-white py-6 px-4 lg:px-20 rounded-3xl overflow-hidden">
      
      <div className="absolute inset-y-0 right-10 w-2/5"> 
        <Image
          src="/images/our-products/Wire 2025-06-18 at 11_48.png"
          alt="Imagen mujer globe"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </div>

      {/* CONTENIDO RELATIVO ENCIMA */}
      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        {/* Texto */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold leading-snug">
            Activa APPs por SMS  
            <br className="hidden sm:inline" />  
            con Encriptados
          </h2>
          <p className="text-[#9CA3AF] text-sm">
            Regístrate en cualquier aplicación  
            <br className="hidden sm:inline" />  
            con un número de teléfono virtual
          </p>
          <p className="text-[#9CA3AF] italic text-xs flex items-center gap-2">
            <Image
              src="/images/our-products/emojione_flag-for-colombia.png"
              alt="Bandera de Colombia"
              width={20}
              height={14}
              priority
            />
            <span>*Se genera un número colombiano</span>
          </p>
          <Button
            size="medium"
            rounded="lg"
            customStyles="
              !bg-[#00CCFF]
              !text-black
              !rounded-lg
              text-sm px-8 py-3 w-fit
            "
            onClick={handleBuyClick}
          >
            Comprar ahora
          </Button>
        </div>
        {/* (dejamos flex-1 vacío para mantener gap y centrar) */}
        <div className="flex-1" />
      </div>
    </section>
  );
};

export default BannerSmsActivation;
