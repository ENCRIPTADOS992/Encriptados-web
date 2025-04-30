import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";

const BannerOurProductsMobile = () => {
  const { setValue } = useFormContext();
  const BannerBackground = "/images/home/banner-home.png";
  const t = useTranslations("OurProductsPage");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-black py-5 items-center justify-center flex">
      {/* Contenedor principal */}
      <div className="flex flex-col h-full w-[450px] md:w-full">
        {/* Contenido superior */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-4 pt-12 z-10">
          <div className="max-w-[500px] space-y-6">
            <h1 className="text-3xl font-bold text-white leading-tight">
              <span>{t("banner.titleNewConnectWith")}</span>{" "}
              <span className="text-[#7CD0F9]">
                {t("banner.titleNewTotalSecurity")}
              </span>{" "}
              <span>{t("banner.titleNewInComunication")}</span>
            </h1>
            <p className="text-gray-300 text-sm">
              {t("banner.descriptionNew")}
            </p>
            <div className="flex gap-2 w-full max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => {
                  scrollToSection("#buysimappsection");
                  setValue("selectedOption", "sim");
                }}
                className="w-full bg-[#7CD0F9] text-black font-semibold py-3 rounded-full hover:bg-[#6bb8e0] transition-colors"
              >
                {t("banner.newButtonBuy")}
              </button>
              <button
                type="button"
                onClick={() => {
                  scrollToSection("#buysimappsection");
                  setValue("selectedOption", "app");
                }}
                className="w-full border-2 border-white text-white font-semibold py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                {t("banner.buttonAppEncriptados")}
              </button>
            </div>
          </div>
        </div>

        {/* Imagen inferior */}

        <div className="w-full flex justify-center items-center">
          <Image
            src={BannerBackground}
            alt="Banner background"
            objectFit="cover"
            className="translate-y-5"
            objectPosition="top"
            width={375}
            height={350}
            quality={100}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default BannerOurProductsMobile;
