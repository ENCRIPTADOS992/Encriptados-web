import React from "react";
import Image from "next/image";
import CircleTitle from "@/shared/components/CircleTitle";
import { useTranslations } from "next-intl";

const Women = "/images/encrypted-sim/Encrypted_Women.png";
const Man = "/images/encrypted-sim/Encrypted_Man.png";
const Sim = "/images/encrypted-sim/Encrypted_sim_card.png";

const EncryptedSimBanner = () => {
  const t = useTranslations("EncryptedSimPage");

  return (
    <div className="flex flex-col md:flex-row w-full py-0 xl:py-0 bg-white">
      {/* Imagen de la izquierda */}
      <div className=" w-full md:w-1/5 relative overflow-hidden self-end mb-0 object-contain">
        <Image
          src={Women}
          width={740}
          height={740}
          alt="imagen"
          className="ls:w-full sm:w-1/3 md:w-full w-1/2 object-contain m-auto"
        />
      </div>

      {/* Contenido central */}
      <div className="flex flex-col gap-y-4 text-center items-center justify-center md:w-3/5 py-[2vh] px-4">
        <CircleTitle size="large" rounded="full" intent="secondary">
          {t("encryptedTitleButon")}
        </CircleTitle>
        <Image
          src={Sim}
          width={740}
          height={740}
          alt="imagen"
          className="h-[35%] object-contain"
        />
        <h1 className="sm:text-xl md:text-2xl lg:text-2xl xl:text-4xl font-bold text-[#333333] w-11/12">
          {t("encryptedTitle")}
        </h1>
        <p className="text-black sm:text-xl md:text-base lg:text-lg xl:text-xl 2xl:text-2xl  w-11/12">
          {t("encryptedDescription")}
        </p>
      </div>

      {/* Imagen de la derecha */}
      <div className=" w-full md:w-1/5 relative overflow-hidden self-end mb-0 object-contain">
        <Image
          src={Man}
          width={740}
          height={740}
          alt="imagen"
          className="ls:w-full sm:w-1/3 md:w-full w-1/2 object-contain m-auto"
        />
      </div>
    </div>
  );
};

export default EncryptedSimBanner;
