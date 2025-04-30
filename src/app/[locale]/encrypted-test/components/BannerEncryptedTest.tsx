import React from "react";
import Image from "next/image";
import WorldIconTest from "../icons/WorldIconTest";
import { useTranslations } from "next-intl";
import ButtonGradientClasic from "@/shared/components/ButtonGradientClasic";

const BannerEncryptedTest = () => {
  const EncryptedTest = "/images/encrypted-test/banner-test.png";

  const t = useTranslations("EncryptedTestPage");

  return (
    <div className="relative w-full h-[70vh] sm:h-[50vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
      <Image
        src={EncryptedTest}
        alt="Encrypted Test Banner"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="-z-10"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-4 md:gap-y-7 z-10 p-4">
        <ButtonGradientClasic title={t("banner.securityTestTitle")} />
        <WorldIconTest />
        <h1 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold w-full max-w-[350px] md:max-w-[450px] text-center">
          {t("banner.securityTestDescription")}
        </h1>
      </div>
    </div>
  );
};

export default BannerEncryptedTest;
