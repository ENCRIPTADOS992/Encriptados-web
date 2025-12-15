// src/app/[locale]/encrypted-sim/components/CardDescription.tsx

import Image from "next/image";
import type { StaticImageData } from "next/image";

interface CardDescriptionProps {
  logoSrc: StaticImageData;
  title: string;
  description: string;
  features: {
    icon: StaticImageData;
    alt: string;
    description: string;
  }[];
}

const CardDescription: React.FC<CardDescriptionProps> = ({
  logoSrc,
  title,
  description,
  features,

}) => {
  return (
    <div className="bg-transparent sm:bg-custom-linear-2 md:bg-custom-linear-2 p-8 rounded-2xl overflow-hidden flex flex-col justify-center">
      {/* Logo en la parte superior */}
      <div className="mb-6 flex justify-center">
        <Image
          src={logoSrc}
          alt="Logo"
          width={200}
          height={50}
          className="object-contain"
        />
      </div>

      {/* Título y descripción */}
      <h2 className="lg:text-4xl md:text-2xl text-2xl font-bold text-black mb-4">
        {title}
      </h2>
      <p className="text-black mb-8 text-base">{description}</p>

      {/* Aquí pintamos la cuadrícula de iconos + texto */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="h-[80px] sm:h-[100px] md:h-[100px] lg:h-[100px] w-full bg-[#E6F4F9] rounded-2xl flex items-center justify-center p-2">
              <Image
                src={feature.icon}
                alt={feature.alt}
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <span className="mt-2 text-[0.6rem] sm:text-[0.8rem] text-center text-black">
              {feature.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDescription;
