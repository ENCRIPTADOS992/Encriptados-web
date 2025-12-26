import React from "react";

interface HeroBannerProps {
  imageUrl: {
    desktop: string;
    tablet?: string;
    mobile?: string;
  };
  alt?: string;
}

/**
 * HeroBanner - Componente unificado y responsive
 * Usa picture element para servir imágenes optimizadas por breakpoint
 */
const HeroBannerUnified: React.FC<HeroBannerProps> = ({ imageUrl, alt = "Banner" }) => {
  const desktopSrc = imageUrl.desktop;
  const tabletSrc = imageUrl.tablet || desktopSrc;
  const mobileSrc = imageUrl.mobile || tabletSrc;

  return (
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
  );
};

export default HeroBannerUnified;
