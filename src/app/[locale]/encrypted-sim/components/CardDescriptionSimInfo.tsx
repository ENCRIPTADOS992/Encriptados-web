"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "@/shared/components/Button";
import CheckSvg from "/public/images/encrypted-sim/icons/check.svg";
import TelegramIcon from "@/shared/svgs/TelegramIcon";
import IconSupportChat from "@/shared/svgs/SupportChatIcon";
import SimProductsBarIconColor from "../../our-products/components/FilterProductsBar/icons/SimProductsBarIconColor";
import SupportChatIcon from "@/shared/svgs/SupportChatIcon";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import TelegramButton from "@/shared/components/TelegramButton";

type CardDescriptionSimInfoProps = {
  features: string[];
  priceRange: string;
  headerTitle: string;
  id: number;
  languageCode: string;
};

const CardDescriptionSimInfo: React.FC<CardDescriptionSimInfoProps> = ({
  features,
  priceRange,
  headerTitle,
  id,
  languageCode,
}) => {
  const t = useTranslations("EncryptedSimPage.CardSim");
  const { openModal } = useModalPayment();

  return (
    <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden p-8">
      {/* Título con ícono */}
      <div className="flex items-center gap-3 mb-4">
        <SimProductsBarIconColor className="w-8 h-8 text-cyan-500" />
        <h2 className="text-2xl font-bold text-black">{headerTitle}</h2>
      </div>

      <p className="text-md text-gray-600 mb-4">Beneficios para ti:</p>

      {/* Lista de características */}
      <ul className="space-y-2 mb-4">
        {features.map((item, index) => (
          <li key={index} className="flex items-center text-base gap-3">
            <Image src={CheckSvg} alt="Check" className="w-5 h-4" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Precio */}
      <div className="text-md text-gray-600 mb-1">Desde</div>
      <div className="text-2xl font-bold mb-4">{priceRange}</div>

      {/* Botones */}
      <div className="flex justify-between gap-2 whitespace-nowrap">
        <Button
          size="medium"
          rounded="full"
          intent="black"
          customStyles="text-sm font-normal"
          onClick={() => openModal({ productid: id.toString(), languageCode })}
        >
          {t("buyNow")}
        </Button>

        <TelegramButton />

      </div>
    </div>
  );
};

export default CardDescriptionSimInfo;
