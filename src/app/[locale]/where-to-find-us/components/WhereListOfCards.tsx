import React from "react";
import Image from "next/image";
import WhereCard from "./WhereCard";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";

const WhereListOfCards = () => {
  const EncryptedBanner = "/images/where-to-find-us/backgroundbanner2.png";

  const t = useTranslations();

  return (
    <div className="relative w-full">
      {/* Imagen de fondo */}
      <Image
        src={EncryptedBanner}
        alt="Background Banner"
        layout="fill"
        objectFit="cover"
        priority
        className="z-0"
      />
      {/* Capa de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#031B20]"></div>
      {/* Contenido */}
      <SectionWrapper className="relative z-10 h-full py-16 md:py-20 lg:py-24 flex flex-col items-center">
        {/* Contenedor del texto */}
        <div className="w-full text-center mb-8">
          <h2 className="text-[30px] md:text-[38px] lg:text-[44px] leading-[1.3] font-bold text-white">
            {t("WhereToFindUs.whereCards.title")}{" "}
            <span className="text-[#6ADDFF]">
              {t("WhereToFindUs.whereCards.titleEncrypted")}
            </span>
          </h2>
        </div>
        {/* Tarjetas */}
        <WhereCard
          leftTitle={t("WhereToFindUs.whereCards.paymentPoint.title")}
          leftDescription={t(
            "WhereToFindUs.whereCards.paymentPoint.description"
          )}
          leftNumber="36.732"
          rightTitle={t("WhereToFindUs.whereCards.countriesAvailable.title")}
          rightDescription={t(
            "WhereToFindUs.whereCards.countriesAvailable.description"
          )}
          rightNumber="76"
          rightGradient="from-[#193376] via-[#061531] to-[#131313]"
          leftGradient="from-[#197647] via-[#052515] to-[#131313]"
        />
      </SectionWrapper>
    </div>
  );
};

export default WhereListOfCards;
