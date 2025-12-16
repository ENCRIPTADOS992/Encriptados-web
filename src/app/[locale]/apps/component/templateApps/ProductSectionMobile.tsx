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
  console.log("Renders ProductSectionMobile");
  console.log("Props.radioOptions:", radioOptions);
  console.log("Props.selectedRadio:", selectedRadio);

  return (
    <section className="w-full flex justify-center bg-white sm:hidden py-12">
      <div className="w-full flex flex-col px-4 gap-6">
        {/* Imagen centrada */}
        <div className="w-full flex justify-center">
          <img
            src={productImage}
            alt={`${title} screenshot`}
            className="rounded-2xl w-full max-w-[430px] h-auto object-contain"
            draggable={false}
            aria-hidden="true"
          />
        </div>

        {/* Bloque alineado a la izquierda */}
        <div className="flex flex-col w-full max-w-[430px] mx-auto gap-6">
          <div className="flex flex-col w-full gap-3">
            <h2 className="font-bold text-[30px] leading-[1.4] text-[#333333]">{title}</h2>
            <p className="text-base leading-relaxed text-[#555555]">{description}</p>
          </div>

          <div className="flex flex-col gap-3 justify-start w-full">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check width={20} height={20} color="#333333" aria-hidden="true" />
                <span className="text-base leading-relaxed text-[#333333]">{f}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 w-full">
            {radioOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 text-base cursor-pointer"
              >
                <input
                  type="radio"
                  name={`plan-${title.replace(/\s/g, "")}-mobile`}
                  value={option}
                  checked={selectedRadio === option}
                  onChange={() => {
                    console.log("onChange option:", option);
                    onRadioChange(option);
                  }}
                  className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`Plan ${option}`}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start leading-tight w-full max-w-[430px] mx-auto">
          <span className="text-sm text-[#555555] mb-3">Desde</span>
          <span className="font-bold text-[32px] leading-none text-[#333333]">
            {price}
          </span>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-[430px] mx-auto">
          <Button
            type="primary"
            className="w-full justify-center h-[54px] rounded-full px-6 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`Comprar ${title}`}
          >
            <p>Comprar ahora</p>
            <ShoppingCart color="white" height={18} width={18} aria-hidden="true" />
          </Button>
          <TelegramButton className="w-full h-[54px] rounded-full px-6 min-w-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
        </div>
      </div>
    </section>
  );
};

export default ProductSectionMobile;
