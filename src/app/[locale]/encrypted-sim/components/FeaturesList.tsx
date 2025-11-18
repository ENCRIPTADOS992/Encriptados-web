"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

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

import ListOfCards from "@/shared/components/ListOfCards/ListOfCards";

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-11 h-11 flex items-center justify-center">
    <Image
      src="/images/encrypted-sim/icons/Rectangle%205790.png"
      alt=""
      fill
      className="object-contain"
    />
    <div
      className="
        relative z-10 flex items-center justify-center
        w-11 h-11
        [&>svg]:w-7 [&>svg]:h-7
      "
    >
      {children}
    </div>
  </div>
);


const FeaturesList = () => {
  const t = useTranslations("EncryptedSimPage");

  return (
    <ListOfCards
      items={[
        {
          title: t("improveYourSecurity.untraceable.title"),
          description: t("improveYourSecurity.untraceable.description"),
          icon: (
            <IconWrapper>
              <AnonimateSvg />
            </IconWrapper>
          ),
        },
        {
          title: t("improveYourSecurity.anonymity.title"),
          description: t("improveYourSecurity.anonymity.description"),
          icon: (
            <IconWrapper>
              <AnonimateSvg />
            </IconWrapper>
          ),
        },
        {
          title: t("improveYourSecurity.changeMSI.title"),
          description: t("improveYourSecurity.changeMSI.description"),
          icon: (
            <IconWrapper>
              <ImsiChangeSvg />
            </IconWrapper>
          ),
        },
        {
          title: t("improveYourSecurity.subtituteNumber.title"),
          description: t("improveYourSecurity.subtituteNumber.description"),
          icon: (
            <IconWrapper>
              <SubstituteNumberSvg />
            </IconWrapper>
          ),
        },
        {
          title: t("improveYourSecurity.voiceFilter.title"),
          description: t("improveYourSecurity.voiceFilter.description"),
          icon: (
            <IconWrapper>
              <VoiceFilterSvg />
            </IconWrapper>
          ),
        },
        {
          title: t("improveYourSecurity.callback.title"),
          description: t("improveYourSecurity.callback.description"),
          icon: (
            <IconWrapper>
              <CallbackSvg />
            </IconWrapper>
          ),
        },
        {
          title: t("improveYourSecurity.plans.title"),
          description: t("improveYourSecurity.plans.description"),
          icon: (
            <IconWrapper>
              <PlansSvg />
            </IconWrapper>
          ),
        },
        {
          title: t("improveYourSecurity.geolocalization.title"),
          description: t("improveYourSecurity.geolocalization.description"),
          icon: (
            <IconWrapper>
              <NoGeolocalizationSvg />
            </IconWrapper>
          ),
        },
        {
          title: t("improveYourSecurity.globalCoverage.title"),
          description: t("improveYourSecurity.globalCoverage.description"),
          icon: (
            <IconWrapper>
              <GlobalCoverage />
            </IconWrapper>
          ),
        },
        {
          title: t("improveYourSecurity.maskMSI.title"),
          description: t("improveYourSecurity.maskMSI.description"),
          icon: (
            <IconWrapper>
              <MSIMask />
            </IconWrapper>
          ),
        },
        {
          title: t("improveYourSecurity.providerPrivateRed.title"),
          description: t("improveYourSecurity.providerPrivateRed.description"),
          icon: (
            <IconWrapper>
              <RedProviderSvg />
            </IconWrapper>
          ),
        },
        {
          title: t("improveYourSecurity.withOutNumber.title"),
          description: t("improveYourSecurity.withOutNumber.description"),
          icon: (
            <IconWrapper>
              <WithOutNumberSvg />
            </IconWrapper>
          ),
        },
      ]}
    />
  );
};

export default FeaturesList;
