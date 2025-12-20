import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import SectionWrapper from "./components/SectionWrapper";

const BannerCoverage = () => {
  const FloatSimCard = "/images/encrypted-sim/Encrypted_world.png"; // Ruta de la imagen

  const t = useTranslations("EncryptedSimPage");

  return (
    <div className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
      {/* Fondo full-width */}
      <Image
        src={FloatSimCard}
        alt="Cobertura mundial"
        fill
        style={{ objectFit: "cover" }}
        className="z-0"
      />
      <div className="absolute inset-0 bg-black opacity-35 z-10" />

      {/* Overlay centrándose con SectionWrapper */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <SectionWrapper className="text-center w-full">
          <div className="max-w-[900px] mx-auto px-6 md:px-8">
            <h2 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
                {t("coverageMoreThan200CountriesTitle").split("200")[0]}
              </span>
              <span className="bg-gradient-to-r from-[#33CDFB] to-[#10B4E7] bg-clip-text text-transparent">200</span>
              <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
                {t("coverageMoreThan200CountriesTitle").split("200")[1]}
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-white max-w-[750px] mx-auto leading-relaxed">
              {t("coverageMoreThan200CountriesDescription")}
            </p>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default BannerCoverage;
