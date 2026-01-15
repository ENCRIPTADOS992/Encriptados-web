"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeroBannerProps {
  imageUrl: {
    desktop: string;
    tablet?: string;
    mobile?: string;
  };
  alt?: string;
}

/**
 * HeroBanner - Componente unificado y responsive con animación
 * Usa picture element para servir imágenes optimizadas por breakpoint
 */
const HeroBannerUnified: React.FC<HeroBannerProps> = ({ imageUrl, alt = "Banner" }) => {
  const desktopSrc = imageUrl.desktop;
  const mobileSrc = imageUrl.mobile || desktopSrc;
  // Si tablet está vacío, usar mobile como fallback
  const tabletSrc = imageUrl.tablet || mobileSrc;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <picture className="block w-full">
        {/* Desktop: lg (1024px+) */}
        <source media="(min-width: 1024px)" srcSet={desktopSrc} />
        {/* Tablet: sm-lg (640px - 1023px) */}
        <source media="(min-width: 640px)" srcSet={tabletSrc} />
        {/* Mobile: default */}
        <img
          src={mobileSrc}
          alt={alt}
          className="w-full h-44 sm:h-36 lg:h-72 object-cover"
          draggable={false}
          loading="eager"
        />
      </picture>
    </motion.div>
  );
};

export default HeroBannerUnified;
