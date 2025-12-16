import React from "react";
import Image from "next/image";
import MenAndWomenImage from "../../../../../public/images/encrypted-sim/Encrypted_MenWomen.png";
import { useTranslations } from "next-intl";

const BannerConnect = () => {
  const t = useTranslations("EncryptedSimPage");
  return (
    <div className="flex flex-col lg:flex-row w-full bg-white justify-between px-6 sm:px-8 md:px-10 py-8 md:py-10 shadow-lg rounded-3xl">
      <div className="w-full lg:w-6/12 items-center flex flex-col justify-center">
        <h2 className="text-[#333333] font-bold text-[24px] sm:text-[30px] lg:text-[38px] leading-[1.3] text-center lg:text-left">
          <span className="text-[#10B4E7] font-bold">
            {t("connectAllWorldTitle")}
          </span>{" "}
          {t("totalSecurityTitle")}
        </h2>
        <p className="text-[#333333] mt-5 md:mt-6 text-base sm:text-lg leading-relaxed text-center lg:text-left">
          {t("addYourSimSubtitle")}
        </p>
      </div>
      <div className="w-full lg:w-auto h-[250px] md:h-[280px] lg:h-[350px] min-w-[250px] md:max-w-[320px] lg:min-w-[350px] lg:max-w-none mt-6 lg:mt-0 relative rounded-3xl overflow-hidden">
        <Image
          quality={100}
          title="Personas conectadas con seguridad"
          src={MenAndWomenImage}
          alt="Personas conectadas con seguridad total mediante SIM encriptada"
          loading="eager"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default BannerConnect;
