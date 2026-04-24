"use client";

import React from "react";
import { useTranslations } from "next-intl";
import ProductBannerSection from "./ProductBannerSection";

/**
 * Silent Phone / Silent Circle banner.
 * Thin wrapper around ProductBannerSection.
 */
const SilentCircleBanner: React.FC = () => {
  const t = useTranslations("OurProductsPage.silentCircle");

  return (
    <ProductBannerSection
      backgroundImage="/images/our-products/aef4b25c090984d368c3328bbcfd54545ac75eef.png"
      gradient="linear-gradient(90deg, rgba(0,0,0,0.90) 38%, rgba(0,0,0,0.08) 100%)"
      badge={t("badge")}
      badgeBgClass="bg-[#CB0808]"
      title={t("title")}
      description={t("description")}
      categoryId={38}
      productNameFilter="silent phone"
    />
  );
};

export default SilentCircleBanner;


