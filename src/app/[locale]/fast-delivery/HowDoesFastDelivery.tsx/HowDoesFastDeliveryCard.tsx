import React from "react";
import Image, { StaticImageData } from "next/image";

export type HowDoesFastDeliveryCard = {
  title: string;
  description: string;
  image: StaticImageData;
  imagePosition?: "top" | "bottom";
};

const HowDoesFastDeliveryCard: React.FC<HowDoesFastDeliveryCard> = ({
  title,
  description,
  image,
  imagePosition = "top",
}) => {
  return (
    <div className="bg-white w-[313px] border-gray-200 shadow-md m-4 p-4 rounded-3xl">
      {imagePosition === "top" && (
        <div className=" h-[350px] relative rounded-3xl  overflow-hidden">
          <Image
            quality={100}
            title="Image"
            src={image}
            alt="Image"
            loading="eager"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold text-[#333333]">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
      {imagePosition === "bottom" && (
        <div className="w-full h-[300px] relative rounded-3xl   overflow-hidden">
          <Image
            objectFit="cover"
            quality={100}
            title="Image"
            src={image}
            alt="Image"
            loading="eager"
            layout="fill"
          />
        </div>
      )}
    </div>
  );
};

export default HowDoesFastDeliveryCard;
