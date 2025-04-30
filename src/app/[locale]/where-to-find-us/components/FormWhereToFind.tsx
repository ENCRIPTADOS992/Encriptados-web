import React from "react";
import SearchFormIcon from "../icons/SearchFormIcon";
import { useTranslations } from "next-intl";
import SearchInput from "@/shared/components/SearchInput";
import Image from "next/image";
import { CountriesRadar } from "./CountriesRadar";
import { useFormContext } from "react-hook-form";

const FormWhereToFind = () => {
  const t = useTranslations();

  const Man = "/images/where-to-find-us/leftman.png";
  const Woman = "/images/where-to-find-us/rightwoman.png";

  const { watch } = useFormContext();

  return (
    <div className="bg-[#041A20] overflow-x-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start px-4 py-8">
        <div className="w-[350px] md:w-[200px] h-[400px]  relative mb-8 md:mb-0">
          <Image
            alt="Man"
            className="-translate-x-24 md:-translate-x-4"
            src={Man}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="mt-4 bg-gradient-to-b from-black mb-10 via-[#001F28] to-[#050505] w-full md:w-6/12 rounded-xl p-6 md:p-10 space-y-6">
          <div className="flex items-center justify-center">
            <SearchFormIcon />
          </div>

          <h1 className="text-white font-bold text-center text-2xl md:text-3xl">
            {t("WhereToFindUs.findATM.title")}
          </h1>

          <SearchInput
            inputClassName="bg-[#040403] border-[#505050] text-white"
            placeholder="Busca por pais"
            name="country"
          />

          {watch("country") ? (
            <div className="bg-[#040404] border-[#505050] border-2 p-5 rounded-2xl">
              <CountriesRadar />
            </div>
          ) : null}
        </div>

        <div className="w-full md:w-[300px] h-[400px] relative">
          <Image
            alt="Woman"
            src={Woman}
            layout="fill"
            className="translate-x-12 md:translate-x-7"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default FormWhereToFind;
