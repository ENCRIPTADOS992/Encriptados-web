import React from "react";
import HowDoesFastDeliveryCard from "./HowDoesFastDeliveryCard";
import { useTranslations } from "next-intl";
import PhoneContact from "../../../../../public/images/fastdeliverypage/phone.png";
import SelectedProduct from "../../../../../public/images/fastdeliverypage/selectproduct.png";
import Telegram from "../../../../../public/images/fastdeliverypage/contacttelegram.png";

const HowDoesFastDelivery = () => {
  const t = useTranslations("DeliveryPage.howDoesFastDeliveryOptions");
  const t2 = useTranslations("DeliveryPage");

  const cards = [
    {
      title: t("deliveyPoint.title"),
      description: t("deliveyPoint.description"),
      image: SelectedProduct,
      imagePosition: "bottom" as const,
    },
    {
      title: t("contactUsOnTelegram.title"),
      description: t("contactUsOnTelegram.description"),
      image: Telegram,
      imagePosition: "top" as const,
    },
    {
      title: t("pickUpYourPhone.title"),
      description: t("pickUpYourPhone.description"),
      image: PhoneContact,
      imagePosition: "bottom" as const,
    },
  ];

  return (
    <div className="flex justify-center mt-10">
      <div className="relative w-full justify-center rounded-2xl items-center">
        <div className="absolute inset-x-0 top-0 h-[750px] z-0">
          <div className="h-[400px] bg-cyan-black-gradient rounded-2xl">
            <div className="flex justify-center">
              <h1 className="text-lg md:text-4xl text-center p-9 font-bold text-white">
                {t2("howDoesFastDeliveryTitle")}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex justify-center relative z-10">
          <div className="flex justify-center w-11/12 mt-9 sm:w-full md:w-11/12 lg:w-11/12 xl:w-11/12 2xl:w-7/12">
            <div className="flex flex-col mt-24 lg:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              {cards.map((card, index) => (
                <div className="flex-1" key={index}>
                  <HowDoesFastDeliveryCard
                    imagePosition={card.imagePosition}
                    title={card.title}
                    description={card.description}
                    image={card.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowDoesFastDelivery;
