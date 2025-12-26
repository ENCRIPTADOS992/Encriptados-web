"use client";

import React from "react";
import { Check } from "lucide-react";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";
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
  productImage: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  productId?: number | string;
  selectedOption?: number | string;
  languageCode?: string;
}

/**
 * Limpia el texto de la opción para mostrar solo la duración
 * Ej: "Licencia 3 Meses" -> "3 Meses"
 */
const formatRadioLabel = (option: string): string => {
  return option.replace(/^Licencia\s*/i, "").trim();
};

/**
 * ProductSection - Componente unificado y responsive
 * Mobile: imagen arriba, contenido abajo (columna)
 * Tablet (sm+): 2 columnas - contenido izquierda, imagen derecha
 * Desktop (lg+): 2 columnas con más espacio
 */
const ProductSectionUnified: React.FC<ProductSectionProps> = ({
  title,
  description,
  features,
  price,
  radioOptions,
  selectedRadio,
  onRadioChange,
  onBuy,
  productImage,
  appStoreUrl,
  googlePlayUrl,
  productId,
  selectedOption,
  languageCode = "es",
}) => {
  const { openModal } = useModalPayment();

  const handleBuy = () => {
    if (onBuy) {
      onBuy();
      return;
    }

    if (!productId) {
      console.warn("[ProductSection] No se recibió productId");
      return;
    }

    openModal({
      productid: String(productId),
      languageCode,
      selectedOption: Number(selectedOption ?? 0),
    });
  };

  const hasStoreLinks = appStoreUrl || googlePlayUrl;

  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid: 1 col mobile, 2 col tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-start sm:items-center">
          
          {/* Imagen + Store buttons - Primera en mobile, segunda en tablet+ */}
          <div className="order-1 sm:order-2 flex flex-col items-start">
            <img
              src={productImage}
              alt={`${title} screenshot`}
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto rounded-2xl object-contain"
              draggable={false}
            />
            
            {/* Store buttons - Ocultos en móvil, visibles desde sm */}
            {hasStoreLinks && (
              <div className="hidden sm:flex flex-wrap gap-3 mt-4">
                {appStoreUrl && (
                  <a 
                    href={appStoreUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Descargar en App Store"
                    className="flex-shrink-0"
                  >
                    <AppStoreFooter />
                  </a>
                )}
                {googlePlayUrl && (
                  <a 
                    href={googlePlayUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Descargar en Google Play"
                    className="flex-shrink-0"
                  >
                    <PlayStoreSvg />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="order-2 sm:order-1 flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* Título y descripción */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <ul className="space-y-2 sm:space-y-3" role="list">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3">
                    <Check 
                      className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-800 flex-shrink-0 mt-0.5" 
                      aria-hidden="true" 
                    />
                    <span className="text-sm sm:text-base text-gray-800">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Radio options - Sin palabra "Licencia" */}
            {radioOptions.length > 0 && (
              <fieldset className="flex flex-wrap gap-3 sm:gap-4">
                <legend className="sr-only">Selecciona un plan</legend>
                {radioOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 cursor-pointer text-sm sm:text-base text-gray-700 hover:text-primary transition-colors"
                  >
                    <input
                      type="radio"
                      name={`plan-${title.replace(/\s/g, "")}`}
                      value={option}
                      checked={selectedRadio === option}
                      onChange={() => onRadioChange(option)}
                      className="w-4 h-4 text-primary focus:ring-primary focus:ring-2 accent-primary"
                    />
                    <span>{formatRadioLabel(option)}</span>
                  </label>
                ))}
              </fieldset>
            )}

            <hr className="border-gray-200" />

            {/* Precio */}
            <div className="space-y-1">
              <span className="text-xs sm:text-sm text-gray-500">Desde</span>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{price}</p>
            </div>

            {/* Botones */}
            <div className="flex flex-row gap-3">
              <Button
                intent="dark"
                size="md"
                onClick={handleBuy}
                icon={<ShoppingCart color="white" height={20} width={20} />}
                iconPosition="right"
                className="flex-1 sm:flex-none"
              >
                Comprar ahora
              </Button>
              <TelegramButton className="flex-1 sm:flex-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSectionUnified;
