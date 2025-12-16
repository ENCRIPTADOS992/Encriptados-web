import { useTranslations } from "next-intl";
import React from "react";
import ArrowDistributors from "../icons/ArrowDistributors";
import Image from "next/image";
import SectionWrapper from "@/shared/components/SectionWrapper";

const BeDistributor = () => {
  const t = useTranslations("DistributorsPage");
  const ManDistributor = "/images/distributors/girlandman.png";

  return (
    <div className="w-full bg-black flex justify-center items-center py-12 md:py-16 lg:py-20">
      <SectionWrapper>
        <div className="w-full flex flex-col sm:flex-row gap-5 items-center">
          {/* Tarjeta de contenido */}
          <div className="w-full sm:w-1/2 bg-gradient-to-r from-[#35CDFB] via-[#35CDFB] to-[#00FFB2] p-0.5 rounded-2xl flex flex-col justify-center">
            <div className="bg-[#0E0E0E] rounded-xl p-4 sm:p-8 md:p-12 h-full">
              <ArrowDistributors />
              <h2 className="text-[24px] md:text-[30px] lg:text-[38px] leading-[1.3] font-bold text-white mt-4">
                {t("toBeADistributor.title")}
              </h2>
              <p className="text-base leading-relaxed text-[#9F9F9F] mt-6">
                {t("toBeADistributor.description")}
              </p>
            </div>
          </div>

          {/* Tarjeta de imágenes */}
          <div className="w-full sm:w-1/2 flex items-center justify-center rounded-2xl p-3 sm:p-5 relative">
            <div className="flex relative">
              <Image
                alt="Man Distributor"
                src={ManDistributor}
                width={380} 
                height={380} 
                className="w-full max-w-[380px] h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default BeDistributor;
