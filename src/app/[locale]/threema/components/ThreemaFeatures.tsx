// ThreemaFeatures.tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const features = [
  { image: "/images/threema/chat-privado.png" },
  { image: "/images/threema/confidencialidad.png" },
  { image: "/images/threema/chat-grupal.png" },
  { image: "/images/threema/funciones-acuerdo.png" },
];

const ThreemaFeatures = () => {
  const t = useTranslations("ThreemaPage.features");

  const featureTexts = [
    {
      title: t("chat.title"),
      description: t("chat.description"),
    },
    {
      title: t("confidentiality.title"),
      description: t("confidentiality.description"),
    },
    {
      title: t("groupChat.title"),
      description: t("groupChat.description"),
    },
    {
      title: t("agreementFeatures.title"),
      description: t("agreementFeatures.description"),
    },
  ];

  return (
    <section className="bg-[#F8FDFF] py-10 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center font-bold text-xl lg:text-2xl text-[#0F172A] mb-10 lg:mt-10 lg:text-start">
          {t("sectionTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {featureTexts.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center lg:px-5">
              <div className="bg-white rounded-2xl p-4 w-full flex justify-center items-center h-[300px]">
                <Image
                  src={features[index].image}
                  alt={feature.title}
                  width={180}
                  height={300}
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-[#0F172A] text-lg mt-6 mb-2">{feature.title}</h3>
              <p className="text-sm text-[#101010] font-light leading-none text-justify">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreemaFeatures;
