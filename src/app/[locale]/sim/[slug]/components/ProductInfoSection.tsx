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
import SimIconSvg from "@/shared/svgs/SimIconSvg";
import { useAppMobile } from "@/shared/context/AppMobileContext";
import { CircleFlag } from "react-circle-flags";
import Image from "next/image";

const RegionIcon: React.FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <span
      className="rounded-full flex items-center justify-center bg-white"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} fill="none">
        <circle cx="12" cy="12" r="10.5" stroke="#3393F7" strokeWidth="1.5" />
        <path
          d="M6.5 10.5l1.2-.6 1 .5v1l1 1 .4 1.4-.3 1.2 1.4.6.5 1 .9.4h1l.4-1v-1l1-1 .5-1 .5-.5 1 .5h1l1-1v-1l-.5-1-.5-.5H17l-.5-1 .4-.9v-1l-1-.5-1 .5-.5 1-1 .5h-1l-1-.5-.5-1-1-.5-1 .5-.5 1-.5.5-.5 1z"
          fill="#3393F7"
        />
      </svg>
    </span>
  );
};

interface ProductInfoSectionProps {
  productName: string;
  productImage: string;
  features: string[];
  price: string;
  onBuy: () => void;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  apkUrl?: string;
  gbBadge?: string;
  regionBadge?: string;
  regionCode?: string;
  flagUrl?: string;
  translations?: {
    priceFrom?: string;
    buyNow?: string;
    benefitsTitle?: string;
  };
}

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

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({
  productName,
  productImage,
  features,
  price,
  onBuy,
  appStoreUrl,
  googlePlayUrl,
  apkUrl,
  gbBadge,
  regionBadge,
  regionCode,
  flagUrl,
  translations,
}) => {
  const { isFromAppMobile } = useAppMobile();

  const t = {
    priceFrom: translations?.priceFrom || "Desde",
    buyNow: translations?.buyNow || "Comprar Ahora",
    benefitsTitle: translations?.benefitsTitle || "Características principales",
  };

  const hasStoreLinks = appStoreUrl || googlePlayUrl || apkUrl;

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Product Image - Primera en móvil, segunda en desktop */}
          <motion.div className="space-y-4 order-1 lg:order-2 max-w-md lg:max-w-lg mx-auto lg:mx-0" variants={imageVariants}>
            {/* Product Image with Region Badge Overlay */}
            <div className="relative rounded-2xl overflow-hidden bg-[#1a1a1a]">
              <motion.img
                src={productImage}
                alt={productName}
                className="w-full h-auto object-contain"
                draggable={false}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              {regionBadge && (
                <div className="absolute left-3 bottom-3 inline-flex items-center justify-center rounded-full bg-white text-[#010101] text-sm font-semibold px-2 py-1 shadow-md border border-gray-100 gap-1.5">
                  <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center relative">
                    {flagUrl ? (
                      <Image
                        src={flagUrl}
                        alt={regionBadge}
                        fill
                        className="object-cover"
                      />
                    ) : regionCode ? (
                      <CircleFlag
                        countryCode={regionCode.toLowerCase()}
                        className="w-full h-full"
                      />
                    ) : (
                      <RegionIcon size={20} />
                    )}
                  </div>
                  <span className="leading-none">{regionBadge}</span>
                </div>
              )}
            </div>

            {/* Download Buttons - Ocultos en móvil, visibles en desktop */}
            {hasStoreLinks && (
              <motion.div
                className="hidden lg:grid grid-cols-3 gap-3 w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {appStoreUrl && (
                  <motion.a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center hover:opacity-80 transition-opacity"
                    aria-label="Download on App Store"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AppStoreFooter className="w-full h-auto" />
                  </motion.a>
                )}
                {googlePlayUrl && (
                  <motion.a
                    href={googlePlayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center hover:opacity-80 transition-opacity"
                    aria-label="Get it on Google Play"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PlayStoreSvg className="w-full h-auto" />
                  </motion.a>
                )}
                {apkUrl && (
                  <motion.a
                    href={apkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center hover:opacity-80 transition-opacity"
                    aria-label="Download APK"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <DownloadApkSvg className="w-full h-auto" />
                  </motion.a>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Benefits Column - Segunda en móvil, primera en desktop */}
          <motion.div className="space-y-6 order-2 lg:order-1" variants={textVariants}>
            {/* Icon and Title */}
            <div className="flex items-center gap-3 flex-wrap">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "#35CDFB" }}
              >
                <SimIconSvg width={24} height={24} color="white" />
              </div>
              <h1 className="text-[36px] font-bold text-gray-900 leading-tight">
                {(() => {
                  if (!productName) return "";
                  const withSpaces = productName.replace(/-/g, " ");
                  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
                })()}
              </h1>
              {gbBadge && (
                <span className="inline-flex items-center justify-center rounded-full bg-[#1CB9EC] text-[#010101] text-sm font-semibold px-3 py-1 shadow-md">
                  {gbBadge}
                </span>
              )}
            </div>

            {/* Beneficios */}
            {features.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">{t.benefitsTitle}</p>
                <motion.ul
                  className="space-y-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
                  }}
                >
                  {features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center gap-2"
                      variants={featureVariants}
                    >
                      <Check className="w-5 h-5 text-gray-900 flex-shrink-0" />
                      <span className="font-medium text-gray-900">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            )}

            {/* Línea punteada separadora */}
            <motion.hr
              className="border-dashed border-gray-300"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              style={{ originX: 0 }}
            />

            {/* Precio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
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
                      onClick={onBuy}
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

export default ProductInfoSection;
