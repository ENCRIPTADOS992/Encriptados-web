import { useTranslations } from "next-intl";
import React from "react";
import Image from "next/image";

const OurProductsDistributors = () => {
  const t = useTranslations("DistributorsPage.ourProducts");

  const distributors = [
    {
      id: 1,
      title: t("cards.card1"),
      imageSrc: "/images/distributors/phones-distributors.png",
      altText: "Phones Distributors",
    },
    {
      id: 2,
      title: t("cards.card2"),
      imageSrc: "/images/distributors/encrypted-sim-distributors.png",
      altText: "Sim Distributors",
    },
    {
      id: 3,
      title: t("cards.card3"),
      imageSrc: "/images/distributors/apps-distributors.png",
      altText: "App Distributors",
    },
  ];

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#00372B] via-black to-[#022530] flex flex-col justify-center items-center py-10 md:py-16">
        <div className="flex min-h-[100px] items-center justify-center p-4">
          <div className="relative inline-block">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFFF] to-[#0080FF] opacity-75 blur-sm rounded-full" />
            <button className="relative px-6 py-2 bg-[#0E0E0E] rounded-full leading-none border border-transparent bg-clip-padding">
              <span className="bg-gradient-to-r from-[#00FFFF] to-[#0080FF] bg-clip-text text-transparent font-sans text-sm font-medium">
                {t("title")}
              </span>
            </button>
          </div>
        </div>

        <div className="">
          <h1 className="text-white text-2xl md:text-3xl text-center font-bold">
            {t("subtitle")}
          </h1>
        </div>
      </div>
      <div className="w-full bg-gradient-to-r from-[#00372B] via-black to-[#022530] flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 mb-20">
          {distributors.map((distributor) => (
            <div
              key={distributor.id}
              className="bg-[#0E0E0E] relative rounded-lg shadow-lg text-white font-bold text-center flex flex-col px-4 py-6 justify-center items-center"
            >
              <h1 className="mt-4 mb-4">{distributor.title}</h1>
              <div className="flex justify-center items-center">
                <Image
                  width={180}
                  height={180}
                  src={distributor.imageSrc}
                  alt={distributor.altText}
                  className="rounded-lg translate-y-6"
                />
              </div>
              <div className="absolute inset-0 flex justify-center items-center">
                <p className="px-2 py-1 text-xs  translate-y-32 text-[#35CDFB]">
                  {t("seeProducts")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurProductsDistributors;
