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

  /** Si te pasan onBuy, lo usas. Si no, abrirás el modal desde aquí */
  onBuy?: () => void;
  onChat: () => void;

  productImage: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  loading?: boolean;

  /** Nuevas props para abrir el modal directamente */
  productId?: number | string;
  selectedOption?: number | string; // ej: 40 para SIM encriptada
  languageCode?: string;            // "es" por defecto
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

  const handleBuy = () => {
    // 1) Si el padre definió su propio onBuy, lo respetamos
    if (onBuy) {
      onBuy();
      return;
    }

    // 2) Default: abrimos el modal de pago
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
    <section className="w-full hidden lg:flex justify-center bg-white">
      <div className="w-full max-w-[1440px] h-[600px] flex items-center justify-center mx-auto px-2">
        {/* Columna izquierda */}
        <div className="flex flex-col w-[455px] gap-y-[20px]">
          {/* Título + Descripción */}
          <div className="flex flex-col max-w-[413px] gap-4">
            <h1 className="text-[38px] leading-[1.3] font-bold text-[#131313]">
              {title}
            </h1>
            <p className="text-base leading-relaxed text-[#555555]">
              {description}
            </p>
          </div>

          {/* Features/Checks */}
          <div className="flex flex-col gap-3">
            {features.length > 0 ? (
              features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check width={28} height={28} color="#1C1B1F" aria-hidden="true" />
                  <span className="text-base leading-relaxed text-[#131313]">{f}</span>
                </div>
              ))
            ) : loading ? (
              <p className="text-sm text-gray-400">Cargando características...</p>
            ) : null}
          </div>

          {/* Radios */}
          <div className="flex flex-row flex-wrap gap-4">
            {radioOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer text-base text-[#333333] whitespace-nowrap hover:text-primary transition-colors"
              >
                <input
                  type="radio"
                  name={`plan-${title.replace(/\s/g, "")}-desktop`}
                  value={option}
                  checked={selectedRadio === option}
                  onChange={() => onRadioChange(option)}
                  className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                  aria-label={`Seleccionar plan ${option}`}
                />
                <span className="whitespace-nowrap">{option}</span>
              </label>
            ))}
          </div>

          <hr className="my-[18px] border-[#E0E0E0]" />

          {/* Precio + Botones */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="block text-sm text-[#787878] leading-normal mb-1">
                Desde
              </span>
              <span className="block text-[30px] leading-[1.4] font-bold text-[#131313]">
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
        <div className="flex flex-col items-center w-[520px] h-[329px] ml-14">
          <img
            src={productImage}
            alt={`${title} screenshot`}
            className="rounded-[22.25px] w-full h-full object-contain"
            draggable={false}
          />
          <div className="flex gap-4 mt-4">
            {/* <AppStoreFooter />
            <PlayStoreSvg /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
