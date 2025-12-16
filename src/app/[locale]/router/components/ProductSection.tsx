"use client";
import React from "react";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";
import { Check } from "lucide-react";
import Button from "@/shared/components/Button";
import TelegramButton from "@/shared/components/TelegramButton";
import ShoppingCart from "@/shared/svgs/ShoppingCart";
import { useModalPayment } from "@/providers/ModalPaymentProvider";

interface ProductSectionProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  radioOptions: string[];
  selectedRadio: string;
  onRadioChange: (value: string) => void;

  onBuy?: () => void;
  onChat: () => void;

  productImage: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  loading?: boolean;

  productId?: number | string;
  selectedOption?: number | string; 
  languageCode?: string;            
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
  productId,
  selectedOption,
  languageCode = "es",
}) => {
  const { openModal } = useModalPayment();
  const priceBlockRef = React.useRef<HTMLDivElement | null>(null);

  const handleBuy = () => {
    if (onBuy) {
      onBuy();
      return;
    }

    if (!productId) {
      console.warn("[ProductSection] No se recibió productId; no se puede abrir el modal.");
      return;
    }

    openModal({
      productid: String(productId),
      languageCode,
      selectedOption: Number(selectedOption ?? 0),
    });
  };

  return (
    <section className="w-full hidden lg:flex justify-center bg-white py-16 md:py-20 lg:py-24">
      <div className="w-full max-w-[1272px] flex items-center justify-center mx-auto px-4 gap-8">
        {/* Columna izquierda */}
        <div className="flex flex-col flex-1 max-w-[540px]">
          {/* Título + Descripción */}
          <div className="flex flex-col gap-6 mb-6">
            <h1 className="font-bold text-[38px] leading-[1.4] text-[#333333]">
              {title}
            </h1>
            <p className="text-base leading-relaxed text-[#555555]">
              {description}
            </p>
          </div>

          {/* Features/Checks */}
          <div className="flex flex-col gap-3 mb-6">
            {features.length > 0 ? (
              features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check width={28} height={28} color="#333333" />
                  <span className="text-base leading-relaxed text-[#333333]">{f}</span>
                </div>
              ))
            ) : loading ? (
              <p className="text-sm text-gray-400">Cargando características...</p>
            ) : null}
          </div>

          {/* Radios */}
          <div className="flex flex-row flex-wrap gap-4 mb-6">
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

          <hr className="my-6 border-[#E0E0E0]" />

          {/* Precio + Botones */}
          <div className="flex flex-col gap-6" ref={priceBlockRef}>
            <div>
              <span className="block text-sm text-[#555555] leading-relaxed mb-2">
                Desde
              </span>
              <span className="block font-bold text-[30px] leading-none text-[#333333]">
                {price}
              </span>
            </div>
            <div className="flex gap-3">
              <Button
                intent="dark"
                size="md"
                onClick={handleBuy}
                icon={<ShoppingCart color="white" height={20} width={20} />}
                iconPosition="right"
              >
                Comprar ahora
              </Button>
              <TelegramButton />
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col items-center flex-1 max-w-[627px]">
          <img
            src={productImage}
            alt={`${title} screenshot`}
            className="rounded-2xl w-full h-auto object-contain"
            draggable={false}
          />
          <div className="flex gap-3 mt-6">
            <AppStoreFooter />
            <PlayStoreSvg />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
