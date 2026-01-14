"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";
import Typography from "@/shared/components/Typography";
import OurGoalCard from "./OurGoalCard";

export default function OurGoalsTablet() {
  const t = useTranslations();

  return (
    <SectionWrapper className="py-12 sm:py-14 md:py-16 hidden sm:block lg:hidden">
      <div className="flex flex-col items-center">

        <Typography 
          variant="h2" 
          as="h2" 
          className="text-white font-bold text-2xl sm:text-[28px] leading-tight text-center mb-6 sm:mb-8"
        >
          Nuestros objetivos
        </Typography>

        {/* Cards */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 md:gap-[8px] w-full max-w-[90%] sm:max-w-[712px] mx-auto">

          {/* Card 1 */}
          <OurGoalCard
            title={t("AboutUsPage.cards.communicationCard.title")}
            description={t("AboutUsPage.cards.communicationCard.description")}
            icon={
              <Image
                src="/images/about-us/bring_your_own_ip.webp"
                alt="communication icon"
                width={26}
                height={26}
              />
            }
            bgColor="bg-gradient-to-b from-[#6ADDFF] to-[#A8EBFF]"
            titleColor="black"
            descriptionColor="black"
          />

          {/* Card 2 */}
          <OurGoalCard
            title={t("AboutUsPage.cards.privacyCard.title")}
            description={t("AboutUsPage.cards.privacyCard.description")}
            icon={
              <Image
                src="/images/about-us/lock_reset.webp"
                alt="privacy icon"
                width={26}
                height={26}
              />
            }
            bgColor="bg-gradient-to-b from-[#151515] to-[#001D25]"
            titleColor="text-primary"
            descriptionColor="secondary"
          />

          {/* Card 3 */}
          <OurGoalCard
            title={t("AboutUsPage.cards.informationCard.title")}
            description={t("AboutUsPage.cards.informationCard.description")}
            icon={
              <Image
                src="/images/about-us/key_visualizer.webp"
                alt="information icon"
                width={26}
                height={26}
              />
            }
            bgColor="bg-gradient-to-b from-[#6ADDFF] to-[#A8EBFF]"
            titleColor="black"
            descriptionColor="black"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
