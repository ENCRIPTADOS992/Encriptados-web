import React from "react";
import Image, { StaticImageData } from "next/image";

interface BannerBackgroundProps {
  imageUrl: StaticImageData; // Imagen para escritorio
  bgMobile: StaticImageData; // Imagen para móvil (obligatoria)
}

const BannerBackground = ({ imageUrl, bgMobile }: BannerBackgroundProps) => {
  return (
    <div className="relative w-full h-[250px]">
      {/* Imagen de fondo para móvil */}
      <Image
        src={bgMobile}
        alt="Banner Background Mobile"
        fill
        quality={100}
        className="absolute inset-0 block lg:hidden object-cover" // Mostrar en pantallas pequeñas
      />

      {/* Imagen de fondo para escritorio */}
      <Image
        src={imageUrl}
        alt="Banner Background"
        fill
        quality={100}
        className="absolute inset-0 hidden lg:block object-cover" // Mostrar en pantallas grandes
      />

      {/* Contenido superpuesto */}
    </div>
  );
};

export default BannerBackground;
