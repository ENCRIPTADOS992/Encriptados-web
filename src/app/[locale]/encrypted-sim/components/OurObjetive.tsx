import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SimEncriptada from "/public/images/encrypted-sim/sim-encriptada.webp";

interface OurObjetiveProps {
  variant?: "encrypted" | "tim";
}

const OurObjetive = ({ variant = "encrypted" }: OurObjetiveProps) => {
  const isTimVariant = variant === "tim";

  const imageSrc = isTimVariant
    ? "/images/bne-sim/tim.webp"
    : SimEncriptada;

  const containerBgColor = isTimVariant ? "#009DFF" : "white";

  const t = useTranslations("EncryptedSimPage");
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center lg:justify-between gap-8 lg:gap-12 items-center my-10 lg:my-16">
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
          className="flex justify-center items-center w-full max-w-[280px] lg:max-w-[380px]"
        >
          <Image
            alt="SimCard"
            src={imageSrc}
            width={450}
            height={420}
            quality={90}
            className="w-full object-contain rounded-xl -rotate-6 drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
          />
        </div>
      </div>
    </div>
  );
};

export default OurObjetive;
