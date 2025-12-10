import { useTranslations } from "next-intl";
import React from "react";
import Image from "next/image";
import SectionWrapper from "@/shared/components/SectionWrapper";
import { Link, useRouter } from "@/i18n/routing";

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
    <div className="w-full bg-black relative overflow-hidden py-10 md:py-16">
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: 380,
          height: 260,
          left: "30%",
          top: "55%",
          transform: "translate(-50%, -50%)",
          background: "#01FFC2",
          opacity: 0.4,
          filter: "blur(140px)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: 380,
          height: 260,
          left: "70%",
          top: "55%",
          transform: "translate(-50%, -50%)",
          background: "#10B4E7",
          opacity: 0.5,
          filter: "blur(140px)",
          borderRadius: "50%",
        }}
      />
      <SectionWrapper className="relative z-10">
        {/* Título flotante */}
        <div className="flex min-h-[100px] items-center justify-center p-4">
          <div
            className="inline-block px-6 py-2 rounded-full leading-none"
            style={{
              background:
                "linear-gradient(#0E0E0E,#0E0E0E) padding-box, linear-gradient(90deg,#00FFB2 0%, #35CDFB 100%) border-box",
              border: "2px solid transparent",
            }}
          >
            <span
              className="font-sans text-sm font-medium"
              style={{
                background: "linear-gradient(90deg,#00FFB2 0%, #35CDFB 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {t("title")}
            </span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {distributors.map((distributor) => (
              <div
                key={distributor.id}
                className="relative rounded-[28px] shadow-lg text-white font-bold text-center flex flex-col px-6 py-8 md:px-8 md:py-10 justify-between items-center min-h-[360px] bg-gradient-to-b from-[#111111] to-[#0E0E0E]"
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
                <div className="w-full flex justify-center items-end mt-6">
                  <Link
                    href={`/?selectedOption=${redirectMap[distributor.id]}#buysimappsection` as any}
                    className="px-5 py-2 rounded-full text-xs font-normal text-white bg-[#1CB9EC] hover:bg-[#12b4e7] shadow-md"
                  >
                    {t("seeProducts")}
                  </Link>
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
