import { useTranslations } from "next-intl";
import React from "react";

const WhoWeAre = () => {
  const t = useTranslations();
  return (
    <div className="flex justify-center items-center px-4 md:px-8 py-28">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center">
        {/* Título */}
        <h1 className="text-[#5CDAFF] font-bold text-3xl md:text-5xl text-center md:text-left mb-4 md:mb-0 md:w-6/12">
          {t("AboutUsPage.aboutUs.title")}
        </h1>

        {/* Descripción */}
        <p className="text-white text-base md:text-lg text-justify md:w-6/12">
          {t("AboutUsPage.aboutUs.description")}
        </p>
      </div>
    </div>
  );
};

export default WhoWeAre;
