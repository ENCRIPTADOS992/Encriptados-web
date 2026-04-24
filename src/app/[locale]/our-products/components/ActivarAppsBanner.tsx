"use client";

import React from "react";
import { useTranslations } from "next-intl";
import ProductBannerSection, { BannerIcon } from "./ProductBannerSection";

const ICONS: BannerIcon[] = [
  {
    src: "/images/components/whatsapp.svg",
    alt: "WhatsApp",
    width: 44,
    height: 44,
  },
  {
    src: "/images/components/telegram.svg",
    alt: "Telegram",
    width: 44,
    height: 44,
  },
  {
    src: "/images/components/logo_signal.svg",
    alt: "Signal",
    width: 44,
    height: 44,
  },
];

/**
 * "Activar Apps" banner.
 * Thin wrapper around ProductBannerSection with the circuit-board background
 * and the teal-to-transparent gradient supplied by design.
 */
const ActivarAppsBanner: React.FC = () => {
  const t = useTranslations("OurProductsPage.activarApps");

  return (
    <ProductBannerSection
      backgroundImage="/images/our-products/activar-apps-bg.webp"
      gradient="linear-gradient(90deg, rgba(0, 19, 25, 0.9) 35%, rgba(0, 18, 24, 0.2) 100%)"
      badge={t("badge")}
      badgeBgClass="bg-[#10B4E7]"
      title={t("title")}
      description={t("description")}
      icons={ICONS}
      categoryId={371}
      productNameFilter="activar"
    />
  );
};

export default ActivarAppsBanner;
