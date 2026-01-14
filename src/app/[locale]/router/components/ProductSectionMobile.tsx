import React from "react";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";
import DownloadApkSvg from "@/shared/svgs/DownloadApkSvg";
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
  apkUrl?: string;
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
  apkUrl,
  loading = false,
}) => {
  return (
    <section className="w-full flex justify-center bg-white sm:hidden py-8">
      <div className="w-full max-w-[430px] flex flex-col px-4 gap-6">
        {/* Imagen centrada */}
        <img
          src={productImage}
          alt={`${title} screenshot`}
          className="rounded-2xl w-full h-auto object-contain"
          draggable={false}
        />

        {/* Contenido */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-[30px] leading-[1.4] text-[#333333]">{title}</h2>
            <p className="text-base leading-relaxed text-[#555555]">{description}</p>
          </div>
          
          <div className="flex flex-col gap-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check width={22} height={22} color="#333333" />
                <span className="text-base leading-relaxed text-[#333333]">{f}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4">
            {radioOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 text-base text-[#333333] whitespace-nowrap"
              >
                <input
                  type="radio"
                  name={`plan-${title.replace(/\s/g, "")}-mobile`}
                  value={option}
                  checked={selectedRadio === option}
                  onChange={() => onRadioChange(option)}
                  className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`Plan ${option}`}
                />
                {option}
              </label>
            ))}
          </div>

          <hr className="border-[#E0E0E0]" />

          <div className="flex flex-col gap-2">
            <span className="text-sm text-[#787878] leading-normal">Desde</span>
            <span className="text-[30px] leading-[1.4] font-bold text-[#131313]">
              {price}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              intent="dark"
              size="md"
              fullWidth={true}
              onClick={onBuy}
              icon={<ShoppingCart color="white" height={20} width={20} />}
              iconPosition="right"
              className="px-6"
            >
              Comprar ahora
            </Button>
            <TelegramButton className="w-full" />
          </div>

          {/* Store buttons */}
          <div className="flex justify-center gap-3 mt-4">
            <AppStoreFooter />
            <PlayStoreSvg />
            <DownloadApkSvg />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSectionMobile;
