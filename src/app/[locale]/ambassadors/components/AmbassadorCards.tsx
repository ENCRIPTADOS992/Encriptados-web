import React from "react";
import AmbassadorCardPromotor from "./AmbassadorCardPromotor";
import AmbassadorCardDistributor from "./AmbassadorCardDistributor";
import { useTranslations } from "next-intl";

const AmbassadorCards = () => {
  const Distributor = "/images/ambassadors/ambassor-distributor.png";
  const Promotor = "/images/ambassadors/ambassor-promotor.png";
  const BackgroundSpiral = "/images/ambassadors/spiral.png";

  const t = useTranslations();

  return (
    <div
      className="relative flex justify-center items-center bg-cover bg-center w-full"
      style={{ backgroundImage: `url(${BackgroundSpiral})` }}
    >
      <div className="flex flex-wrap gap-5 mt-4 justify-center z-10 px-4">
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
