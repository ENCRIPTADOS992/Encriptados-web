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
    <section className="w-full flex justify-center bg-white sm:hidden py-8">
      <div className="w-full max-w-[430px] flex flex-col px-4 gap-6">
        {/* Imagen centrada */}
        <div className="w-full flex justify-center">
          <img
            src={productImage}
            alt={`${title} screenshot`}
            className="rounded-2xl w-full h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* Contenido */}
        <div className="w-full flex flex-col gap-6">
          {/* Título y descripción */}
          <div className="flex flex-col gap-4">
            <h1 className="text-[30px] leading-[1.4] font-bold text-[#131313]">{title}</h1>
            <p className="text-base leading-relaxed text-[#555555]">{description}</p>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check width={20} height={20} color="#1C1B1F" aria-hidden="true" />
                <span className="text-base text-[#333333]">{f}</span>
              </div>
            ))}
          </div>

          {/* Radios */}
          <div className="flex flex-wrap gap-4">
            {radioOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 text-base text-[#333333] cursor-pointer"
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
                  className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                  aria-label={`Seleccionar plan ${option}`}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Separador */}
          <hr className="border-[#E0E0E0]" />

          {/* Precio */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-[#787878] leading-normal">Desde</span>
            <span className="text-[30px] leading-[1.4] font-bold text-[#131313]">
              {price}
            </span>
          </div>

          {/* Botones */}
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
        </div>
      </div>
    </section>
  );
};

export default ProductSectionMobile;
