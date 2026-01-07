"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";
import Button from "@/shared/components/Button";
import TelegramButton from "@/shared/components/TelegramButton";
import ShoppingCart from "@/shared/svgs/ShoppingCart";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { useAppMobile } from "@/shared/context/AppMobileContext";

interface ProductSectionTranslations {
  priceFrom: string;
  buyNow: string;
  selectPlan: string;
  downloadAppStore: string;
  downloadGooglePlay: string;
}

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
  translations?: ProductSectionTranslations;
}

/**
 * Limpia el texto de la opción para mostrar solo la duración
 * Ej: "Licencia 3 Meses" -> "3 Meses", "License 3 Months" -> "3 Months"
 */
const formatRadioLabel = (option: string): string => {
  return option.replace(/^(Licencia|License|Licence|Licenza|Licen[çc]a)\s*/i, "").trim();
};

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/**
 * ProductSection - Componente unificado y responsive con animaciones
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
  translations,
}) => {
  const { openModal } = useModalPayment();
  const { isFromAppMobile } = useAppMobile();

  // Default translations (fallback)
  const t = {
    priceFrom: translations?.priceFrom || "Desde",
    buyNow: translations?.buyNow || "Comprar ahora",
    selectPlan: translations?.selectPlan || "Selecciona un plan",
    downloadAppStore: translations?.downloadAppStore || "Descargar en App Store",
    downloadGooglePlay: translations?.downloadGooglePlay || "Descargar en Google Play",
  };

  const handleBuy = () => {
    if (onBuy) {
      onBuy();
      return;
    }

    if (!productId) {
      console.warn("[ProductSection] No se recibió productId");
      return;
    }

    // Extraer precio numérico del string price
    const match = price?.match(/[\d.]+/);
    const numericPrice = match ? parseFloat(match[0]) : undefined;

    openModal({
      productid: String(productId),
      languageCode,
      selectedOption: Number(selectedOption ?? 0),
      initialPrice: numericPrice,
    });
  };

  const hasStoreLinks = appStoreUrl || googlePlayUrl;

  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid: 1 col mobile, 2 col tablet+ */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-start sm:items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Imagen + Store buttons - Primera en mobile, segunda en tablet+ */}
          <motion.div 
            className="order-1 sm:order-2 flex flex-col items-start"
            variants={imageVariants}
          >
            <motion.img
              src={productImage}
              alt={`${title} screenshot`}
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto rounded-2xl object-contain"
              draggable={false}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Store buttons - Ocultos en móvil, visibles desde sm */}
            {hasStoreLinks && (
              <motion.div 
                className="hidden sm:flex flex-wrap gap-3 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {appStoreUrl && (
                  <motion.a 
                    href={appStoreUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={t.downloadAppStore}
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AppStoreFooter />
                  </motion.a>
                )}
                {googlePlayUrl && (
                  <motion.a 
                    href={googlePlayUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={t.downloadGooglePlay}
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PlayStoreSvg />
                  </motion.a>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Contenido */}
          <motion.div 
            className="order-2 sm:order-1 flex flex-col gap-4 sm:gap-5 lg:gap-6"
            variants={textVariants}
          >
            {/* Título y descripción */}
            <div className="space-y-3 sm:space-y-4">
              <motion.h1 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {title}
              </motion.h1>
              <motion.p 
                className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {description}
              </motion.p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <motion.ul 
                className="space-y-2 sm:space-y-3" 
                role="list"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
                }}
              >
                {features.map((feature, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex items-start gap-2 sm:gap-3"
                    variants={featureVariants}
                  >
                    <Check 
                      className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-800 flex-shrink-0 mt-0.5" 
                      aria-hidden="true" 
                    />
                    <span className="text-sm sm:text-base text-gray-800">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            {/* Radio options - Sin palabra "Licencia" */}
            {radioOptions.length > 0 && (
              <motion.fieldset 
                className="flex flex-wrap gap-3 sm:gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <legend className="sr-only">{t.selectPlan}</legend>
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
              </motion.fieldset>
            )}

            <motion.hr 
              className="border-gray-200"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{ originX: 0 }}
            />

            {/* Precio */}
            <motion.div 
              className="space-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <span className="text-xs sm:text-sm text-gray-500">{t.priceFrom}</span>
              <motion.p 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900"
                key={price}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {price}
              </motion.p>
            </motion.div>

            {/* Botones - Ocultos cuando viene de app_mobile */}
            {!isFromAppMobile && (
              <motion.div 
                className="flex flex-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 sm:flex-none"
                >
                  <Button
                    intent="dark"
                    size="md"
                    onClick={handleBuy}
                    icon={<ShoppingCart color="white" height={20} width={20} />}
                    iconPosition="right"
                    className="w-full"
                  >
                    {t.buyNow}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 sm:flex-none"
                >
                  <TelegramButton className="w-full" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSectionUnified;
