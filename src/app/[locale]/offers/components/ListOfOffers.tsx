"use client";

import React from "react";

import FiltersOffers from "./FiltersOffers";

import CharacteristicDatasSvg from "/public/images/encrypted-sim/icons/characteristic-data.svg";
import CharacteristicSpeedSvg from "/public/images/encrypted-sim/icons/characteristic-speed.svg";
import CharacteristicAppSvg from "/public/images/encrypted-sim/icons/characteristic-app.svg";
import LogoSvg1 from "/public/images/encrypted-sim/icons/encriptados_logo.svg";
import CharacteristicAnonimitySvg from "/public/images/encrypted-sim/icons/characteristic-anonymity.svg";
import CharacteristicReplaceSvg from "/public/images/encrypted-sim/icons/characteristic-replace.svg";
import CharacteristicVoiceSvg from "/public/images/encrypted-sim/icons/characteristic-voice.svg";
import EncryptedSimData from "/public/images/encrypted-sim/Encrypted_sim_card.png";
import EncryptedSimMinutes from "/public/images/encrypted-sim/Encrypted_sim_card_minutes.png";
import IcomMinutesSvg from "/public/images/encrypted-sim/icons/icon-minutes.svg";
import IconDataSvg from "/public/images/encrypted-sim/icons/icon-data.svg";
import { useTranslations } from "next-intl";
import CardSim from "@/app/[locale]/encrypted-sim/components/CardSim";

const ListOfOffers = () => {
  const o = useTranslations("OffersPage");

  const t = useTranslations("EncryptedSimPage");

  const commonFeatures = [
    {
      icon: CharacteristicDatasSvg,
      alt: t("commonFeatures.dataMobile"),
      description: t("commonFeatures.dataMobile"),
    },
    {
      icon: CharacteristicSpeedSvg,
      alt: t("commonFeatures.speed"),
      description: t("commonFeatures.speed"),
    },
    {
      icon: CharacteristicAppSvg,
      alt: t("commonFeatures.appAvailable"),
      description: t("commonFeatures.appAvailable"),
    },
  ];

  const cardData = [
    {
      logoSrc: LogoSvg1,
      title: t("products.data.title"),
      description: t("products.data.description"),
      features: commonFeatures,
      productImage: EncryptedSimData,
      featuresCardSim: [
        t("products.data.featuresCardSim.0"),
        t("products.data.featuresCardSim.1"),
        t("products.data.featuresCardSim.2"),
        t("products.data.featuresCardSim.3"),
      ],
      priceRange: t("products.data.priceRange"),
      headerIcon: IconDataSvg,
      headerTitle: t("products.data.headerTitle"),
    },
    {
      logoSrc: LogoSvg1,
      title: t("products.minutes.title"),
      description: t("products.minutes.description"),
      features: [
        {
          icon: CharacteristicAnonimitySvg,
          alt: t("commonFeatures.privacyAnonymity"),
          description: t("commonFeatures.privacyAnonymity"),
        },
        {
          icon: CharacteristicReplaceSvg,
          alt: t("commonFeatures.substituteNumber"),
          description: t("commonFeatures.substituteNumber"),
        },
        {
          icon: CharacteristicVoiceSvg,
          alt: t("commonFeatures.callback"),
          description: t("commonFeatures.callback"),
        },
        {
          icon: CharacteristicVoiceSvg,
          alt: t("commonFeatures.voiceFilters"),
          description: t("commonFeatures.voiceFilters"),
        },
        {
          icon: CharacteristicAppSvg,
          alt: t("commonFeatures.appAvailable"),
          description: t("commonFeatures.appAvailable"),
        },
      ],
      productImage: EncryptedSimMinutes,
      featuresCardSim: [
        t("products.minutes.featuresCardSim.0"),
        t("products.minutes.featuresCardSim.1"),
        t("products.minutes.featuresCardSim.2"),
        t("products.minutes.featuresCardSim.3"),
        t("products.minutes.featuresCardSim.4"),
      ],
      priceRange: t("products.minutes.priceRange"),
      headerIcon: IcomMinutesSvg,
      headerTitle: t("products.minutes.headerTitle"),
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mx-auto text-center">
      <h1 className="text-white font-bold mb-4 text-xl sm:text-2xl md:text-3xl ">
        {o("exclusiveOffersTitle")}
      </h1>
      <div className="w-full sm:w-1/2 md:w-5/12">
        <FiltersOffers
          items={[
            { label: o("menu.sims"), value: "sims" },
            { label: o("menu.apps"), value: "apps" },
            { label: o("menu.system"), value: "system" },
          ]}
          name={"currentoffer"}
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-black mt-9">
          {cardData.map((card, index) => (
            <CardSim
              key={index}
              productImage={card.productImage}
              priceRange={card.priceRange}
              headerIcon={card.headerIcon}
              headerTitle={card.headerTitle}
              advantages={[
                {
                  content: "Prueba ventajas",
                  title: "Prueba ventajas",
                  image: "",
                  id: 2,
                },
              ]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListOfOffers;
