"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";
import DownloadApkSvg from "@/shared/svgs/DownloadApkSvg";
import Button from "@/shared/components/Button";
import TelegramButton from "@/shared/components/TelegramButton";
import ShoppingCart from "@/shared/svgs/ShoppingCart";
import SimIconSvg from "@/shared/svgs/SimIconSvg";
import { useAppMobile } from "@/shared/context/AppMobileContext";

interface HeroSimSectionProps {
  // Datos del producto (de la API)
  productName: string;
  productImage: string;
  heroImage?: string;
  features: string[];
  price: string;
  
  // Acciones
  onBuy: () => void;
  
  // Opcional: URLs de tiendas
  appStoreUrl?: string;
  googlePlayUrl?: string;
  apkUrl?: string;
  
  // Traducciones
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

const HeroSimSection: React.FC<HeroSimSectionProps> = ({
  productName,
  productImage,
  heroImage,
  features,
  price,
  onBuy,
  appStoreUrl,
  googlePlayUrl,
  apkUrl,
  translations,
}) => {
  const { isFromAppMobile } = useAppMobile();
  const tHero = useTranslations("EncryptedSimPage.HeroSimSection");
  
  const t = {
    priceFrom: translations?.priceFrom || tHero("priceFrom"),
    buyNow: translations?.buyNow || tHero("buyNow"),
    benefitsTitle: translations?.benefitsTitle || tHero("benefitsTitle"),
    titleAccent: tHero("titleAccent"),
    titleLine1Rest: tHero("titleLine1Rest"),
    titleLine2: tHero("titleLine2"),
    subtitle: tHero("subtitle"),
    balanceLabel: tHero("balanceLabel"),
    topUpCta: tHero("topUpCta"),
    exampleProductTitle: tHero("exampleProductTitle"),
    exampleProductDuration: tHero("exampleProductDuration"),
    exampleBuyCta: tHero("exampleBuyCta"),
  };

  const hasStoreLinks = appStoreUrl || googlePlayUrl || apkUrl;
  const heroBannerSrc = heroImage || "/images/encrypted-sim/principal.webp";

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO BANNER - ESTÁTICO Y RESPONSIVE
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden min-h-[280px] sm:min-h-[320px] md:min-h-[284px] lg:min-h-[320px] flex items-center">
        {/* Left Half - Solid Black Background */}
        <div className="absolute inset-0 bg-[#010101]" />

        {/* Right Half - Hero Image with Gradient Overlay */}
        <div className="absolute top-0 right-0 bottom-0 left-0 sm:left-[35%] md:left-[40%] lg:left-1/2 overflow-hidden">
          <Image
            src={heroBannerSrc}
            alt="Hero Background"
            fill
            className="object-cover object-[70%_top] sm:object-top"
            priority
          />
          {/* Gradient transition from black to image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, #010101 0%, rgba(1, 1, 1, 0.85) 20%, rgba(1, 1, 1, 0.4) 50%, transparent 70%)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center">
            {/* Left Content - Text on Black Background */}
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-3 sm:space-y-4 max-w-md mx-auto md:mx-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight text-balance text-white">
                <span className="text-[#35CDFB]">{t.titleAccent}</span> {t.titleLine1Rest}
                <br />
                {t.titleLine2}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/90 text-pretty">
                {t.subtitle}
              </p>
            </div>

            {/* Right Content - Floating Elements over Image */}
            <div className="relative h-full min-h-[180px] lg:min-h-[220px] hidden md:block">
              {/* Floating Square - Cyan (decorative) - arriba a la izquierda */}
              <div
                className="absolute top-0 left-0 w-5 h-5 lg:w-6 lg:h-6 rounded z-10"
                style={{ background: "#35CDFB40" }}
              />

              {/* Floating Card - Balance - centro superior */}
              <div
                className="absolute top-2 left-[15%] lg:left-[20%] rounded-xl p-3 lg:p-4 z-20 flex items-center gap-3 lg:gap-4 min-w-[220px] lg:min-w-[280px]"
                style={{ background: "#101010D9", backdropFilter: "blur(10px)" }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] lg:text-xs text-gray-400">{t.balanceLabel}</p>
                  <p className="text-lg lg:text-xl font-bold whitespace-nowrap text-white">
                    $25.00 <span className="text-xs lg:text-sm text-gray-400">USD</span>
                  </p>
                </div>
                <div
                  className="bg-white/10 text-white text-[10px] lg:text-xs px-3 lg:px-4 py-1.5 lg:py-2 flex-shrink-0 rounded-md border border-white/10 cursor-default"
                >
                  {t.topUpCta}
                </div>
              </div>

              {/* Floating Square - decorativo abajo izquierda */}
              <div
                className="absolute bottom-4 left-[10%] w-4 h-4 lg:w-5 lg:h-5 rounded z-10"
                style={{ background: "#35CDFB20" }}
              />

              {/* Floating Card - Product - derecha inferior */}
              <div
                className="absolute bottom-2 right-0 lg:right-4 rounded-xl p-3 lg:p-4 z-20 flex items-center gap-3 max-w-[260px] lg:max-w-[320px]"
                style={{ background: "#101010D9", backdropFilter: "blur(10px)" }}
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/images/encrypted-sim/Encrypted_sim_card.webp"
                    alt="SIM"
                    width={40}
                    height={28}
                    className="w-7 lg:w-8 h-auto"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs lg:text-sm text-white font-medium truncate">{t.exampleProductTitle}</p>
                  <p className="text-sm lg:text-base text-white font-semibold">$25.00 USD</p>
                  <p className="text-[10px] lg:text-xs text-gray-400">{t.exampleProductDuration}</p>
                </div>
                {!isFromAppMobile && (
                  <div
                    className="bg-white/10 text-white text-[10px] lg:text-xs px-3 py-1.5 flex-shrink-0 rounded-md border border-white/10 cursor-default"
                  >
                    {t.exampleBuyCta}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BENEFITS AND PRODUCT SECTION
      ═══════════════════════════════════════════════════════════ */}
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
              {/* Product Image */}
              <div className="rounded-2xl overflow-hidden bg-[#1a1a1a]">
                <motion.img
                  src={productImage}
                  alt={productName}
                  className="w-full h-auto object-contain"
                  draggable={false}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
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
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#35CDFB" }}
                >
                  <SimIconSvg width={24} height={24} color="white" />
                </div>
                <h1 className="text-[36px] font-bold text-gray-900 leading-tight">{productName}</h1>
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
    </>
  );
};

export default HeroSimSection;
