"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface CardSimEsimProps {
  title: string;
  description?: string;
  imageSrc: string;
  altText: string;
  background?: string;
  titleColor?: string;
  descriptionColor?: string;
  showMoreInfo?: boolean;
  buyText?: string;
  moreInfoText?: string;
  buyUrl?: string;
  moreInfoUrl?: string;
  onBuyClick?: () => void;
  onMoreInfoClick?: () => void;
}

const CardSimEsim: FC<CardSimEsimProps> = ({
  title,
  description,
  imageSrc,
  altText,
  background = "bg-gradient-to-br from-teal-950 to-black",
  titleColor = "text-white",
  descriptionColor = "text-gray-300",
  showMoreInfo = true,
  buyText = "Comprar",
  moreInfoText = "Más información",
  buyUrl = "#",
  moreInfoUrl = "#",
  onBuyClick,
  onMoreInfoClick,
}) => {
  return (
    <div className={`${background} w-full sm:rounded-3xl rounded-2xl`}>
      <div className="p-6 sm:p-9 flex flex-wrap sm:flex-nowrap gap-6">
        {/* Texto */}
        <div className="w-full sm:w-[55%]">
          <h2 className={`text-lg sm:text-xl mb-2 font-semibold ${titleColor}`}>
            {title}
          </h2>
          {description && (
            <p className={`text-sm sm:text-xs mb-6 ${descriptionColor}`}>
              {description}
            </p>
          )}
          <div className="flex flex-col justify-start">
            <Link href={buyUrl} passHref>
              <button
                onClick={onBuyClick}
                className="bg-[#E3F8FF] hover:bg-[#c7edfa] text-[#001D26] rounded-full px-4 py-2 transition sm:w-1/2 w-full"
              >
                {buyText}
              </button>
            </Link>
          </div>
          {showMoreInfo && (
            <Link href={moreInfoUrl} passHref>
              <button
                onClick={onMoreInfoClick}
                className="text-gray-300 text-sm hover:text-white transition mt-6 sm:mt-14"
              >
                {moreInfoText}
              </button>
            </Link>
          )}
        </div>

        {/* Imagen */}
        <div className="w-full sm:w-[45%] self-center">
          <Image
            src={imageSrc}
            alt={altText}
            width={200}
            height={160}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default CardSimEsim;
