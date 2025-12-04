"use client";
import React from "react";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";

import OurGoalCard from "./OurGoalCard";
import Information from "../icons/Information";
import World from "../icons/World";
import Security from "../icons/Security";

export default function OurGoalsDesktop() {
  const t = useTranslations();

  return (
    <SectionWrapper className="py-20 hidden lg:block">
      <div className="flex flex-col items-center">
        {/* Título sección */}
        <h2
          className="bg-gradient-to-r from-[#45D4FF] to-[#A8EBFF]
      bg-clip-text text-transparent font-bold text-[34px] leading-[34px]
      w-[314px] text-center mb-10"
        >
          Nuestros objetivos
        </h2>

        {/* Cards pegadas (máx 1px de separación) */}
        <div className="flex flex-row justify-center gap-[10px]">
          {/* Card 1 */}
          <OurGoalCard
            title={t("AboutUsPage.cards.communicationCard.title")}
            description={t("AboutUsPage.cards.communicationCard.description")}
            icon={<World />}
            bgColor="bg-gradient-to-b from-[#6ADDFF] to-[#A8EBFF]"
            titleColor="text-black"
            descriptionColor="text-black"
          />

          {/* Card 2 (oscura, texto blanco) */}
          <OurGoalCard
            title={t("AboutUsPage.cards.privacyCard.title")}
            description={t("AboutUsPage.cards.privacyCard.description")}
            icon={<Security />}
            bgColor="bg-gradient-to-b from-[#151515] to-[#001D25]"
            titleColor="text-white"
            descriptionColor="text-[#CFD8DC]" 
          />

          {/* Card 3 */}
          <OurGoalCard
            title={t("AboutUsPage.cards.informationCard.title")}
            description={t("AboutUsPage.cards.informationCard.description")}
            icon={<Information />}
            bgColor="bg-gradient-to-b from-[#6ADDFF] to-[#A8EBFF]"
            titleColor="text-black"
            descriptionColor="text-black"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
