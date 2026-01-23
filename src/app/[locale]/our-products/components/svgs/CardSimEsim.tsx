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
  moreInfoUrl,
  onBuyClick,
  onMoreInfoClick,
  moreInfoColor,
}) => {
  return (
    <div className={`${background} min-w-0 h-full rounded-none sm:rounded-3xl overflow-hidden relative`}>
      <div className="p-6 sm:p-9 flex flex-col sm:flex-row gap-6 items-start justify-start h-full">
        <div className="w-full sm:w-[55%] text-center sm:text-left">
          <h2 className={`text-lg sm:text-xl mb-2 font-bold ${titleColor}`}>{title}</h2>
          {description && <p className={`text-sm mb-6 ${descriptionColor}`}>{description}</p>}
          <button
            type="button"
            onClick={onBuyClick}
            className="bg-[#10B4E7] hover:bg-[#7EE0FF] text-black font-bold rounded-lg px-4 sm:px-6 py-2 transition w-auto min-w-[140px] sm:max-w-[180px] text-center mx-auto sm:mx-0"
          >
            {buyText}
          </button>
          {showMoreInfo && (
            moreInfoUrl ? (
              <Link href={moreInfoUrl} passHref>
                <button
                  type="button"
                  onClick={onMoreInfoClick}
                  className={`hidden sm:inline-block text-sm transition mt-6 ${moreInfoColor || "text-gray-300 hover:text-white"}`}
                >
                  {moreInfoText}
                </button>
              </Link>
            ) : (
              <button
                type="button"
                onClick={onMoreInfoClick}
                className={`hidden sm:inline-block text-sm transition mt-6 ${moreInfoColor || "text-gray-300 hover:text-white"}`}
              >
                {moreInfoText}
              </button>
            )
          )}
        </div>
        <div className="w-full sm:w-[45%] h-full">
          <div className="flex justify-center sm:absolute sm:bottom-0 ">
            <Image
              src={imageSrc}
              alt={altText}
              width={200}
              height={160}
              className="object-contain filter saturate-150"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSimEsim;
