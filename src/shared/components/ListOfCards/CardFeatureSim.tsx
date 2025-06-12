// src/shared/components/CardFeatureSim.tsx
"use client";

import React from "react";

interface CardFeatureSimProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const CardFeatureSim: React.FC<CardFeatureSimProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-full bg-black rounded-[40px] aspect-square flex justify-center items-center">
        <div className="bg-gradient-to-b from-[#00C0F9] to-[#00DF91] p-4 rounded-xl">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-bold text-black mt-4">{title}</h3>
      <p className="text-sm text-[#7E7E7E] mt-1">{description}</p>
    </div>
  );
};

export default CardFeatureSim;
