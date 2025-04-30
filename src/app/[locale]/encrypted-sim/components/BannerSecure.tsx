import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const BannerSecure = () => {
  const FloatSimCard = "/images/encrypted-sim/Encryped_manwithphone.png";

  const t = useTranslations("EncryptedSimPage");

  return (
    <div className="flex flex-col lg:flex-row w-full px-4 sm:px-6 lg:px-12 xl:px-20 gap-6 md:gap-10">
      {/* Imagen */}
      <div className="w-full lg:w-[518px] h-[300px] sm:h-[400px] lg:h-[500px] relative rounded-3xl overflow-hidden">
        <Image
          quality={100}
          title="Image"
          src={FloatSimCard}
          alt="Image"
          loading="eager"
          layout="fill"
          className="-scale-x-100"
          objectFit="cover"
        />
      </div>

      {/* Texto */}
      <div className="flex flex-col justify-center gap-y-6 items-center lg:items-start w-full lg:w-[450px]">
        {/* Título */}
        <div className="bg-[#6ADBFF] w-full lg:w-[450px] h-auto py-6 px-4 lg:px-6 flex justify-center lg:justify-start items-center rounded-2xl text-center lg:text-left">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            {t("secureAndEasyToUse")}
          </h2>
        </div>

        {/* Descripción */}
        <div className="bg-[#DDF7FF] w-full lg:w-[450px] p-6 sm:p-8 flex justify-center lg:justify-start items-center rounded-2xl text-center lg:text-left">
          <h1 className="text-sm sm:text-base lg:text-lg text-gray-700">
            {t("secureAndEasyToUseDescription")}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BannerSecure;
