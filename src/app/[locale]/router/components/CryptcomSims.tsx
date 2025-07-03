"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const CryptcomSims = () => {
  const t = useTranslations("CryptcomPage.simOptionsCryptcom");
  const rawCards = t.raw("cards");

  console.log("cards raw: ", t.raw("cards"));
  console.log("translations keys: ", Object.keys(t.raw("")));

  if (!Array.isArray(rawCards)) {
    throw new Error("Cards translation is not an array");
  }

  const cards = rawCards as {
    title: string;
    description: string;
    buttonText: string;
    secondButtonText?: string;
  }[];

  const images = [
    "/images/apps/cryptcom/SIM-Card-encriptada.png",
    "/images/apps/cryptcom/E-SIM-Card-encriptada.png"
  ];

  return (
    <section className="bg-[#F7FAFC] py-10 px-4 lg:px-20 lg:min-h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`rounded-3xl lg:p-6 p-3 lg:min-h-[300px] min-h-[216px] flex flex-col justify-center ${
              index === 0
                ? "bg-[radial-gradient(circle_at_left,_rgba(0,0,0,1)_0%,_rgba(0,74,96,1)_100%)]"
                : "bg-[linear-gradient(90deg,_rgba(53,205,251,1)_0%,_rgba(168,235,255,1)_100%)]"
            }`}
          >
            <div className="grid grid-cols-2 items-center h-full lg:gap-4 gap-0">
              <div className="flex flex-col justify-center gap-4">
                <h3 className={`font-bold text-lg ${index === 0 ? "text-white" : "text-black"}`}>
                  {card.title}
                </h3>
                <p className={`text-sm ${index === 0 ? "text-white" : "text-black"}`}>
                  {card.description}
                </p>
                <div className="flex flex-col gap-2 mt-2">
                  <button className="bg-white text-black py-2 px-6 rounded-full font-semibold text-sm hover:opacity-90 transition w-[140px] h-[38px]">
                    {card.buttonText}
                  </button>
                  {card.secondButtonText && (
                    <button className={`text-start text-sm ${index === 0 ? "text-white" : "text-black"} hover:opacity-80 transition`}>
                      {card.secondButtonText}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-center items-center">
                <div className="relative w-[134px] h-[117px] lg:w-[274px] lg:h-[239px]">
                  <Image
                    src={images[index]}
                    alt={card.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 134px, 274px"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CryptcomSims;