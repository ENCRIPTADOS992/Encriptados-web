import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const OurObjetive = () => {
  const FloatSimCard = "/images/encrypted-sim/Encrypted_float_image.png";

  const t = useTranslations("EncryptedSimPage");
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-8 lg:gap-12 items-center">
      {/* Texto */}
      <div className="w-full lg:w-1/2 max-w-xl px-4 lg:px-0">
        <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-gray-900 text-center lg:text-left mb-4">
          {t("ourObjetiveTitle")}
        </h1>

        <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 text-center lg:text-left">
          {t("ourObjetiveDescription")}
        </p>
      </div>

      {/* Imagen */}
      <div className="w-full lg:w-1/2 max-w-xl">
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 flex justify-center items-center mx-auto">
          <Image
            alt="SimCard"
            src={FloatSimCard}
            width={334}
            height={314}
            className="w-full h-auto max-w-[334px]"
          />
        </div>
      </div>
    </div>
  );
};

export default OurObjetive;
