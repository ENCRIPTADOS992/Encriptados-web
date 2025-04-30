import { useTranslations } from "next-intl";
import Image from "next/image";

import React from "react";
import { useFormContext } from "react-hook-form";

const BannerOurProducts = () => {
  const BannerBackground = "/images/home/banner-home-desktop.jpg";

  const t = useTranslations("OurProductsPage");

  const { setValue } = useFormContext();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-[500px] md:h-[500px] xl:h-[530px] 2xl:h-[650px] w-full overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src={BannerBackground}
        className="bg-[#060606]"
        alt="Banner background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />

      {/* Overlay para la opacidad */}
      <div className="absolute inset-0 bg-black bg-opacity-0" />

      {/* Contenedor del contenido */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="rounded-xl p-5 md:p-7 w-full max-w-7xl">
          <div className="flex flex-col h-full w-full justify-center items-start text-left">
            <div className="text-white space-y-6 max-w-2xl px-4 lg:px-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                <span>{t("banner.titleNewConnectWith")}</span>{" "}
                <span className="text-[#7CD0F9] font-extrabold">
                  {t("banner.titleNewTotalSecurity")}
                </span>{" "}
                <span className="font-extrabold">
                  {t("banner.titleNewInComunication")}
                </span>
              </h1>
              <p className="text-justify text-sm sm:text-base lg:max-w-xl">
                {t("banner.descriptionNew")}
              </p>
              <div className="flex flex-wrap gap-4 pt-4 justify-start">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerOurProducts;
