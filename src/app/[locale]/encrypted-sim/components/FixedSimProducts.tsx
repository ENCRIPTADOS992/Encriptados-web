"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
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

// Fallback images (se usan si la API no devuelve imagen)
import EncryptedSimDataFallback from "/public/images/encrypted-sim/Encrypted_sim_card.png";
import EncryptedSimMinutesFallback from "/public/images/encrypted-sim/Encrypted_sim_card_minutes.png";
import EncriptedEsimFallback from "/public/images/encrypted-sim/Encrypted_sim_card_eSIM.png";

import IconDataSvg from "/public/images/encrypted-sim/icons/icon-data.svg";
import IcomMinutesSvg from "/public/images/encrypted-sim/icons/icon-minutes.svg";
import IcomSimSvg from "/public/images/encrypted-sim/icons/icon-sim.svg";

import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { useEncryptedSimProducts, ENCRYPTED_SIM_PRODUCT_IDS, type EncryptedSimProduct } from "@/features/products/hooks/useEncryptedSimProducts";

import type { StaticImageData } from "next/image";

// Mapeo de imágenes fallback por tipo de producto
const FALLBACK_IMAGES: Record<string, StaticImageData> = {
  data: EncryptedSimDataFallback,
  minutes: EncryptedSimMinutesFallback,
  esim: EncriptedEsimFallback,
  esim_data: EncriptedEsimFallback,
  sim_fisica: EncryptedSimDataFallback,
};

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
  productImage: string | StaticImageData; // Ahora acepta string (URL de API) o StaticImageData
  featuresCardSim: string[];
  priceLabel: string;
  headerIcon: StaticImageData;
  headerTitle: string;
  apiProduct?: EncryptedSimProduct; // Datos del producto desde la API
}

const FixedSimProducts: React.FC = () => {
  const t = useTranslations("EncryptedSimPage");
  const locale = useLocale();

  const { openModal } = useModalPayment();
  
  // Obtener productos desde la API
  const { data: apiProducts } = useEncryptedSimProducts();

  const handleBuy = (id: number, variants?: { id: number; price: number; sku: string }[]) => {
    console.log(`🛒 Comprar clicado para ID=${id}`, { variants });
    // Si tiene variantes, pasar la primera como precio inicial
    const initialPrice = variants && variants.length > 0 ? variants[0].price : undefined;
    openModal({ 
      productid: id.toString(), 
      languageCode: locale, 
      initialPrice,
      // Pasar variantes para que el modal pueda mostrar selector
      variants: variants?.map(v => ({ id: v.id, price: v.price, sku: v.sku }))
    });
  };
  
  // Función helper para obtener imagen del producto desde API o fallback
  const getProductImage = (productId: number, type: string): string | StaticImageData => {
    const apiProduct = apiProducts?.find(p => p.id === productId);
    if (apiProduct?.image) {
      return apiProduct.image;
    }
    return FALLBACK_IMAGES[type] || EncryptedSimDataFallback;
  };
  
  // Función helper para obtener el rango de precios desde API
  const getPriceLabel = (productId: number, fallbackPrice: string): string => {
    const apiProduct = apiProducts?.find(p => p.id === productId);
    if (apiProduct) {
      // Usar el nuevo campo priceRange que ya viene formateado
      return apiProduct.priceRange;
    }
    return fallbackPrice;
  };
  
  // Función helper para obtener las variantes del producto
  const getProductVariants = (productId: number) => {
    const apiProduct = apiProducts?.find(p => p.id === productId);
    return apiProduct?.variants || [];
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

  // Características para SIM Física
  const commonFeaturesSim = [
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

  const cardData: FixedCard[] = [
    {
      id: ENCRYPTED_SIM_PRODUCT_IDS.DATA,
      logoSrc: LogoSvg1,
      title: t("products.data.title"),
      description: t("products.data.description"),
      features: commonFeaturesData,
      productImage: getProductImage(ENCRYPTED_SIM_PRODUCT_IDS.DATA, "data"),
      featuresCardSim: [
        t("products.data.featuresCardSim.0"),
        t("products.data.featuresCardSim.1"),
        t("products.data.featuresCardSim.2"),
        t("products.data.featuresCardSim.3"),
      ],
      priceLabel: getPriceLabel(ENCRYPTED_SIM_PRODUCT_IDS.DATA, t("products.data.priceRange")),
      headerIcon: IconDataSvg,
      headerTitle: t("products.data.headerTitle"),
      apiProduct: apiProducts?.find(p => p.id === ENCRYPTED_SIM_PRODUCT_IDS.DATA),
    },
    {
      id: ENCRYPTED_SIM_PRODUCT_IDS.MINUTES,
      logoSrc: LogoSvg1,
      title: t("products.minutes.title"),
      description: t("products.minutes.description"),
      features: commonFeaturesMinutes,
      productImage: getProductImage(ENCRYPTED_SIM_PRODUCT_IDS.MINUTES, "minutes"),
      featuresCardSim: [
        t("products.minutes.featuresCardSim.0"),
        t("products.minutes.featuresCardSim.1"),
        t("products.minutes.featuresCardSim.2"),
        t("products.minutes.featuresCardSim.3"),
        t("products.minutes.featuresCardSim.4"),
      ],
      priceLabel: getPriceLabel(ENCRYPTED_SIM_PRODUCT_IDS.MINUTES, t("products.minutes.priceRange")),
      headerIcon: IcomMinutesSvg,
      headerTitle: t("products.minutes.headerTitle"),
      apiProduct: apiProducts?.find(p => p.id === ENCRYPTED_SIM_PRODUCT_IDS.MINUTES),
    },
    {
      id: ENCRYPTED_SIM_PRODUCT_IDS.ESIM,
      logoSrc: LogoSvg1,
      title: t("products.esim.title"),
      description: t("products.esim.description"),
      features: commonFeaturesEsim,
      productImage: getProductImage(ENCRYPTED_SIM_PRODUCT_IDS.ESIM, "esim"),
      featuresCardSim: [
        t("products.esim.featuresCardSim.0"),
        t("products.esim.featuresCardSim.1"),
        t("products.esim.featuresCardSim.2"),
        t("products.esim.featuresCardSim.3"),
      ],
      priceLabel: getPriceLabel(ENCRYPTED_SIM_PRODUCT_IDS.ESIM, t("products.esim.priceRange")),
      headerIcon: IcomSimSvg,
      headerTitle: t("products.esim.headerTitle"),
      apiProduct: apiProducts?.find(p => p.id === ENCRYPTED_SIM_PRODUCT_IDS.ESIM),
    },
    {
      id: ENCRYPTED_SIM_PRODUCT_IDS.SIM_FISICA_ENCRYPTED,
      logoSrc: LogoSvg1,
      title: t("products.sim.title"),
      description: t("products.sim.description"),
      features: commonFeaturesSim,
      productImage: getProductImage(ENCRYPTED_SIM_PRODUCT_IDS.SIM_FISICA_ENCRYPTED, "sim_fisica"),
      featuresCardSim: [
        t("products.sim.featuresCardSim.0"),
        t("products.sim.featuresCardSim.1"),
        t("products.sim.featuresCardSim.2"),
        t("products.sim.featuresCardSim.3"),
      ],
      priceLabel: getPriceLabel(ENCRYPTED_SIM_PRODUCT_IDS.SIM_FISICA_ENCRYPTED, t("products.sim.priceRange")),
      headerIcon: IcomSimSvg,
      headerTitle: t("products.sim.headerTitle"),
      apiProduct: apiProducts?.find(p => p.id === ENCRYPTED_SIM_PRODUCT_IDS.SIM_FISICA_ENCRYPTED),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
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
            sm:flex-row
            my-0
            rounded-3xl
            sm:p-0 xs:p-0
            p-4
            pt-10 pb-10
            sm:py-0 xs:py-0
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
            onBuy={() => handleBuy(card.id, getProductVariants(card.id))}
          />
        </div>
      ))}
    </div>
  );
};

export default FixedSimProducts;
