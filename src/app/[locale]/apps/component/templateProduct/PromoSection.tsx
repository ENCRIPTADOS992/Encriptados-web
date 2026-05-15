"use client";

import { PromoCard } from "./PromoCard";
import { useLocale, useTranslations } from "next-intl";

export function PromoSection() {
  const locale = useLocale();
  const t = useTranslations("OurProductsPage.simCards");

  const promoCards = [
    {
      title: t("encrypted.title"),
      description: t("encrypted.description"),
      buttonText: t("moreInfo"),
      buttonHref: `/${locale}/sim-encriptada`,
      backgroundImage: "/images/home/fondo-encriptados.webp",
      backgroundAlt: t("encrypted.title"),
    },
    {
      title: t("tim.title"),
      description: t("tim.description"),
      buttonText: t("moreInfo"),
      buttonHref: `/${locale}/tim-sim`,
      backgroundImage: "/images/home/fondo-tim.webp",
      backgroundAlt: t("tim.title"),
    },
  ];

  return (
    <section className="w-full py-2 px-4 sm:px-6 lg:px-0">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-5">
        {promoCards.map((card) => (
          <PromoCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
