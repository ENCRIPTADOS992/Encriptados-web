import SectionWrapper from "@/shared/components/SectionWrapper";
import { useTranslations } from "next-intl";
import React from "react";

const WhoWeAre = () => {
  const t = useTranslations();
  return (
    <SectionWrapper className="py-28">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto gap-4">
        {/* Título */}
        <h1 className="text-[#5CDAFF] font-bold text-3xl md:text-5xl text-center md:text-left md:w-6/12">
          {t("AboutUsPage.aboutUs.title")}
        </h1>

        {/* Descripción */}
        <p className="text-white text-base md:text-lg text-justify md:w-6/12">
          {t("AboutUsPage.aboutUs.description")}
        </p>
      </div>
    </SectionWrapper>
  );
};

export default WhoWeAre;
