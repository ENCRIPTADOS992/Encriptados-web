"use client";
import React from "react";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";
import Image from "next/image";
import Typography from "@/shared/components/Typography";
import OurGoalCard from "./OurGoalCard";

export default function OurGoalsMobile() {
  const t = useTranslations();

  return (
    <SectionWrapper className="py-8 xs:py-10 sm:py-12 block sm:hidden">
      <Typography 
        variant="h3" 
        as="h2" 
        className="text-white text-xl xs:text-2xl font-bold text-center mb-5 xs:mb-6 px-4"
      >
        Nuestros objetivos
      </Typography>

      <div className="flex flex-col items-center gap-4 xs:gap-5">
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
                    titleColor="black"
                    descriptionColor="black"
                    bgColor="bg-gradient-to-b from-[#6ADDFF] to-[#A8EBFF]"
                  />
                </div>
    </SectionWrapper>
  );
}
