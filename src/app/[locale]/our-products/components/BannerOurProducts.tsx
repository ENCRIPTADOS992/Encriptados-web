import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";
import ShoppingBagIcon from "./svgs/ShoppingBagIcon";

const BannerOurProducts = () => {
  const t = useTranslations("OurProductsPage");
  const { setValue } = useFormContext();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full py-10 flex justify-center items-center">
      {/* Contenedor tipo tarjeta */}
      <div className="relative w-full max-w-[1200px] bg-[#1a1a1a] rounded-xl p-6 md:p-10 flex flex-col lg:flex-row justify-between items-center gap-8 overflow-hidden">

        {/* Fondo de puntos detrás del texto */}
        <div className="absolute top-0 left-0 h-[70%] w-full z-0">
          <Image
            src="/images/our-products/2f4c437915945215a21a8478b499fc508f3a35a2.png"
            alt="Dot background"
            layout="fill"
            objectFit="cover"
            className="rounded-xl opacity-50"
          />
        </div>

        {/* Contenido de texto */}
        <div className="flex-1 text-white space-y-3 px-2 lg:px-0 text-left z-10">
          <div className="inline-block border border-[#7EE0FF] text-[#0AB4E9] px-6 py-1 rounded-full text-sm font-medium w-fit">
            {t("banner.securityFromStartToEnd")}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
            <span className="text-[#0AB4E9] font-extrabold">{t("banner.titleNewConnectWith")}</span>{" "}
            <span className="text-[white] font-extrabold">
              {t("banner.titleNewTotalSecurity")}
            </span>{" "}
            <span className="text-[#0AB4E9] font-extrabold">
              {t("banner.titleNewInComunication")}
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:max-w-xl text-justify">
            {t("banner.descriptionNew")}
          </p>
          {/* <div className="flex flex-wrap gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                scrollToSection("#buysimappsection");
                setValue("selectedOption", "sim");
              }}
              className="bg-[#7CD0F9] text-black font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-[#6bb8e0] transition-colors"
            >
              {t("banner.newButtonBuy")}
            </button>
            <button
              type="button"
              onClick={() => {
                scrollToSection("#buysimappsection");
                setValue("selectedOption", "app");
              }}
              className="border-2 border-white text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              {t("banner.buttonAppEncriptados")}
            </button>
          </div>
        </div> */}

        {/* Botón con ícono personalizado */}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                scrollToSection("#buysimappsection");
                setValue("selectedOption", "sim");
              }}
              className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              <ShoppingBagIcon className="w-5 h-5 text-white" />

              {t("banner.goToStore")}
            </button>
          </div>
        </div>

        {/* Imagen de persona */}
        <div className="flex-1 w-full max-w-md z-10 relative h-[400px]">
          <Image
            src="/images/our-products/070e8ce9e05a772be2fda80c02b3733778db1afd.png"
            alt="Persona hablando"
            layout="fill"
            objectFit="contain"
            className="object-bottom"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default BannerOurProducts;
