"use client";
import React from "react";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";

import OurGoalCard from "./OurGoalCard";
import Information from "../icons/Information";
import World from "../icons/World";
import Security from "../icons/Security";

export default function OurGoalsTablet() {
  const t = useTranslations();

  return (
    <SectionWrapper className="py-16 hidden md:block lg:hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <OurGoalCard
          title={t("AboutUsPage.cards.communicationCard.title")}
          description={t("AboutUsPage.cards.communicationCard.description")}
          icon={<World />}
          bgColor="bg-gradient-to-b from-[#6ADDFF] via-[#A8EBFF] to-[#A8EBFF]"
          borderRadius="lg"
        />
        <OurGoalCard
          titleColor="text-[#FFFFFF]"
          descriptionColor="text-[#828B8D]"
          title={t("AboutUsPage.cards.privacyCard.title")}
          description={t("AboutUsPage.cards.privacyCard.description")}
          icon={<Security />}
          bgColor="bg-gradient-to-b from-[#151515] via-[#001D25] to-[#001D25]"
          borderRadius="lg"
        />
        <OurGoalCard
          title={t("AboutUsPage.cards.informationCard.title")}
          description={t("AboutUsPage.cards.informationCard.description")}
          icon={<Information />}
          bgColor="bg-gradient-to-b from-[#6ADDFF] via-[#A8EBFF] to-[#A8EBFF]"
          borderRadius="lg"
        />
      </div>
    </SectionWrapper>
  );
}
