import ListOfCards from "@/shared/components/ListOfCards/ListOfCards";
import React from "react";

import ConectionSvg from "../svgs/ConectionSvg";
import HighPriceSvg from "../svgs/HighPriceSvg";
import ConnectInstanlySvg from "../svgs/ConectInstanlySvg";
import WorldSvg from "../svgs/WorldSvg";
import TotalAnonimateSvg from "../svgs/TotalAnonimateSvg";
import UnlimitedDataSvg from "../svgs/UnlimitedDataSvg";
import { useTranslations } from "next-intl";

export const BenefitsForYou = () => {
  const t = useTranslations("MayaData");
  return (
    <div className="flex justify-center flex-col items-center mt-9">
      <h1 className="text-base text-center pt-14 font-bold md:text-3xl xl:text-4xl mb-10">
        {t("allBenefits.title")}
      </h1>

      <div className="w-full sm:w-8/12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <ListOfCards
          bgIconCard="#E6F4F9"
          centered
          columns={3}
          items={[
            {
              title: t("allBenefits.connectionTitle"),
              description: t("allBenefits.connectionDescription"),
              icon: <ConectionSvg width={50} height={50} />,
            },
            {
              title: t("allBenefits.avoidHighRoamingTitle"),
              description: t("allBenefits.avoidHighRoamingDescription"),
              icon: <HighPriceSvg height={50} width={50} />,
            },
            {
              title: t("allBenefits.connectInstanlyTitle"),
              description: t("allBenefits.connectInstanlyDescription"),
              icon: <ConnectInstanlySvg height={50} width={50} />,
            },
            {
              title: t("allBenefits.globalReachTitle"),
              description: t("allBenefits.globalReachDescription"),
              icon: <WorldSvg width={50} height={50} />,
            },
            {
              title: t("allBenefits.totalAnonymityTitle"),
              description: t("allBenefits.totalAnonymityDescription"),
              icon: <TotalAnonimateSvg width={50} height={50} />,
            },
            {
              title: t("allBenefits.unlimitedDataTitle"),
              description: t("allBenefits.unlimitedDataDescription"),
              icon: <UnlimitedDataSvg height={50} width={50} />,
            },
          ]}
        />
      </div>
    </div>
  );
};
