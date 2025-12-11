"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";

import OurGoalCard from "./OurGoalCard";

export default function OurGoalsTablet() {
  const t = useTranslations();

  return (
    <SectionWrapper className="py-16 hidden sm:block lg:hidden">
      <div className="flex flex-col items-center">

        <h2
          className="text-white font-bold text-[28px] leading-[28px]
          text-center mb-8"
        >
          Nuestros objetivos
        </h2>

        {/* 3 cards por fila */}
        <div className="flex flex-row gap-[8px] w-[712px]">

          {/* Card 1 */}
          <OurGoalCard
            title={t("AboutUsPage.cards.communicationCard.title")}
            description={t("AboutUsPage.cards.communicationCard.description")}
            icon={
              <Image
                src="/images/about-us/bring_your_own_ip.png"
                alt="communication icon"
                width={26}
                height={26}
              />
            }
            bgColor="bg-gradient-to-b from-[#6ADDFF] to-[#A8EBFF]"
          />

          {/* Card 2 */}
          <OurGoalCard
            title={t("AboutUsPage.cards.privacyCard.title")}
            description={t("AboutUsPage.cards.privacyCard.description")}
            icon={
              <Image
                src="/images/about-us/lock_reset.png"
                alt="privacy icon"
                width={26}
                height={26}
              />
            }
            bgColor="bg-gradient-to-b from-[#151515] to-[#001D25]"
            titleColor="text-white"
            descriptionColor="text-[#CFD8DC]"
          />

          {/* Card 3 */}
          <OurGoalCard
            title={t("AboutUsPage.cards.informationCard.title")}
            description={t("AboutUsPage.cards.informationCard.description")}
            icon={
              <Image
                src="/images/about-us/key_visualizer.png"
                alt="information icon"
                width={26}
                height={26}
              />
            }
            bgColor="bg-gradient-to-b from-[#6ADDFF] to-[#A8EBFF]"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
