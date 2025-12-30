import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const OurObjetive = () => {
  const FloatSimCard = "/images/encrypted-sim/Encrypted_float_image.png";

  const t = useTranslations("EncryptedSimPage");
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center lg:justify-between gap-8 lg:gap-12 items-center">
      {/* Texto */}
      <div className="w-full lg:w-1/2 max-w-xl px-4 lg:px-0">
        <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.3] text-gray-900 text-center lg:text-left mb-5 md:mb-6">
          {t("ourObjetiveTitle")}
        </h2>

        <p className="text-base sm:text-lg font-bold leading-relaxed text-gray-900 text-center lg:text-left">
          {t("ourObjetiveDescription")}
        </p>
      </div>

      {/* Imagen */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div 
          className="bg-white rounded-3xl flex justify-center items-center p-6 sm:p-8"
          style={{ 
            maxWidth: "519px",
            minHeight: "432px",
            borderRadius: "24px",
          }}
        >
          <Image
            alt="SimCard"
            src={FloatSimCard}
            width={334}
            height={314}
            className="w-auto h-auto max-w-full object-contain"
            style={{ aspectRatio: "334/314" }}
          />
        </div>
      </div>
    </div>
  );
};

export default OurObjetive;
