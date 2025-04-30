import React from "react";
import OurGoalCard from "./OurGoalCard";
import { useTranslations } from "next-intl";
import Information from "../icons/Information";
import World from "../icons/World";
import Security from "../icons/Security";

const OurGoals = () => {
  const t = useTranslations();
  return (
    <div className="flex justify-center items-center ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full  lg:w-7/12 px-4">
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
    </div>
  );
};

export default OurGoals;
