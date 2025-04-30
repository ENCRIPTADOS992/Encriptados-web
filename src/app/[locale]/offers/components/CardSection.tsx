import ListOfCards from "@/shared/components/ListOfCards/ListOfCards";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import MSIChangeOffer from "../icons/MSIChangeOffer";
import SubstituteOffer from "../icons/SubstituteOffer";
import PlansOffer from "../icons/PlansOffer";
import GlobalOffer from "../icons/GlobalOffer";
import MaxSecurityOffer from "../icons/MaxSecurityOffer";
import MultipleDeviceOffer from "../icons/MultipleDeviceOffer";

const CardSection = () => {
  const offersImage = "/images/offers/sim.png";

  const t = useTranslations("OffersPage");

  return (
    <div className="mt-44">
      {/* Imagen principal */}
      <div className="flex items-center justify-center w-full">
        <Image
          src={offersImage}
          alt="Sim Offers"
          width={500}
          height={300}
          className="rounded-lg"
        />
      </div>

      {/* Título */}
      <div className="flex items-center justify-center mt-8">
        <div className="w-full md:w-6/12 p-2">
          <h1 className="text-center text-white font-bold text-xl sm:text-2xl md:text-4xl">
            {t("discoverSimTitle")}
          </h1>
        </div>
      </div>

      {/* Descripción */}
      <div className="flex items-center justify-center mt-6">
        <div className="w-full md:w-6/12 p-2">
          <p className="text-center text-white text-sm sm:text-base md:text-lg">
            {t("discoverSimDescription")}
          </p>
        </div>
      </div>

      {/* Sección de tarjetas */}
      <div className="flex items-center justify-center mt-14">
        <div className="w-full mb-14 md:w-9/12 lg:w-7/12 xl:w-6/12 px-2">
          <ListOfCards
            centered
            titleColor="white"
            descriptionColor="white"
            columns={3}
            bgColorCard="#141414"
            items={[
              {
                title: t("cards.card1.title"),
                description: t("cards.card1.description"),
                icon: <MSIChangeOffer />,
              },
              {
                title: t("cards.card2.title"),
                description: t("cards.card2.description"),
                icon: <SubstituteOffer />,
              },
              {
                title: t("cards.card3.title"),
                description: t("cards.card3.description"),
                icon: <PlansOffer />,
              },
              {
                title: t("cards.card4.title"),
                description: t("cards.card4.description"),
                icon: <GlobalOffer />,
              },
              {
                title: t("cards.card5.title"),
                description: t("cards.card5.description"),
                icon: <MaxSecurityOffer />,
              },
              {
                title: t("cards.card6.title"),
                description: t("cards.card6.description"),
                icon: <MultipleDeviceOffer />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSection;
