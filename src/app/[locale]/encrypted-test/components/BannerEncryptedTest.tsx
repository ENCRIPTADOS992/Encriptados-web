import React from "react";
import Image from "next/image";
import WorldIconTest from "../icons/WorldIconTest";
import { useTranslations } from "next-intl";
import ButtonGradientClasic from "@/shared/components/ButtonGradientClasic";
import SectionWrapper from "@/shared/components/SectionWrapper";

const BannerEncryptedTest = () => {
  const EncryptedTest = "/images/encrypted-test/banner-test.png";
  const t = useTranslations("EncryptedTestPage");

  return (
    <div className="relative w-full h-[70vh] sm:h-[50vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
      <Image
        src={EncryptedTest}
        alt="Encrypted Test Banner"
        fill
        quality={100}
        style={{ objectFit: "cover" }}
        className="z-0"
      />

      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-b from-transparent to-black z-[5] pointer-events-none" />

      <SectionWrapper className="absolute inset-0 flex flex-col items-center justify-center gap-y-4 md:gap-y-7 z-10 p-4">
        <ButtonGradientClasic title={t("banner.securityTestTitle")} />
        <WorldIconTest />
        <h1 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold w-full max-w-[350px] md:max-w-[450px] text-center">
          {t("banner.securityTestDescription")}
        </h1>
      </SectionWrapper>
    </div>
  );
};

export default BannerEncryptedTest;
