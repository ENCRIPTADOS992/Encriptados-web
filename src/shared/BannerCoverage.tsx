import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const BannerCoverage = () => {
  const FloatSimCard = "/images/encrypted-sim/Encrypted_world.webp";

  const t = useTranslations("EncryptedSimPage");

  return (
    <div className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
      {/* Fondo full-width */}
      <Image
        src={FloatSimCard}
        alt="Cobertura mundial"
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        className="z-0"
        priority
      />

      {/* Gradiente overlay - de negro a transparente */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(90deg, #000000 22%, rgba(65, 93, 130, 0) 100%)"
        }}
      />

      {/* Contenido alineado a la izquierda */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full">
          <div className="max-w-[500px]">
            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-bold leading-[1.1] mb-3 md:mb-4">
              <span className="text-[#33CDFB]">
                {t("coverageMoreThan200CountriesTitle").split("más")[0]}
              </span>
              <span className="text-white">
                más{t("coverageMoreThan200CountriesTitle").split("más")[1]}
              </span>
            </h2>
            <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-gray-300 leading-relaxed">
              {t("coverageMoreThan200CountriesDescription")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCoverage;
