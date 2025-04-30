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
    <div className="w-full bg-white rounded-2xl shadow-lg px-6 pt-6 flex flex-col justify-between">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={500}
          className=""
        />
      </div>
    </div>
  );
};

export default OurBneCard;
