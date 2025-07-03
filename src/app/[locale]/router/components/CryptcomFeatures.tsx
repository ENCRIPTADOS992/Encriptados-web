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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {featureTexts.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-start lg:px-5">
              <div className="bg-white rounded-2xl p-4 w-full flex justify-center items-center h-[300px]">
                <Image
                  src={features[index].image}
                  alt={feature.title}
                  width={180}
                  height={300}
                  className="object-contain"
                />
              </div>
							<div className="text-start">
								<h3 className="font-bold text-[#0F172A] text-start text-lg mt-6 mb-2">{feature.title}</h3>
								<p className="text-sm text-[#101010B3] font-light leading-none text-justify">{feature.description}</p>
							</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CryptcomFeatures;