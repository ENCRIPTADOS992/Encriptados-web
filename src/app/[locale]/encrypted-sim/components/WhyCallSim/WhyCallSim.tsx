import React from "react";
import Check1 from "./svgs/Check1";
import Check2 from "./svgs/Check2";
import Check3 from "./svgs/Check3";
import WhyCallCard from "./WhyCallCard";
import { useTranslations } from "next-intl";

interface Card {
  title: string;
  icon: JSX.Element;
  bgColor: string;
  textColor: string;
}

const WhyCallSim: React.FC = () => {
  const t = useTranslations("EncryptedSimPage");
  const cards: Card[] = [
    {
      title: t("whyCallWithEncryptedSIM.card1"),
      icon: <Check1 />,
      bgColor: "bg-[#DDF7FF]",
      textColor: "text-black",
    },
    {
      title: t("whyCallWithEncryptedSIM.card2"),
      icon: <Check2 />,
      bgColor: "bg-gradient-to-b from-[#6ADDFF] via-[#6ADDFF] to-[#A8EBFF]",
      textColor: "text-black",
    },
    {
      title: t("whyCallWithEncryptedSIM.card3"),
      icon: <Check3 />,
      bgColor: "bg-gradient-to-b from-[#010101] via-[#010101] to-[#35CDFB]",
      textColor: "text-gray-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <WhyCallCard
          key={index}
          title={card.title}
          icon={card.icon}
          bgColor={card.bgColor}
          textColor={card.textColor}
        />
      ))}
    </div>
  );
};

export default WhyCallSim;
