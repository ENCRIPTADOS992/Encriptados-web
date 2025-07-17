"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const features = [
  { image: "/images/apps/cryptcom/chat.png" },
  { image: "/images/apps/cryptcom/chat-cifrado.png" },
  { image: "/images/apps/cryptcom/mensajeria.png" },
  { image: "/images/apps/cryptcom/chat-enmascarado.png" },
];

const CryptcomFeatures = () => {
  const t = useTranslations("CryptcomPage.features");

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

    <div className="grid gap-6
    sm:grid-cols-2
    md:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-3
    md:flex gap-4">
      {featureTexts.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-white rounded-2xl p-6"
        >
          <Image
            src={features[index].image}
            alt={feature.title}
            width={170}
            height={170}
            className="mb-4"
          />
          <div className="w-full">
            <h3 className="font-bold text-[#0F172A] text-lg mb-2">{feature.title}</h3>
            <p className="text-sm text-[#101010B3] font-light text-justify">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default CryptcomFeatures;