"use client";
import React from "react";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";
import Image from "next/image";

import OurGoalCard from "./OurGoalCard";


export default function OurGoalsMobile() {
  const t = useTranslations();

  return (
    <SectionWrapper className="py-12 block sm:hidden">
      <h2 className="text-white text-[22px] xs:text-[24px] font-bold text-center mb-6 px-4">
        Nuestros objetivos
      </h2>

      <div className="flex flex-col items-center gap-5">
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
                        src="/images/about-us/key_visualizer.png "
                        alt="information icon"
                        width={26}
                        height={26}
                      />
                    }
                    bgColor="bg-gradient-to-b from-[#6ADDFF] to-[#A8EBFF]"
                  />
                </div>
    </SectionWrapper>
  );
}
