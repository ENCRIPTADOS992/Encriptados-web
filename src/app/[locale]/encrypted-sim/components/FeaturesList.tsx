"use client";

import React from "react";
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

// Contenedor del ícono con fondo #E6F5F9, 64x64, border-radius 14px
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    className="w-16 h-16 rounded-[14px] flex items-center justify-center"
    style={{ backgroundColor: "#E6F5F9" }}
  >
    <div className="w-7 h-7 flex items-center justify-center text-[#1C1B1F] [&>svg]:w-full [&>svg]:h-full">
      {children}
    </div>
  </div>
);

// Tarjeta de característica individual
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <article
    className="flex flex-col gap-4 bg-white rounded-2xl"
    style={{
      padding: "34px 20px",
      minHeight: "280px",
    }}
  >
    {icon}
    <h3 className="text-[18px] leading-[1.3] font-bold text-[#1C1B1F]">
      {title}
    </h3>
    <p className="text-[14px] leading-[1.5] text-[#6E6E6E]">
      {description}
    </p>
  </article>
);

interface FeaturesListProps {
  variant?: "encrypted" | "tim";
}

const FeaturesList = ({ variant = "encrypted" }: FeaturesListProps) => {
  const t = useTranslations("EncryptedSimPage");

  // Características completas para SIM Encriptada
  const allFeatures = [
    {
      title: t("improveYourSecurity.untraceable.title"),
      description: t("improveYourSecurity.untraceable.description"),
      icon: <IconWrapper><AnonimateSvg /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.anonymity.title"),
      description: t("improveYourSecurity.anonymity.description"),
      icon: <IconWrapper><AnonimateSvg /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.changeMSI.title"),
      description: t("improveYourSecurity.changeMSI.description"),
      icon: <IconWrapper><ImsiChangeSvg /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.subtituteNumber.title"),
      description: t("improveYourSecurity.subtituteNumber.description"),
      icon: <IconWrapper><SubstituteNumberSvg /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.voiceFilter.title"),
      description: t("improveYourSecurity.voiceFilter.description"),
      icon: <IconWrapper><VoiceFilterSvg /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.callback.title"),
      description: t("improveYourSecurity.callback.description"),
      icon: <IconWrapper><CallbackSvg /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.plans.title"),
      description: t("improveYourSecurity.plans.description"),
      icon: <IconWrapper><PlansSvg /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.geolocalization.title"),
      description: t("improveYourSecurity.geolocalization.description"),
      icon: <IconWrapper><NoGeolocalizationSvg /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.globalCoverage.title"),
      description: t("improveYourSecurity.globalCoverage.description"),
      icon: <IconWrapper><GlobalCoverage /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.maskMSI.title"),
      description: t("improveYourSecurity.maskMSI.description"),
      icon: <IconWrapper><MSIMask /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.providerPrivateRed.title"),
      description: t("improveYourSecurity.providerPrivateRed.description"),
      icon: <IconWrapper><RedProviderSvg /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.withOutNumber.title"),
      description: t("improveYourSecurity.withOutNumber.description"),
      icon: <IconWrapper><WithOutNumberSvg /></IconWrapper>,
    },
  ];

  // Características reducidas para TIM (solo 4 beneficios)
  const timFeatures = [
    {
      title: t("improveYourSecurity.globalCoverage.title"),
      description: t("improveYourSecurity.globalCoverage.description"),
      icon: <IconWrapper><GlobalCoverage /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.subtituteNumber.title"),
      description: t("improveYourSecurity.subtituteNumber.description"),
      icon: <IconWrapper><SubstituteNumberSvg /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.voiceFilter.title"),
      description: t("improveYourSecurity.voiceFilter.description"),
      icon: <IconWrapper><VoiceFilterSvg /></IconWrapper>,
    },
    {
      title: t("improveYourSecurity.callbackTim.title"),
      description: t("improveYourSecurity.callbackTim.description"),
      icon: <IconWrapper><CallbackSvg /></IconWrapper>,
    },
  ];

  // Seleccionar features según variante
  const features = variant === "tim" ? timFeatures : allFeatures;

  // Títulos según variante
  const title = variant === "tim"
    ? t("improveYourSecurity.titleKnowBenefits")
    : t("improveYourSecurity.titleImproveYourSecurity");

  return (
    <div className="w-full bg-[#F4F8FA] py-12 md:py-16 px-4">
      <div className="w-full lg:max-w-6xl mx-auto">
        {/* Título */}
        <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.3] text-[#333333] text-center mb-12 md:mb-16">
          {title}
        </h2>

        {/* Grid de tarjetas */}
        <div className={`grid gap-3 md:gap-4 ${variant === "tim" ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesList;

