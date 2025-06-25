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
    <section className="relative overflow-hidden w-screen left-1/2 -translate-x-1/2 sm:w-full sm:left-0 sm:translate-x-0 bg-[#0B0B0B] text-white py-6 rounded-none sm:rounded-3xl">

      {/* Desktop: imagen absoluta a la derecha */}
      <div
        className="hidden lg:block absolute inset-y-0 right-20 w-2/5 overflow-hidden rounded-tr-3xl "
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
       <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center gap-10 px-6 lg:px-16">
        {/* Texto */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <h2 className="text-2xl sm:text-2xl font-bold leading-snug">
            Activa APPs por SMS
            <br className="hidden sm:inline" />
            con Encriptados
          </h2>
          <p className="text-[#9CA3AF] text-sm">
            Regístrate en cualquier aplicación
            <br className="hidden sm:inline" />
            con un número de teléfono virtual
          </p>
          <p className="text-[#9CA3AF] italic text-xs flex items-center gap-2 justify-center lg:justify-start">
            <Image
              src="/images/our-products/emojione_flag-for-colombia.png"
              alt="Bandera de Colombia"
              width={20}
              height={14}
              priority
            />
            <span>*Se genera un número colombiano</span>
          </p>
          {/* Contenedor del botón */}
          <div
            className="
              flex 
              justify-center lg:justify-start 
              w-full lg:w-auto 
              max-w-xs lg:max-w-none 
              mx-auto lg:mx-0
            "
          >
            <Button
              size="medium"
              rounded="lg"
              customStyles="!bg-[#00CCFF] !text-black !rounded-lg text-sm px-8 py-3 w-fit"
              onClick={handleBuyClick}
            >
              Comprar ahora
            </Button>
          </div>
        </div>
        {/* Spacer para desktop */}
        <div className="flex-1 hidden lg:block" />
      </div>

      {/* Móvil: imagen debajo del texto, full width */}
      <div className="block lg:hidden relative w-full h-80 overflow-hidden">
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
