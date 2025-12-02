import React from "react";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";
import { Check } from "lucide-react";
import Button from "../shared/Button";
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
    <section className="w-full hidden sm:flex lg:hidden justify-center bg-white py-8">
      <div className="w-full max-w-[712px] flex flex-row items-start justify-center gap-[24px] mx-auto">
        {/* Columna izquierda */}
        <div className="flex flex-col w-[344px]">
          <div className="flex flex-col gap-[20px] mb-[14px]">
            <h2 className="font-inter font-bold text-[24px] leading-[100%] text-[#131313]">
              {title}
            </h2>
            <p className="font-inter font-normal text-[14px] leading-[120%] text-[#000000]">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-[8px] mb-[14px]">
            {features.length > 0 ? (
              features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check width={22} height={22} color="#1C1B1F" />
                  <span className="text-[14px] text-[#131313]">{f}</span>
                </div>
              ))
            ) : loading ? (
              <p className="text-sm text-gray-400">
                Cargando características...
              </p>
            ) : null}
          </div>
          <div className="flex flex-row flex-wrap gap-[10px] mb-[16px]">
            {radioOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-1 cursor-pointer font-inter font-normal text-[14px] text-[#131313] whitespace-nowrap"
                style={{ maxWidth: "calc(100% - 12px)" }}
              >
                <input
                  type="radio"
                  name={`plan-${title.replace(/\s/g, "")}-tablet`}
                  value={option}
                  checked={selectedRadio === option}
                  onChange={() => onRadioChange(option)}
                />
                <span className="whitespace-nowrap">{option}</span>
              </label>
            ))}
          </div>
          <hr className="my-[12px] border-[#E0E0E0]" />
          <div className="flex flex-col gap-[16px]">
            <div>
              <span className="block text-[12px] text-[#000000] leading-[100%] mb-[2px]">
                Desde
              </span>
              <span className="block font-inter font-bold text-[20px] leading-[100%] text-[#000000]">
                {price}
              </span>
            </div>
            <div className="flex gap-3">
              <Button
                type="primary"
                className="flex items-center justify-center w-[130px] h-[48px] px-4 py-2 text-[14px] gap-2 whitespace-nowrap"
              >
                <span className="font-medium text-[14px]">Comprar</span>
                <ShoppingCart color="white" height={18} width={18} />
              </Button>
              <TelegramButton
                className="min-w-[90px] px-2 py-1 text-sm gap-1
             [&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0
             leading-none"
              />
            </div>
          </div>
        </div>
        {/* Columna derecha */}
        <div className="flex flex-col items-center w-[324px]">
          <div className="w-[324px] h-[205px] rounded-[22.25px] bg-white flex items-center justify-center">
            <img
              src={productImage}
              alt={`${title} screenshot`}
              className="w-[324px] h-[205px] object-contain rounded-[22.25px]"
              draggable={false}
            />
          </div>
          <div
            className="flex"
            style={{
              width: "306.22px",
              height: "44px",
              gap: "10.32px",
            }}
          >
            <div
              style={{
                width: "148.5px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSectionTablet;
