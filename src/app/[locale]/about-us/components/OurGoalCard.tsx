"use client";
import React, { ReactNode } from "react";

type OurGoalCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  bgColor: string;
  titleColor?: string;
  descriptionColor?: string;
};

export default function OurGoalCard({
  title,
  description,
  icon,
  bgColor,
  titleColor = "text-black",
  descriptionColor = "text-black",
}: OurGoalCardProps) {
  return (
    <div
      className={`${bgColor}
      w-[344px] h-[480px] rounded-[34px]
      sm:w-[229px] sm:h-[337px] rounded-[18px]
      lg:w-[344px] lg:h-[480px] lg:rounded-[34px]
      flex items-start justify-start`}
    >
      {/* 🔹 En mobile usamos TODO el ancho de la card */}
      <div className="w-full lg:w-[296px] px-6 lg:px-6 pt-6 lg:pt-8 flex flex-col gap-4 lg:gap-4">
        {/* Icono */}
        <div className="h-[40px] lg:h-[56px] flex items-center mb-2">
          <div className="w-[40px] h-[40px] lg:w-[56px] lg:h-[56px] flex items-center justify-center">
            {icon}
          </div>
        </div>

        {/* Título – MOBILE 26px, sin altura fija */}
        <div className="h-auto lg:h-[62px] flex items-start">
          <h3
            className={`${titleColor}
            font-bold text-[26px] leading-[26px]
            sm:text-[16px] sm:leading-[16px] sm:w-[201px]
            lg:text-[26px] lg:leading-[26px] lg:w-[296px]
            text-left`}
          >
            {title}
          </h3>
        </div>

        {/* Descripción – MOBILE 18px, usando ancho completo */}
        <p
          className={`${descriptionColor}
          text-[18px] leading-[26px] w-full
          sm:text-[12px] sm:leading-[18px] sm:w-[201px]
          lg:text-[18px] lg:leading-[26px] lg:w-[296px] lg:mt-4
          sm:mt-1`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
