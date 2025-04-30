import { useTranslations } from "next-intl";
import React from "react";
import ArrowDistributors from "../icons/ArrowDistributors";
import Image from "next/image";

const BeDistributor = () => {
  const t = useTranslations("DistributorsPage");

  const ManDistributor = "/images/distributors/girlandman.png";

  return (
    <div className="w-full bg-gradient-to-r from-[#00372B] via-black to-[#022530] flex justify-center items-center py-10 md:py-16 px-4">
      <div className="max-w-screen-lg w-full flex flex-col md:flex-row gap-5">
        {/* Tarjeta de contenido */}
        <div className="w-full md:w-6/12 bg-gradient-to-r from-[#35CDFB] via-[#35CDFB] to-[#00FFB2] p-0.5 rounded-2xl">
          <div className="bg-[#0E0E0E] rounded-xl p-6 sm:p-10 md:p-14">
            <ArrowDistributors />
            <h1 className="text-white text-base sm:text-3xl md:text-4xl font-bold mt-2">
              {t("toBeADistributor.title")}
            </h1>
            <p className="text-[#9F9F9F] text-base mt-6 sm:mt-8 md:mt-10  sm:text-base md:text-lg">
              {t("toBeADistributor.description")}
            </p>
          </div>
        </div>

        {/* Tarjeta de imágenes */}
        <div className="w-full md:w-6/12 rounded-2xl p-5 relative flex items-center justify-center">
          <div className="flex relative">
            <Image
              className=""
              alt="Man Distributor"
              src={ManDistributor}
              width={250}
              height={250}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeDistributor;
