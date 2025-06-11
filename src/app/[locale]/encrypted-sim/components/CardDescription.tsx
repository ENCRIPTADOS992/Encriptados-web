"use client";

import Image from "next/image";
import Button from "@/shared/components/Button";
import CheckSvg from "/public/images/encrypted-sim/icons/check.svg";
import TelegramIcon from "@/shared/svgs/TelegramIcon";
import SimProductsBarIconColor from "../../our-products/components/FilterProductsBar/icons/SimProductsBarIconColor";



type CardDescriptionProps = {
  features: string[];
  priceRange: string;
  headerTitle: string;
};

const CardDescription: React.FC<CardDescriptionProps> = ({
  features,
  priceRange,
  headerTitle,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl overflow-hidden p-6">
      {/* Título con ícono */}
      <div className="flex items-center gap-2 mb-2">
        <SimProductsBarIconColor className="w-6 h-6 text-cyan-500" />
        <h2 className="text-lg font-bold text-black">{headerTitle}</h2>
      </div>

      <p className="text-sm text-gray-600 mb-3">Beneficios para ti:</p>

      {/* Lista de características */}
      <ul className="space-y-2 mb-4">
        {features.map((item, index) => (
          <li key={index} className="flex items-center text-sm gap-2">
            <Image src={CheckSvg} alt="Check" className="w-4 h-4" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Precio */}
      <div className="text-sm text-gray-600 mb-1">Desde</div>
      <div className="text-xl font-bold mb-4">{priceRange}</div>

      {/* Botones */}
      <div className="flex justify-between gap-2 flex-nowrap">
        <Button
          size="medium"
          rounded="full"
          intent="black"
          customStyles=" text-sm"
        >
          Comprar ahora
        </Button>

        <Button
          size="medium"
          rounded="full"
          intent="blueT"
          customStyles="whitespace-nowrap text-sm"
          icon={<TelegramIcon className="w-5 h-5 text-white" />}
        >
          Chatear Telegram
        </Button>
      </div>
    </div>
  );
};

export default CardDescription;
