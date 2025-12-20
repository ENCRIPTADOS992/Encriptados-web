"use client";

import React from "react";
import { useTranslations } from "next-intl";
import CardDescription from "./CardDescription";
import CardSim from "./CardSim";

import LogoSvg1 from "/public/images/encrypted-sim/icons/encriptados_logo.svg";
import CharacteristicDatasSvg from "/public/images/encrypted-sim/icons/characteristic-data.svg";
import CharacteristicSpeedSvg from "/public/images/encrypted-sim/icons/characteristic-speed.svg";
import CharacteristicAppSvg from "/public/images/encrypted-sim/icons/characteristic-app.svg";
import CharacteristicAnonimitySvg from "/public/images/encrypted-sim/icons/characteristic-anonymity.svg";
import CharacteristicReplaceSvg from "/public/images/encrypted-sim/icons/characteristic-replace.svg";
import CharacteristicVoiceSvg from "/public/images/encrypted-sim/icons/characteristic-voice.svg";
import CharacteristicComunicationsSvg from "/public/images/encrypted-sim/icons/characteristic-communications.svg";
import CharacteristicTopUpSvg from "/public/images/encrypted-sim/icons/characteristic-top-up.svg";

import EncryptedSimData from "/public/images/encrypted-sim/Encrypted_sim_card.png";
import EncryptedSimMinutes from "/public/images/encrypted-sim/Encrypted_sim_card_minutes.png";
import EncryptedSimImsi from "/public/images/encrypted-sim/Encrypted_sim_card_IMSI.png";
import EncriptedEsim from "/public/images/encrypted-sim/Encrypted_sim_card_eSIM.png";

import IconDataSvg from "/public/images/encrypted-sim/icons/icon-data.svg";
import IcomMinutesSvg from "/public/images/encrypted-sim/icons/icon-minutes.svg";
import IcomImsiSvg from "/public/images/encrypted-sim/icons/icon-imsi.svg";
import IcomSimSvg from "/public/images/encrypted-sim/icons/icon-sim.svg";

import { useModalPayment } from "@/providers/ModalPaymentProvider";

import type { StaticImageData } from "next/image";

interface FixedCard {
  id: number; 
  logoSrc: StaticImageData;
  title: string;
  description: string;
  features: {
    icon: StaticImageData;
    alt: string;
    description: string;
  }[];
  productImage: StaticImageData;
  featuresCardSim: string[];
  priceLabel: string;
  headerIcon: StaticImageData;
  headerTitle: string;
}

const FixedSimProducts: React.FC = () => {
  const t = useTranslations("EncryptedSimPage");

  const { openModal } = useModalPayment();

  const handleBuy = (id: number) => {
    console.log(`🛒 Comprar clicado para ID=${id}`);
    openModal({ productid: id.toString(), languageCode: "es" });
  };
  // Define aquí las 4 cards EXACTAS (datos, minutos, imsi, esim)
  const commonFeaturesData = [
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

  const commonFeaturesMinutes = [
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
  ];

  const commonFeaturesImsi = [
    {
      icon: CharacteristicAnonimitySvg,
      alt: t("commonFeatures.privacyAnonymity"),
      description: t("commonFeatures.privacyAnonymity"),
    },
    {
      icon: CharacteristicComunicationsSvg,
      alt: t("commonFeatures.encryptedCommunications"),
      description: t("commonFeatures.encryptedCommunications"),
    },
    {
      icon: CharacteristicReplaceSvg,
      alt: t("commonFeatures.replaceIMSI"),
      description: t("commonFeatures.replaceIMSI"),
    },
    {
      icon: CharacteristicAppSvg,
      alt: t("commonFeatures.appAvailable"),
      description: t("commonFeatures.appAvailable"),
    },
  ];

  const commonFeaturesEsim = [
    {
      icon: CharacteristicAnonimitySvg,
      alt: t("commonFeatures.privacyAnonymity"),
      description: t("commonFeatures.privacyAnonymity"),
    },
    {
      icon: CharacteristicTopUpSvg,
      alt: t("commonFeatures.unlimitedDataPlans"),
      description: t("commonFeatures.unlimitedDataPlans"),
    },
    {
      icon: CharacteristicComunicationsSvg,
      alt: t("commonFeatures.encryptedCommunications"),
      description: t("commonFeatures.encryptedCommunications"),
    },
    {
      icon: CharacteristicAppSvg,
      alt: t("commonFeatures.appAvailable"),
      description: t("commonFeatures.appAvailable"),
    },
  ];

  const cardData: FixedCard[] = [
    {
      id: 443,
      logoSrc: LogoSvg1,
      title: t("products.data.title"),
      description: t("products.data.description"),
      features: commonFeaturesData,
      productImage: EncryptedSimData,
      featuresCardSim: [
        t("products.data.featuresCardSim.0"),
        t("products.data.featuresCardSim.1"),
        t("products.data.featuresCardSim.2"),
        t("products.data.featuresCardSim.3"),
      ],
      priceLabel: t("products.data.priceRange"),
      headerIcon: IconDataSvg,
      headerTitle: t("products.data.headerTitle"),
    },
    {
      id: 446,
      logoSrc: LogoSvg1,
      title: t("products.minutes.title"),
      description: t("products.minutes.description"),
      features: commonFeaturesMinutes,
      productImage: EncryptedSimMinutes,
      featuresCardSim: [
        t("products.minutes.featuresCardSim.0"),
        t("products.minutes.featuresCardSim.1"),
        t("products.minutes.featuresCardSim.2"),
        t("products.minutes.featuresCardSim.3"),
        t("products.minutes.featuresCardSim.4"),
      ],
      priceLabel: t("products.minutes.priceRange"),
      headerIcon: IcomMinutesSvg,
      headerTitle: t("products.minutes.headerTitle"),
    },
    {
      id: 452,
      logoSrc: LogoSvg1,
      title: t("products.imsi.title"),
      description: t("products.imsi.description"),
      features: commonFeaturesImsi,
      productImage: EncryptedSimImsi,
      featuresCardSim: [
        t("products.imsi.featuresCardSim.0"),
        t("products.imsi.featuresCardSim.1"),
        t("products.imsi.featuresCardSim.2"),
        t("products.imsi.featuresCardSim.3"),
      ],
      priceLabel: t("products.imsi.priceRange"),
      headerIcon: IcomImsiSvg,
      headerTitle: t("products.imsi.headerTitle"),
    },
    {
      id: 449,
      logoSrc: LogoSvg1,
      title: t("products.esim.title"),
      description: t("products.esim.description"),
      features: commonFeaturesEsim,
      productImage: EncriptedEsim,
      featuresCardSim: [
        t("products.esim.featuresCardSim.0"),
        t("products.esim.featuresCardSim.1"),
        t("products.esim.featuresCardSim.2"),
        t("products.esim.featuresCardSim.3"),
      ],
      priceLabel: t("products.esim.priceRange"),
      headerIcon: IcomSimSvg,
      headerTitle: t("products.esim.headerTitle"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-5 w-full">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`
            bg-custom-linear
            sm:!bg-transparent
            shadow-lg
            sm:shadow-none
            gap-6
            flex flex-col
            xl:flex-row
            my-0
            rounded-3xl
            sm:p-0 xs:p-0
            p-4
            py-10 sm:py-0 xs:py-0
          `}
        >
          {/* IZQUIERDA: CardDescription */}
          <CardDescription
            logoSrc={card.logoSrc}
            title={card.title}
            description={card.description}
            features={card.features}
          />

          {/* DERECHA: CardSim */}
          <CardSim
            productImage={card.productImage}
            features={card.featuresCardSim}
            priceRange={card.priceLabel}
            headerIcon={card.headerIcon}
            headerTitle={card.headerTitle}
            onBuy={() => handleBuy(card.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default FixedSimProducts;
