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
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 block lg:hidden" // Mostrar en pantallas pequeñas
      />

      {/* Imagen de fondo para escritorio */}
      <Image
        src={imageUrl}
        alt="Banner Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 hidden lg:block" // Mostrar en pantallas grandes
      />

      {/* Contenido superpuesto */}
    </div>
  );
};

export default BannerBackground;
