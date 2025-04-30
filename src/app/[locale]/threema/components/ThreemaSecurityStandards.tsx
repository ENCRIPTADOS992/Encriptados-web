"use client";

import { useTranslations } from "next-intl";
import SecurityIcon from "../icons/Security";

const ThreemaSecurityStandards = () => {
  const t = useTranslations("ThreemaPage.securityStandards");

  const cards = t.raw("cards") as {
    title: string;
    description: string;
  }[];

  return (
    <section className="bg-black py-10 px-4 lg:px-20 lg:h-[554px] flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-[#171717] rounded-xl flex flex-col gap-4 shadow-md 
              p-6 lg:w-[306px] lg:h-[274px] w-full h-[274px]"
            >
              {/* Icono */}
              <div className="w-10 h-10 flex items-center justify-center">
                <SecurityIcon />
              </div>

              {/* Texto */}
              <div className="flex flex-col flex-grow">
                <h3 className="font-bold text-white text-base mb-2">
                  {card.title}
                </h3>
                <p className="text-[#A3A3A3] text-sm text-justify">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreemaSecurityStandards;
