import React from "react";
import Image from "next/image";
import MenAndWomenImage from "../../../../../public/images/encrypted-sim/Encrypted_MenWomen.png";
import { useTranslations } from "next-intl";

const BannerConnect = () => {
  const t = useTranslations("EncryptedSimPage");
  return (
    <div className="flex flex-col lg:flex-row w-full  bg-white justify-between px-10 py-6 shadow-lg rounded-3xl">
      <div className="w-full lg:w-6/12 items-center flex flex-col justify-center">
        <h2 className="text-[#333333] font-bold text-3xl lg:text-4xl text-center lg:text-left">
          <span className="text-[#10B4E7] font-bold">
            {t("connectAllWorldTitle")}
          </span>{" "}
          {t("totalSecurityTitle")}
        </h2>
        <p className="text-[#333333] mt-4 text-lg text-center lg:text-left">
          {t("addYourSimSubtitle")}
        </p>
      </div>
      <div className="w-full lg:w-auto h-[250px] lg:h-[350px] min-w-[250px] lg:min-w-[350px] mt-6 lg:mt-0 relative rounded-3xl overflow-hidden">
        <Image
          quality={100}
          title="Image"
          src={MenAndWomenImage}
          alt="Image"
          loading="eager"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default BannerConnect;
