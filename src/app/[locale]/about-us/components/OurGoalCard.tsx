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
      w-full max-w-[320px] min-h-[280px] rounded-[24px]
      xs:max-w-[344px] xs:min-h-[320px] xs:rounded-[28px]
      sm:w-[229px] sm:max-w-[229px] sm:min-h-[337px] sm:rounded-[18px]
      lg:w-[344px] lg:max-w-[344px] lg:min-h-[480px] lg:rounded-[34px]
      flex items-start justify-start overflow-hidden`}
    >
      {/* Contenido de la card */}
      <div className="w-full px-5 xs:px-6 sm:px-4 lg:px-6 pt-5 xs:pt-6 lg:pt-8 pb-5 flex flex-col gap-3 xs:gap-4 lg:gap-4">
        {/* Icono */}
        <div className="h-[36px] xs:h-[40px] lg:h-[56px] flex items-center mb-1 xs:mb-2">
          <div className="w-[36px] h-[36px] xs:w-[40px] xs:h-[40px] lg:w-[56px] lg:h-[56px] flex items-center justify-center">
            {icon}
          </div>
        </div>

        {/* Título */}
        <div className="w-full">
          <h3
            className={`${titleColor}
            font-bold text-[20px] leading-[24px]
            xs:text-[22px] xs:leading-[26px]
            sm:text-[14px] sm:leading-[18px]
            lg:text-[22px] lg:leading-[28px]
            text-left w-full`}
          >
            {title}
          </h3>
        </div>

        {/* Descripción */}
        <p
          className={`${descriptionColor}
          text-[14px] leading-[20px]
          xs:text-[15px] xs:leading-[22px]
          sm:text-[11px] sm:leading-[16px]
          lg:text-[16px] lg:leading-[24px]
          text-left w-full mt-1 sm:mt-2 lg:mt-3`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
