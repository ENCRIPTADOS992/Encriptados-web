import React from "react";
import AmbassadorCardPromotor from "./AmbassadorCardPromotor";
import AmbassadorCardDistributor from "./AmbassadorCardDistributor";
import { useTranslations } from "next-intl";

const AmbassadorCards = () => {
  const Distributor = "/images/ambassadors/ambassor-distributor.webp";
  const Promotor = "/images/ambassadors/ambassor-promotor.webp";
  const BackgroundSpiral = "/images/ambassadors/spiral.webp";

  const t = useTranslations();

  return (
    <div
      className="relative w-full overflow-visible py-6 md:py-8 lg:py-10"
    >
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 justify-items-center px-4 sm:px-6 lg:px-0 mt-6 z-10">
        <AmbassadorCardPromotor
          company={t("AmbassadorsPage.partnerCards.promotor.encryptedTag")}
          title={t("AmbassadorsPage.partnerCards.promotor.promotorTitle")}
          description={t("AmbassadorsPage.partnerCards.promotor.description")}
          image={Promotor}
          buttonText={t("AmbassadorsPage.partnerCards.promotor.sendRequest")}
          benefits={[
            t("AmbassadorsPage.partnerCards.promotor.benefit1"),
            t("AmbassadorsPage.partnerCards.promotor.benefit2"),
            t("AmbassadorsPage.partnerCards.promotor.benefit3"),
          ]}
        />

        <AmbassadorCardDistributor
          company={t("AmbassadorsPage.partnerCards.distributor.encryptedTag")}
          title={t("AmbassadorsPage.partnerCards.distributor.distributorTitle")}
          description={t(
            "AmbassadorsPage.partnerCards.distributor.description"
          )}
          buttonText={t("AmbassadorsPage.partnerCards.distributor.sendRequest")}
          image={Distributor}
          benefits={[
            t("AmbassadorsPage.partnerCards.distributor.benefit1"),
            t("AmbassadorsPage.partnerCards.distributor.benefit2"),
            t("AmbassadorsPage.partnerCards.promotor.benefit3"),
          ]}
        />
      </div>
    </div>
  );
};

export default AmbassadorCards;
