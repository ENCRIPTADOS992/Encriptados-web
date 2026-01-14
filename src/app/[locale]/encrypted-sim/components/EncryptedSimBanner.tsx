import React from "react";
import Image from "next/image";
import CircleTitle from "@/shared/components/CircleTitle";
import { useTranslations } from "next-intl";

const Women = "/images/encrypted-sim/Encrypted_Women.webp";
const Man = "/images/encrypted-sim/Encrypted_Man.webp";
const Sim = "/images/encrypted-sim/Encrypted_sim_card.webp";

const EncryptedSimBanner = () => {
  const t = useTranslations("EncryptedSimPage");

  return (
    <div className="flex flex-col md:flex-row w-full py-0 xl:py-0 bg-white">
      {/* Imagen de la izquierda */}
      <div className="w-full md:w-1/5 relative overflow-hidden self-end mb-0 object-contain">
        <Image
          src={Women}
          width={740}
          height={740}
          alt="Mujer usando tecnología encriptada"
          className="w-1/2 sm:w-1/3 md:w-full object-contain m-auto max-w-[180px] max-h-[250px] md:max-w-[160px] md:max-h-[220px] lg:max-w-[220px] lg:max-h-[320px] xl:max-w-none xl:max-h-none"
        />
      </div>

      {/* Contenido central */}
      <div className="flex flex-col gap-y-5 md:gap-y-6 text-center items-center justify-center md:w-3/5 py-8 md:py-10 px-4">
        <CircleTitle size="large" rounded="full" intent="secondary">
          {t("encryptedTitleButon")}
        </CircleTitle>
        <Image
          src={Sim}
          width={740}
          height={740}
          alt="Tarjeta SIM encriptada"
          className="w-full object-contain max-w-[250px] max-h-[200px] md:max-w-[220px] md:max-h-[180px] lg:max-w-[320px] lg:max-h-[260px] xl:max-w-[450px] xl:max-h-[360px]"
        />
        <h1 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.3] text-[#333333] w-11/12">
          {t("encryptedTitle")}
        </h1>
        <p className="text-black text-base sm:text-lg leading-relaxed w-11/12">
          {t("encryptedDescription")}
        </p>
      </div>

      {/* Imagen de la derecha */}
      <div className="w-full md:w-1/5 relative overflow-hidden self-end mb-0 object-contain">
        <Image
          src={Man}
          width={740}
          height={740}
          alt="Hombre usando tecnología encriptada"
          className="w-1/2 sm:w-1/3 md:w-full object-contain m-auto max-w-[180px] max-h-[250px] md:max-w-[160px] md:max-h-[220px] lg:max-w-[220px] lg:max-h-[320px] xl:max-w-none xl:max-h-none"
        />
      </div>
    </div>
  );
};

export default EncryptedSimBanner;
