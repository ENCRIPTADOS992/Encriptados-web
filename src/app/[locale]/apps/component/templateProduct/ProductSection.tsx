"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";
import DownloadApkSvg from "@/shared/svgs/DownloadApkSvg";
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
  downloadApk?: string;
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
  apkUrl?: string;
  storeButtons?: {
    appStore?: boolean;
    googlePlay?: boolean;
    apk?: boolean;
  };
  priceBlockRef?: React.RefObject<HTMLDivElement>;
  productId?: number | string;
  selectedOption?: number | string;
  languageCode?: string;
  translations?: ProductSectionTranslations;
}

/**
 * Limpia el texto de la opción para mostrar solo la duración
 * Ej: "Licencia 3 Meses" -> "3 Meses", "License 3 Months" -> "3 Months"
 */
const formatRadioLabel = (option: string, languageCode: string): string => {
  const cleaned = option.replace(/^(Licencia|License|Licence|Licenza|Licen[çc]a)\s*/i, "").trim();
  const [first] = cleaned.split(/\s+/);
  if (first && first.toUpperCase() === "PHONE") return translateLicenseType("PHONE", languageCode);
  return cleaned;
};

const translateLicenseType = (type: string, languageCode: string): string => {
  const normalized = type.toUpperCase();
  if (normalized !== "PHONE") return type;
  switch (languageCode) {
    case "es":
      return "Celular";
    case "en":
      return "Phone";
    case "fr":
      return "Téléphone";
    case "it":
      return "Cellulare";
    default:
      return "Phone";
  }
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
  apkUrl,
  storeButtons,
  priceBlockRef,
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
    downloadApk: translations?.downloadApk || "Descargar APK",
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

  // Siempre mostrar los iconos de tiendas, con o sin URLs
  const enabledStores = {
    appStore: storeButtons?.appStore !== false,
    googlePlay: storeButtons?.googlePlay !== false,
    apk: storeButtons?.apk !== false,
  };
  const showStoreIcons = true;
  const storeItems = [
    {
      key: "appStore",
      enabled: enabledStores.appStore && Boolean(appStoreUrl),
      url: appStoreUrl,
      ariaLabel: t.downloadAppStore,
      content: <AppStoreFooter className="w-full h-auto" />,
    },
    {
      key: "googlePlay",
      enabled: enabledStores.googlePlay && Boolean(googlePlayUrl),
      url: googlePlayUrl,
      ariaLabel: t.downloadGooglePlay,
      content: <PlayStoreSvg className="w-full h-auto" />,
    },
    {
      key: "apk",
      enabled: enabledStores.apk && Boolean(apkUrl),
      url: apkUrl,
      ariaLabel: t.downloadApk,
      content: <DownloadApkSvg className="w-full h-auto" />,
    },
  ] as const;
  const orderedStoreItems = [
    ...storeItems.filter((s) => s.enabled),
    ...storeItems.filter((s) => !s.enabled),
  ];

  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid: 1 col mobile, 2 col desktop */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Imagen + Store buttons - Primera en mobile, segunda en desktop */}
          <motion.div 
            className="space-y-4 order-1 lg:order-2 max-w-md lg:max-w-lg mx-auto lg:mx-0"
            variants={imageVariants}
          >
            {/* Product Image */}
            <div className="rounded-2xl overflow-hidden">
              <motion.img
                src={productImage}
                alt={`${title} screenshot`}
                className="w-full h-auto object-contain"
                draggable={false}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Store buttons - Ocultos en móvil, visibles en desktop */}
            {showStoreIcons && (
              <motion.div 
                className="hidden lg:grid grid-cols-3 gap-3 w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {orderedStoreItems.map((s) => {
                  if (!s.enabled) {
                    return (
                      <div
                        key={s.key}
                        className="flex items-center justify-center opacity-0 pointer-events-none select-none"
                      >
                        {s.content}
                      </div>
                    );
                  }

                  if (s.url) {
                    return (
                      <motion.a
                        key={s.key}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.ariaLabel}
                        className="flex items-center justify-center"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {s.content}
                      </motion.a>
                    );
                  }

                  return (
                    <motion.div
                      key={s.key}
                      className="flex items-center justify-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      {s.content}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>

          {/* Contenido - Segunda en móvil, primera en desktop */}
          <motion.div 
            className="space-y-6 order-2 lg:order-1"
            variants={textVariants}
          >
            {/* Título y descripción */}
            <div>
              <motion.h1 
                className="text-[36px] font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {title}
              </motion.h1>
              <motion.p 
                className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mt-4"
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
                className="space-y-2" 
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
                    className="flex items-center gap-2"
                    variants={featureVariants}
                  >
                    <Check 
                      className="w-5 h-5 text-gray-900 flex-shrink-0" 
                      aria-hidden="true" 
                    />
                    <span className="font-medium text-gray-900">{feature}</span>
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
                    <span>{formatRadioLabel(option, languageCode)}</span>
                  </label>
                ))}
              </motion.fieldset>
            )}

            <motion.hr 
              className="border-dashed border-gray-300"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{ originX: 0 }}
            />

            {/* Precio */}
            <motion.div
              ref={priceBlockRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <p className="text-sm text-gray-500 mb-1">{t.priceFrom}</p>
              <p className="text-4xl font-bold text-gray-900 mb-6">{price}</p>

              {/* Botones - Ocultos cuando viene de app_mobile */}
              {!isFromAppMobile && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto"
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
                    className="w-full sm:w-auto"
                  >
                    <TelegramButton className="w-full" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSectionUnified;
