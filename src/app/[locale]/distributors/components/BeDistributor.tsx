import { useTranslations } from "next-intl";
import React from "react";
import ArrowDistributors from "../icons/ArrowDistributors";
import Image from "next/image";
import SectionWrapper from "@/shared/components/SectionWrapper";

const BeDistributor = () => {
  const t = useTranslations("DistributorsPage");
  const ManDistributor = "/images/distributors/girlandman.png";

  return (
    <div className="w-full bg-gradient-to-r from-[#00372B] via-black to-[#022530] flex justify-center items-center py-10 md:py-16">
      <SectionWrapper>
        <div className="w-full flex flex-row gap-5 items-center">
          {/* Tarjeta de contenido */}
          <div className="w-1/2 bg-gradient-to-r from-[#35CDFB] via-[#35CDFB] to-[#00FFB2] p-0.5 rounded-2xl flex flex-col justify-center">
            <div className="bg-[#0E0E0E] rounded-xl p-4 sm:p-8 md:p-12 h-full">
              <ArrowDistributors />
              <h1 className="text-white text-lg sm:text-3xl md:text-4xl font-bold mt-2">
                {t("toBeADistributor.title")}
              </h1>
              <p className="text-[#9F9F9F] text-base mt-6 sm:mt-8 md:mt-10 sm:text-base md:text-lg">
                {t("toBeADistributor.description")}
              </p>
            </div>
          </div>

          {/* Tarjeta de imágenes */}
          <div className="w-1/2 flex items-center justify-center rounded-2xl p-3 sm:p-5 relative">
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
