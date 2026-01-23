import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface OurObjetiveProps {
  variant?: "encrypted" | "tim";
}

const OurObjetive = ({ variant = "encrypted" }: OurObjetiveProps) => {
  const isTimVariant = variant === "tim";

  const imageSrc = isTimVariant
    ? "/images/bne-sim/tim.webp"
    : "/images/encrypted-sim/Encrypted_float_image.webp";

  const containerBgColor = isTimVariant ? "#009DFF" : "white";

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
          className="rounded-xl lg:rounded-3xl flex justify-center items-center p-4 sm:p-6 lg:p-8 w-full max-w-[374px] lg:max-w-[519px]"
          style={{
            aspectRatio: "374/309",
            borderRadius: "12px",
            backgroundColor: containerBgColor,
          }}
        >
          <Image
            alt="SimCard"
            src={imageSrc}
            width={450}
            height={420}
            className="w-full h-full max-w-[90%] max-h-[90%] lg:max-w-[95%] lg:max-h-[95%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default OurObjetive;
