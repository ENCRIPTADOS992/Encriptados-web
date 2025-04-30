import React from "react";
import ArrowRightSvg from "./svgs/ArrowRightSvg";

interface CardOfRegionProps {
  region: string;
  icon: React.ReactNode; // Definir el tipo de icono como ReactNode
}

const CardOfRegion: React.FC<CardOfRegionProps> = ({ region, icon }) => {
  return (
    <div className="flex items-center p-8   rounded-2xl cursor-pointer  bg-white shadow-lg w-full ">
      <div className="mr-4">{icon}</div>

      <span className="flex-grow text-base sm:text-lg md:text-xl ont-semi">
        {region}
      </span>

      <ArrowRightSvg height={25} width={25} />
    </div>
  );
};

export default CardOfRegion;
