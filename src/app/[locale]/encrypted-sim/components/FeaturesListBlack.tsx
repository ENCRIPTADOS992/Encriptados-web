"use client";

import { useTranslations } from "next-intl";
import React from "react";

import AnonimateSvg from "../svgs/AnonimateSvg";
import ImsiChangeSvg from "../svgs/ImsiChangeSvg";
import SubstituteNumberSvg from "../svgs/SubstituteNumberSvg";
import VoiceFilterSvg from "../svgs/VoiceFilterSvg";
import CallbackSvg from "../svgs/CallbackSvg";
import PlansSvg from "../svgs/PlansSvg";
import NoGeolocalizationSvg from "../svgs/NoGeolocalizationSvg";
import GlobalCoverage from "../svgs/GlobalCoverage";
import MSIMask from "../svgs/MSIMack";
import RedProviderSvg from "../svgs/RedProviderSvg";
import WithOutNumberSvg from "../svgs/WithOutNumberSvg";
import ListOfCardsSim from "@/shared/components/ListOfCards/ListOfCardsSim";
import ListOfCardsStandard from "@/shared/components/ListOfCards/ListOfCardsStandard";
import SectionWrapper from "@/shared/components/SectionWrapper";



const FeaturesListBlack = () => {
  const t = useTranslations("EncryptedSimPage");

  const simCards = [
    {
      title: t("improveYourSecurity.untraceable.title"),
      description: t("improveYourSecurity.untraceable.description"),
      icon: <AnonimateSvg />,
    },
    {
      title: t("improveYourSecurity.anonymity.title"),
      description: t("improveYourSecurity.anonymity.description"),
      icon: <AnonimateSvg />,
    },
    {
      title: t("improveYourSecurity.changeMSI.title"),
      description: t("improveYourSecurity.changeMSI.description"),
      icon: <ImsiChangeSvg />,
    },
    {
      title: t("improveYourSecurity.plans.title"),
      description: t("improveYourSecurity.plans.description"),
      icon: <PlansSvg />,
    },
    {
      title: t("improveYourSecurity.geolocalization.title"),
      description: t("improveYourSecurity.geolocalization.description"),
      icon: <NoGeolocalizationSvg />,
    },
    {
      title: t("improveYourSecurity.maskMSI.title"),
      description: t("improveYourSecurity.maskMSI.description"),
      icon: <MSIMask />,
    },
    {
      title: t("improveYourSecurity.providerPrivateRed.title"),
      description: t("improveYourSecurity.providerPrivateRed.description"),
      icon: <RedProviderSvg />,
    },
    {
      title: t("improveYourSecurity.withOutNumber.title"),
      description: t("improveYourSecurity.withOutNumber.description"),
      icon: <WithOutNumberSvg />,
    },
  ];

  const standardCards = [
    {
      title: t("improveYourSecurity.globalCoverage.title"),
      description: t("improveYourSecurity.globalCoverage.description"),
      icon: <GlobalCoverage />,
    },
    {
      title: t("improveYourSecurity.subtituteNumber.title"),
      description: t("improveYourSecurity.subtituteNumber.description"),
      icon: <SubstituteNumberSvg />,
    },
    {
      title: t("improveYourSecurity.voiceFilter.title"),
      description: t("improveYourSecurity.voiceFilter.description"),
      icon: <VoiceFilterSvg />,
    },
    {
      title: t("improveYourSecurity.callback.title"),
      description: t("improveYourSecurity.callback.description"),
      icon: <CallbackSvg />,
    },
  ];

  return (
    <div className="space-y-20">
      <SectionWrapper>
        <ListOfCardsSim items={simCards} />
      </SectionWrapper>

      <div className="w-full bg-black">
        {/* Sólo este SectionWrapper interna limita el contenido */}
        <div className="py-20">
          <SectionWrapper>
            <ListOfCardsStandard items={standardCards} />
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
};
export default FeaturesListBlack;
