import React from "react";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";
import { Check } from "lucide-react";
import Button from "../../shared/Button";
import TelegramButton from "@/shared/components/TelegramButton";
import ShoppingCart from "@/shared/svgs/ShoppingCart";

interface ProductSectionProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  radioOptions: string[];
  selectedRadio: string;
  onRadioChange: (value: string) => void;
  onBuy: () => void;
  onChat: () => void;
  productImage: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  loading?: boolean;
}

const ProductSectionMobile: React.FC<ProductSectionProps> = ({
  title,
  description,
  features,
  price,
  radioOptions,
  selectedRadio,
  onRadioChange,
  onBuy,
  onChat,
  productImage,
  appStoreUrl,
  googlePlayUrl,
  loading = false,
}) => {
  return (
    <section className="w-full flex justify-center bg-white sm:hidden">
      <div className="w-full flex flex-col px-3 py-5 gap-5">
        {/* Imagen centrada */}
        <div className="w-full flex justify-center">
          <img
            src={productImage}
            alt={`${title} screenshot`}
            className="rounded-[18px] w-full max-w-[430px] h-auto object-contain mb-4"
            draggable={false}
          />
        </div>

        {/* Bloque alineado a la izquierda */}
        <div className="w-full flex flex-col items-start">
          <h2 className="font-bold text-[20px] text-[#131313] mb-2">{title}</h2>
          <p className="text-[14px] text-[#000000] mb-2">{description}</p>
          <div className="flex flex-col gap-2 mb-2">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check width={20} height={20} color="#1C1B1F" />
                <span className="text-[14px]">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {radioOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-1 text-[14px]"
              style={{ maxWidth: "90vw" }}
            >
              <input
                type="radio"
                name="plan"
                value={option}
                checked={selectedRadio === option}
                onChange={() => onRadioChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <div className="flex flex-col items-start mb-3 leading-tight">
          <span className="text-[12px] text-[#000000] mb-[12px]">Desde</span>
          <span className="font-bold text-[28px] text-[#000000] leading-none">
            {price}
          </span>
        </div>

        <div className="flex flex-col gap-2 w-full mb-3">
          <Button
            type="primary"
            className="w-full justify-center h-[54px] rounded-[50px] px-[20px]"
          >
            <p>Comprar ahora</p>
            <ShoppingCart color="white" height={18} width={18} />
          </Button>
          <TelegramButton className="w-full h-[54px] rounded-[50px] px-[20px] min-w-0" />
        </div>
      </div>
    </section>
  );
};

export default ProductSectionMobile;
