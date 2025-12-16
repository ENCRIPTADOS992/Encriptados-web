import React from "react";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";
import { Check } from "lucide-react";
import Button from "@/shared/components/Button";
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

const ProductSectionTablet: React.FC<ProductSectionProps> = ({
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
    <section className="w-full hidden sm:flex lg:hidden justify-center bg-white py-16">
      <div className="w-full max-w-[712px] flex flex-row items-start justify-center gap-6 mx-auto">
        {/* Columna izquierda */}
        <div className="flex flex-col w-[344px]">
          <div className="flex flex-col gap-6 mb-6">
            <h2 className="font-bold text-[30px] leading-[1.4] text-[#333333]">
              {title}
            </h2>
            <p className="text-base leading-relaxed text-[#555555]">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3 mb-6">
            {features.length > 0 ? (
              features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check width={22} height={22} color="#333333" />
                  <span className="text-base leading-relaxed text-[#333333]">{f}</span>
                </div>
              ))
            ) : loading ? (
              <p className="text-sm text-gray-400">
                Cargando características...
              </p>
            ) : null}
          </div>
          <div className="flex flex-row flex-wrap gap-3 mb-6">
            {radioOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer text-base text-[#333333] whitespace-nowrap"
              >
                <input
                  type="radio"
                  name={`plan-${title.replace(/\s/g, "")}-tablet`}
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
          <hr className="my-4 border-[#E0E0E0]" />
          <div className="flex flex-col gap-6">
            <div>
              <span className="block text-sm text-[#555555] leading-relaxed mb-2">
                Desde
              </span>
              <span className="block font-bold text-[28px] leading-none text-[#333333]">
                {price}
              </span>
            </div>
            <div className="flex gap-3">
              <Button
                intent="dark"
                size="md"
                onClick={onBuy}
                icon={<ShoppingCart color="white" height={20} width={20} />}
                iconPosition="right"
              >
                Comprar
              </Button>
              <TelegramButton />
            </div>
          </div>
        </div>
        {/* Columna derecha */}
        <div className="flex flex-col items-center w-[344px]">
          <div className="w-[344px] h-[240px] rounded-2xl bg-white flex items-center justify-center">
            <img
              src={productImage}
              alt={`${title} screenshot`}
              className="w-[344px] h-[205px] object-contain"
              draggable={false}
              aria-hidden="true"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <div className="w-[148px] h-[44px] flex items-center justify-center">
              <AppStoreFooter />
            </div>
            <div className="w-[148px] h-[44px] flex items-center justify-center">
              <PlayStoreSvg />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSectionTablet;
