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
        <div className="flex flex-col w-[455px] mt-10">
          {/* Bloque 1: Título + Descripción */}
          <div className="flex flex-col gap-[20px] mb-[12px]">
            <h2 className="font-inter font-bold text-[28px] leading-[100%] text-[#131313]">
              {title}
            </h2>
            <p className="font-inter font-normal text-[14px] leading-[100%] text-[#000000]">
              {description}
            </p>
          </div>

          {/* Bloque 2: Features/Checks */}
          <div className="flex flex-col gap-[8px] mb-[12px]">
            {features.length > 0 ? (
              features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check width={28} height={28} color="#1C1B1F" />
                  <span className="text-[16px] text-[#131313]">{f}</span>
                </div>
              ))
            ) : loading ? (
              <p className="text-sm text-gray-400">
                Cargando características...
              </p>
            ) : null}
          </div>

          {/* Bloque 3: Radio buttons */}
          <div className="flex flex-row flex-wrap gap-[18px] mb-[18px]">
            {radioOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-1 cursor-pointer font-inter font-normal text-[16px] text-[#131313] whitespace-nowrap"
                style={{
                  maxWidth: "calc(100% - 20px)",
                }}
              >
                <input
                  type="radio"
                  name={`plan-${title.replace(/\s/g, "")}-desktop`}
                  value={option}
                  checked={selectedRadio === option}
                  onChange={() => onRadioChange(option)}
                />
                <span className="whitespace-nowrap">{option}</span>
              </label>
            ))}
          </div>

          {/* Separador */}
          <hr className="my-[18px] border-[#E0E0E0]" />

          {/* Bloque 4: Precio + Botones */}
          <div className="flex flex-col gap-[22px]">
            <div>
              <span className="block text-[14px] text-[#000000] leading-[100%] mb-[2px]">
                Desde
              </span>
              <span className="block font-inter font-bold text-[24px] leading-[100%] text-[#000000]">
                {price}
              </span>
            </div>
            <div className="flex gap-3">
              <Button type="primary" className="md:w-full md:justify-center">
                <p className="font-medium text-base">Comprar ahora</p>
                <ShoppingCart color="white" height={20} width={20} />
              </Button>
              <TelegramButton />
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col items-center w-[520px] h-[329px] ml-14">
          <img
            src={productImage}
            alt={`${title} screenshot`}
            className="rounded-[22.25px] w-full h-full object-contain"
            draggable={false}
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
