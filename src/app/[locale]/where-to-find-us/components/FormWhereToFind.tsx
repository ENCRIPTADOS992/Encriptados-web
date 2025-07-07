import React from "react";
import SearchFormIcon from "../icons/SearchFormIcon";
import { useTranslations } from "next-intl";
import SearchInput from "@/shared/components/SearchInput";
import Image from "next/image";
import { CountriesRadar } from "./CountriesRadar";
import { useFormContext } from "react-hook-form";
import SectionWrapper from "@/shared/components/SectionWrapper";

const FormWhereToFind = () => {
  const t = useTranslations();

  const Man = "/images/where-to-find-us/leftman.png";
  const Woman = "/images/where-to-find-us/rightwoman.png";

  const { watch } = useFormContext();

  return (
    <div className="bg-[#041A20] overflow-x-hidden">
      <SectionWrapper className="flex flex-row justify-between items-center py-8 gap-2 sm:gap-6">
        {/* Imagen izquierda */}
        <div className="relative flex-shrink-0 w-[80px] h-[120px] sm:w-[80px] sm:h-[180px] md:w-[150px] md:h-[220px] lg:w-[200px] lg:h-[400px] lg:-ml-16">
          <Image
            alt="Man"
            src={Man}
            layout="fill"
            objectFit="cover"
            className="rounded-xl shadow-xl relative lg:left-6"
          />
        </div>

        {/* Card central */}
        <div
          className="
          flex-1 
          bg-gradient-to-b from-black via-[#001F28] to-[#050505]
          rounded-xl md:rounded-[44px]
          p-2 sm:p-6 md:p-10
          mx-2
          space-y-4 sm:space-y-6 md:space-y-8
          min-w-0
          max-w-full
        "
        >
          <div className="flex items-center justify-center">
            <SearchFormIcon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#19DBFA]" />
          </div>
          <h1 className="text-white font-bold text-center text-lg sm:text-2xl md:text-3xl">
            {t("WhereToFindUs.findATM.title")}
          </h1>
          <SearchInput
            inputClassName="bg-[#040403] border-[#505050] text-white"
            placeholder="Busca por pais"
            name="country"
          />
          {watch("country") ? (
            <div className="bg-[#040404] border-[#505050] border-2 p-3 sm:p-5 rounded-2xl">
              <CountriesRadar />
            </div>
          ) : null}
        </div>
        {/* Imagen derecha */}
        <div className="relative flex-shrink-0 w-[80px] h-[120px] sm:w-[120px] sm:h-[190px] md:w-[150px] md:h-[220px] lg:w-[200px] lg:h-[300px] lg:-ml-10">
          <Image
            alt="Woman"
            src={Woman}
            layout="fill"
            objectFit="cover"
            className="rounded-xl shadow-xl"
          />
        </div>
      </SectionWrapper>
    </div>
  );
};

export default FormWhereToFind;
