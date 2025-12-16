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

const ProductSection: React.FC<ProductSectionProps> = ({
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
    <section className="w-full hidden lg:flex justify-center bg-white">
      <div className="w-full max-w-[1440px] h-[600px] flex items-center justify-center mx-auto px-2">
        {/* Columna izquierda */}
        <div className="flex flex-col w-[455px] gap-[20px] mt-10">
          {/* Bloque 1: Título + Descripción */}
          <div className="flex flex-col w-[413px] gap-4">
            <h2 className="font-bold text-[38px] leading-[1.3] text-[#131313]">
              {title}
            </h2>
            <p className="text-base leading-relaxed text-[#333333]">
              {description}
            </p>
          </div>

          {/* Bloque 2: Features/Checks */}
          <div className="flex flex-col gap-3">
            {features.length > 0 ? (
              features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check width={24} height={24} color="#1C1B1F" aria-hidden="true" />
                  <span className="text-base text-[#333333]">{f}</span>
                </div>
              ))
            ) : loading ? (
              <p className="text-sm text-gray-400">
                Cargando características...
              </p>
            ) : null}
          </div>

          {/* Bloque 3: Radio buttons */}
          <div className="flex flex-row flex-wrap gap-4">
            {radioOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer text-base text-[#333333] whitespace-nowrap"
              >
                <input
                  type="radio"
                  name={`plan-${title.replace(/\s/g, "")}-desktop`}
                  value={option}
                  checked={selectedRadio === option}
                  onChange={() => onRadioChange(option)}
                  className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`Plan ${option}`}
                />
                <span className="whitespace-nowrap">{option}</span>
              </label>
            ))}
          </div>

          {/* Separador */}
          <hr className="my-6 border-[#E0E0E0]" />

          {/* Bloque 4: Precio + Botones */}
          <div className="flex flex-col w-[455px] gap-6">
            <div>
              <span className="block text-sm text-[#555555] leading-tight mb-2">
                Desde
              </span>
              <span className="block font-bold text-[24px] leading-tight text-[#333333]">
                {price}
              </span>
            </div>

            <div className="flex gap-6">
              <Button
                type="primary"
                className="w-full justify-center h-[54px] rounded-[50px] px-6 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={onBuy}
                aria-label={`Comprar ${title}`}
              >
                <p className="font-medium text-base">Comprar ahora</p>
                <ShoppingCart color="white" height={20} width={20} aria-hidden="true" />
              </Button>
              <TelegramButton className="h-[54px] rounded-[50px]" />
              
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col items-center w-[520px] gap-6 ml-14">
          <img
            src={productImage}
            alt={`${title} screenshot`}
            className="rounded-[22.25px] w-full h-full object-contain"
            draggable={false}
            aria-hidden="true"
          />
          <div className="flex gap-4 mt-4">
            <AppStoreFooter />
            <PlayStoreSvg />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
