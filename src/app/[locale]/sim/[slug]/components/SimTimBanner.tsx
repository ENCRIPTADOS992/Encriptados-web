"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface SimTimBannerProps {
  productName?: string;
  onBuy?: () => void;
}

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const floatingIconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "backOut" },
  },
};

export default function SimTimBanner({ productName, onBuy }: SimTimBannerProps) {
  const t = useTranslations("EncryptedSimPage.SimTimBanner");

  const features = [
    { text: t("features.anonymity") + " ", highlight: t("features.anonymityHighlight") },
    { text: t("features.payForUse") + " ", highlight: t("features.payForUseHighlight") },
    { text: t("features.compatible") + " ", highlight: t("features.compatibleHighlight") },
    { text: t("features.coverage") + " ", highlight: t("features.coverageHighlight") },
    { text: t("features.noExpiry") + " ", highlight: t("features.noExpiryHighlight") },
    { text: t("features.instantActivation") + " ", highlight: t("features.instantActivationHighlight") },
  ];

  return (
    <section className="relative w-full overflow-visible min-h-[280px] sm:min-h-[320px] md:min-h-[284px] lg:min-h-[320px] flex items-end bg-gradient-to-r from-[#0c1829] via-[#111d2e] via-5% to-[#000000]">
      {/* Blue ellipse blur effect in top left */}
      <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-[#009DFF] opacity-30 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-0 lg:py-0">
        {/* Mobile: 2 columns - Content | Image */}
        <motion.div 
          className="flex flex-row lg:hidden items-stretch justify-between gap-0 min-h-[280px] sm:min-h-[320px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Mobile Left Column - Logo, Title, Paragraph - Centered vertically */}
          <motion.div className="flex flex-col justify-center space-y-2 sm:space-y-3 w-[52%]" variants={textVariants}>
            {/* Logo */}
            <motion.div className="w-fit" variants={textVariants}>
              <Image 
                src="/images/bne-sim/logo-sim-tim.svg" 
                alt="SIM TIM Logo" 
                width={90} 
                height={28} 
                priority 
                className="w-[80px] sm:w-[100px]"
              />
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-[15px] sm:text-lg font-bold leading-tight text-white"
              variants={textVariants}
            >
              {t("title")}{" "}
              <span className="text-[#009DFF]">{t("titleHighlight")}</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              className="text-[10px] sm:text-xs text-gray-400 leading-relaxed"
              variants={textVariants}
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>

          {/* Mobile Right Column - Image with Icons - Flush to bottom */}
          <div className="relative flex items-end justify-end w-[48%]">
            {/* Floating Icons for Mobile - positioned around the image */}
            <motion.div 
              className="absolute -left-2 top-4 sm:top-6 md:top-8"
              variants={floatingIconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <Image src="/images/bne-sim/svg/icono-dialogo.svg" alt="" width={28} height={24} className="h-auto w-5 sm:w-6 md:w-7" />
            </motion.div>
            <motion.div 
              className="absolute right-0 top-2 sm:top-4 md:top-6"
              variants={floatingIconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <Image src="/images/bne-sim/svg/icono-carga.svg" alt="" width={24} height={20} className="h-auto w-5 sm:w-6 md:w-7" />
            </motion.div>
            <motion.div 
              className="absolute -left-3 top-[45%] rotate-[-15deg]"
              variants={floatingIconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <Image src="/images/bne-sim/svg/icono-ubicacion.svg" alt="" width={20} height={26} className="h-auto w-4 sm:w-5 md:w-6" />
            </motion.div>
            <motion.div 
              className="absolute right-0 top-[32%]"
              variants={floatingIconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <Image src="/images/bne-sim/svg/icono-engranajes.svg" alt="" width={36} height={28} className="h-auto w-8 sm:w-9 md:w-10" />
            </motion.div>
            <motion.div 
              className="absolute right-2 bottom-[22%]"
              variants={floatingIconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
            >
              <Image src="/images/bne-sim/svg/icono-grafica.svg" alt="" width={28} height={24} className="h-auto w-6 sm:w-7 md:w-8" />
            </motion.div>

            {/* Person Image - flush to bottom of section, scales with viewport */}
            <motion.div 
              className="relative z-10"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <Image
                src="/images/bne-sim/hombre-feliz.png"
                alt={t("personAlt")}
                width={280}
                height={280}
                className="h-auto w-full max-w-[140px] sm:max-w-[180px] md:max-w-[240px] object-contain"
                priority
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Desktop: 3 columns */}
        <motion.div 
          className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Column 1 - Logo, Title and Paragraph */}
          <motion.div className="flex flex-col justify-center space-y-4 lg:w-[28%] lg:space-y-5" variants={textVariants}>
            {/* Logo */}
            <motion.div className="w-fit" variants={textVariants}>
              <Image 
                src="/images/bne-sim/logo-sim-tim.svg" 
                alt="SIM TIM Logo" 
                width={120} 
                height={40} 
                priority 
              />
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[32px] font-bold leading-tight text-white"
              variants={textVariants}
            >
              {t("title")}{" "}
              <span className="text-[#009DFF]">{t("titleHighlight")}</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              className="text-sm lg:text-[13px] xl:text-sm text-gray-400 leading-relaxed"
              variants={textVariants}
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>

          {/* Column 2 - Feature Pills in 2x3 grid - SOLO DESKTOP */}
          <motion.div 
            className="hidden lg:flex items-center justify-center lg:w-[42%]"
            variants={containerVariants}
          >
            <div className="flex flex-col gap-3">
              {/* Row 1 */}
              <div className="flex items-center justify-start gap-4">
                <motion.div 
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-gray-900 shadow-sm"
                  variants={pillVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-[#009DFF]" strokeWidth={3} />
                  <span className="whitespace-nowrap">
                    {t("features.anonymity")} <span className="text-[#009DFF]">{t("features.anonymityHighlight")}</span>
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-gray-900 shadow-sm"
                  variants={pillVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-[#009DFF]" strokeWidth={3} />
                  <span className="whitespace-nowrap">
                    {t("features.payForUse")} <span className="text-[#009DFF]">{t("features.payForUseHighlight")}</span>
                  </span>
                </motion.div>
              </div>
              {/* Row 2 */}
              <div className="flex items-center justify-start gap-4">
                <motion.div 
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-gray-900 shadow-sm"
                  variants={pillVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-[#009DFF]" strokeWidth={3} />
                  <span className="whitespace-nowrap">
                    {t("features.compatible")} <span className="text-[#009DFF]">{t("features.compatibleHighlight")}</span>
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-gray-900 shadow-sm"
                  variants={pillVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-[#009DFF]" strokeWidth={3} />
                  <span className="whitespace-nowrap">
                    {t("features.coverage")} <span className="text-[#009DFF]">{t("features.coverageHighlight")}</span>
                  </span>
                </motion.div>
              </div>
              {/* Row 3 */}
              <div className="flex items-center justify-start gap-4">
                <motion.div 
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-gray-900 shadow-sm"
                  variants={pillVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-[#009DFF]" strokeWidth={3} />
                  <span className="whitespace-nowrap">
                    {t("features.noExpiry")} <span className="text-[#009DFF]">{t("features.noExpiryHighlight")}</span>
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-gray-900 shadow-sm"
                  variants={pillVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-[#009DFF]" strokeWidth={3} />
                  <span className="whitespace-nowrap">
                    {t("features.instantActivation")} <span className="text-[#009DFF]">{t("features.instantActivationHighlight")}</span>
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Column 3 - Image with Floating Icons */}
          <div className="relative flex items-end justify-center lg:w-[35%] self-end overflow-visible -mb-0 lg:-mb-0">
            {/* Floating Icons - positioned around the image */}
            {/* Dialog Icon - top left of image area */}
            <motion.div 
              className="absolute left-[5%] top-6 lg:left-[0%] lg:top-4"
              variants={floatingIconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <Image 
                src="/images/bne-sim/svg/icono-dialogo.svg" 
                alt="" 
                width={44} 
                height={38} 
                className="h-auto w-9 lg:w-10 xl:w-11" 
              />
            </motion.div>

            {/* Upload/Cloud Icon - top right of image area */}
            <motion.div 
              className="absolute right-[5%] top-6 lg:right-[0%] lg:top-4"
              variants={floatingIconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <Image 
                src="/images/bne-sim/svg/icono-carga.svg" 
                alt="" 
                width={36} 
                height={32} 
                className="h-auto w-8 lg:w-9 xl:w-10" 
              />
            </motion.div>

            {/* Location Icon - left side (rotated) */}
            <motion.div 
              className="absolute left-[0%] top-[50%] -translate-y-1/2 lg:left-[-5%] rotate-[-15deg]"
              variants={floatingIconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <Image 
                src="/images/bne-sim/svg/icono-ubicacion.svg" 
                alt="" 
                width={32} 
                height={42} 
                className="h-auto w-6 lg:w-7 xl:w-8" 
              />
            </motion.div>

            {/* Gears Icon - right side upper */}
            <motion.div 
              className="absolute right-[0%] top-[35%] lg:right-[-5%]"
              variants={floatingIconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <Image 
                src="/images/bne-sim/svg/icono-engranajes.svg" 
                alt="" 
                width={56} 
                height={44} 
                className="h-auto w-12 lg:w-14 xl:w-16" 
              />
            </motion.div>

            {/* Chart Icon - right side lower */}
            <motion.div 
              className="absolute right-[5%] bottom-[20%] lg:right-[0%]"
              variants={floatingIconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
            >
              <Image 
                src="/images/bne-sim/svg/icono-grafica.svg" 
                alt="" 
                width={44} 
                height={40} 
                className="h-auto w-10 lg:w-11 xl:w-12" 
              />
            </motion.div>

            {/* Main Person Image - flush to bottom */}
            <motion.div 
              className="relative z-10"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <Image
                src="/images/bne-sim/hombre-feliz.png"
                alt={t("personAlt")}
                width={320}
                height={320}
                className="h-auto w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[280px] xl:max-w-[300px] object-contain"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
