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
  moreInfoColor?: string;
}

const CardSimEsim: FC<CardSimEsimProps> = ({
  title,
  description,
  imageSrc,
  altText,
  background = "bg-gradient-to-br from-[#03212A] to-[#090909]",
  titleColor = "text-white",
  descriptionColor = "text-gray-300",
  showMoreInfo = true,
  buyText = "Comprar aquí",
  moreInfoText = "Más información",
  moreInfoUrl = "#",
  onBuyClick,
  onMoreInfoClick,
  moreInfoColor,
}) => {
  return (
    <div className={`${background} flex-1 min-w-0 sm:rounded-3xl rounded-2xl`}>
      <div className="
          p-6 sm:p-9
          flex
          flex-col
          sm:flex-row
          gap-6
          items-center
          justify-center
          sm:justify-start
        "
        >
        {/* Texto */}
        <div
          className="
            w-full sm:w-[55%]
            text-center
            sm:text-left
          "
        >
          <h2 className={`text-lg sm:text-xl mb-2 font-bold ${titleColor}`}>
            {title}
          </h2>
          {description && (
            <p className={`text-sm sm:text-sm text-[#101010] mb-6 ${descriptionColor}`}>
              {description}
            </p>
          )}
          <div className="flex flex-col justify-start">
           <button
              type="button"
              onClick={onBuyClick}
              className="
                bg-[#10B4E7] hover:bg-[#7EE0FF] text-black font-bold
                rounded-lg px-6 py-2 transition
                w-full max-w-[180px] whitespace-nowrap
                mx-auto
                sm:mx-0
              "
            >
              {buyText}
            </button>
          </div>
          {showMoreInfo && (
            <Link href={moreInfoUrl} passHref>
              <button
                type="button"
                onClick={onMoreInfoClick}
                className={`text-sm transition mt-6 sm:mt-4 ${moreInfoColor || "text-gray-300 hover:text-white"}`}
              >
                {moreInfoText}
              </button>
            </Link>
          )}
        </div>

        {/* Imagen */}
        <div
          className="
            w-full sm:w-[45%] relative min-h-[180px]
            flex
            justify-center
            sm:justify-end
            items-end
          "
        >
          <Image
            src={imageSrc}
            alt={altText}
            width={200}
            height={160}
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </div>
  );
};

export default CardSimEsim;
