import Image from "next/image";
import { StaticImageData } from "next/image";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
}

const OurBneCard: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
}) => {
  return (
    <article className="w-full bg-white rounded-2xl shadow-lg px-6 pt-6 flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-[22px] font-bold leading-[1.5] text-[#333333]">{title}</h3>
        <p className="text-base leading-relaxed text-[#555555] mt-2">{description}</p>
      </div>
      <div className="rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={500}
          className="w-full h-auto"
        />
      </div>
    </article>
  );
};

export default OurBneCard;
