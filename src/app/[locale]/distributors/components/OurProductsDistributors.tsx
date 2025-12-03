import { useTranslations } from "next-intl";
import React from "react";
import Image from "next/image";
import SectionWrapper from "@/shared/components/SectionWrapper";
import { useRouter } from "@/i18n/routing";

const OurProductsDistributors = () => {
  const t = useTranslations("DistributorsPage.ourProducts");

  const distributors = [
    {
      id: 1,
      title: t("cards.card1"),
      imageSrc: "/images/distributors/encrypted-sim-distributors.png",
      altText: "Phones Distributors",
    },
    {
      id: 2,
      title: t("cards.card2"),
      imageSrc: "/images/distributors/apps-distributors.png",
      altText: "Sim Distributors",
    },
    {
      id: 3,
      title: t("cards.card3"),
      imageSrc: "/images/distributors/phones-distributors.png",
      altText: "App Distributors",
    },
  ];

  const router = useRouter();

  const redirectMap: Record<number, string> = {
    1: "40",
    2: "38",
    3: "35",
  };

  const handleRedirect = (id: number) => {
  const target = redirectMap[id];
  if (!target) return;

  // 🔥 Navega al home con el tab seleccionado y ancla a la sección
  router.push(`/?selectedOption=${target}#buysimappsection` as any);
};


  return (
    <div className="w-full bg-gradient-to-r from-[#00372B] via-black to-[#022530] py-10 md:py-16">
      <SectionWrapper>
        {/* Título flotante */}
        <div className="flex min-h-[100px] items-center justify-center p-4">
          <div className="relative inline-block">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFFF] to-[#0080FF] opacity-75 blur-sm rounded-full" />
            <div className="relative px-6 py-2 bg-[#0E0E0E] rounded-full leading-none border border-transparent bg-clip-padding">
              <span className="bg-gradient-to-r from-[#00FFFF] to-[#0080FF] bg-clip-text text-transparent font-sans text-sm font-medium">
                {t("title")}
              </span>
            </div>
          </div>
        </div>

        {/* Subtítulo */}
        <div className="w-full flex justify-center">
          <h1 className="text-white text-2xl md:text-3xl text-center font-bold max-w-xl mb-12">
            {t("subtitle")}
          </h1>
        </div>

        {/* Grid: 3 columnas SIEMPRE */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
            {distributors.map((distributor) => (
              <div
                key={distributor.id}
                onClick={() => handleRedirect(distributor.id)}
                className="bg-[#0E0E0E] relative rounded-2xl shadow-lg text-white font-bold text-center flex flex-col px-4 py-6 justify-center items-center min-h-[320px] cursor-pointer hover:opacity-80 transition"
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
                <div className="absolute inset-0 flex justify-center items-end">
                  <p className="px-2 py-1 text-xs mb-4 text-[#35CDFB] font-normal">
                    {t("seeProducts")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default OurProductsDistributors;
