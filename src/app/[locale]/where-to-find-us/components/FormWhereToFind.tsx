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
      <SectionWrapper className="!max-w-none !w-screen !px-0 !mx-0 !lg:px-0 !xl:px-0 !2xl:px-0 !lg:mx-0 flex flex-col lg:flex-row justify-between items-center py-8 gap-4 sm:gap-6 lg:gap-0">
        {/* Imagen izquierda */}
        <div className="hidden lg:block relative flex-shrink-0 lg:w-[18vw] lg:h-[55vh] lg:ml-0">
          <Image
            alt="Man"
            src={Man}
            layout="fill"
            objectFit="contain"
            className=""
            style={{ objectPosition: "left center" }}
          />
        </div>

        {/* Card central */}
        <div
          className="
          flex-none w-full max-w-[800px] mx-auto
          bg-gradient-to-b from-black via-[#001F28] to-[#050505]
          rounded-xl md:rounded-[44px]
          p-8 sm:p-10 md:p-12 lg:p-14
          space-y-4 sm:space-y-6 md:space-y-8
        "
          style={{ width: "min(800px, calc(100vw - 36vw))" }}
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
            <div className="bg-[#040404] border-[#505050] border-1 p-10 sm:p-14 md:p-16 rounded-2xl">
              <CountriesRadar />
            </div>
          ) : null}
        </div>
        {/* Imagen derecha */}
        <div className="hidden lg:block relative flex-shrink-0 lg:w-[18vw] lg:h-[45vh] lg:mr-0">
          <Image
            alt="Woman"
            src={Woman}
            layout="fill"
            objectFit="contain"
            className=""
            style={{ objectPosition: "right center" }}
          />
        </div>
      </SectionWrapper>
    </div>
  );
};

export default FormWhereToFind;
