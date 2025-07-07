"use client";
import { useTranslations } from "next-intl";
import React from "react";
import ShieldDistributors from "../icons/ShieldDistributors";
import ListOfCards from "@/shared/components/ListOfCards/ListOfCards";
import SectionWrapper from "@/shared/components/SectionWrapper";

const EncryptedCommunication = () => {
  const t = useTranslations("DistributorsPage");

  return (
<div className="w-full min-h-screen bg-black relative flex flex-col items-center justify-center py-16 overflow-hidden">
  {/* ELIPSE AZUL */}
  <div
    className="absolute pointer-events-none z-0"
    style={{
      width: 500,
      height: 500,
      left: '20%', 
      top: '55%',
      transform: 'translateY(-50%)',
      background: '#10B4E7',
      opacity: 0.50,
      filter: 'blur(180px)',
      borderRadius: '50%',
    }}
  />

  {/* ELIPSE VERDE */}
  <div
    className="absolute pointer-events-none z-0"
    style={{
      width: 300,
      height: 200,
      left: '60%',
      top: '55%',
      transform: 'translateY(-50%)',
      background: '#01FFC2',
      opacity: 0.40,
      filter: 'blur(180px)',
      borderRadius: '50%',
    }}
  />

  <SectionWrapper className="relative z-10">
    {/* Botón flotante */}
    <div className="flex min-h-[100px] items-center justify-center p-4">
      <div className="relative inline-block">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFFF] to-[#0080FF] opacity-75 blur-sm rounded-full" />
        <div className="relative px-6 py-2 bg-[#0E0E0E] rounded-full leading-none border border-transparent bg-clip-padding">
          <span className="bg-gradient-to-r from-[#00FFFF] to-[#0080FF] bg-clip-text text-transparent font-sans text-xs sm:text-sm font-medium">
            {t("knowsBenefits.title")}
          </span>
        </div>
      </div>
    </div>

    {/* Contenido principal */}
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <div className="w-full flex justify-center">
          <h1
            className="text-white font-bold text-center mb-6 w-full max-w-[497px] text-[30px] leading-[100%] mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }} 
          >
            {t("knowsBenefits.subtitle")}
          </h1>
        </div>
        {/* Grid de tarjetas */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              title: t("benefitsCards.card1.title"),
              description: t("benefitsCards.card1.description"),
            },
            {
              title: t("benefitsCards.card2.title"),
              description: t("benefitsCards.card2.description"),
            },
            {
              title: t("benefitsCards.card3.title"),
              description: t("benefitsCards.card3.description"),
            },
            {
              title: t("benefitsCards.card4.title"),
              description: t("benefitsCards.card4.description"),
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-black rounded-xl p-8 md:p-10 flex flex-col items-start max-w-[300px] md:max-w-[410px] min-h-[210px] md:min-h-[270px]"
            >
              <div className="mb-4">
                <ShieldDistributors />
              </div>
              <div className="text-white font-bold text-[20px] md:text-[22px] leading-[100%] mb-2 max-w-[345px]">
                {card.title}
              </div>
              <div className="text-white/60 text-[15px] md:text-[18px] leading-[100%] max-w-[345px]">
                {card.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SectionWrapper>
</div>

  );
};

export default EncryptedCommunication;
