"use client";
import React, { ReactNode } from "react";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";

type OurGoalCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  bgColor: string;
  titleColor?: "primary" | "secondary" | "text-primary" | "text-secondary" | "black";
  descriptionColor?: "primary" | "secondary" | "tertiary" | "black";
};

export default function OurGoalCard({
  title,
  description,
  icon,
  bgColor,
  titleColor = "black",
  descriptionColor = "black",
}: OurGoalCardProps) {
  return (
    <div
      className={`${bgColor}
      w-full max-w-[320px] min-h-[280px] rounded-2xl
      xs:max-w-[344px] xs:min-h-[320px] xs:rounded-[28px]
      md:w-full md:max-w-[280px] md:min-h-[400px] md:rounded-[20px]
      lg:w-[344px] lg:max-w-[344px] lg:min-h-[480px] lg:rounded-[34px]
      flex items-start justify-start overflow-hidden transition-transform hover:scale-105`}
    >
      {/* Contenido de la card */}
      <div className="w-full px-5 xs:px-6 md:px-5 lg:px-6 pt-5 xs:pt-6 lg:pt-8 pb-5 flex flex-col gap-3 xs:gap-4 lg:gap-4">
        {/* Icono */}
        <div className="h-[36px] xs:h-[40px] md:h-[48px] lg:h-[56px] flex items-center mb-1 xs:mb-2">
          <div className="w-[36px] h-[36px] xs:w-[40px] xs:h-[40px] md:w-[48px] md:h-[48px] lg:w-[56px] lg:h-[56px] flex items-center justify-center">
            {icon}
          </div>
        </div>

        {/* Título */}
        <div className="w-full">
          <Typography
            variant="h5"
            as="h3"
            color={titleColor}
            className="font-bold text-lg leading-tight
            xs:text-xl xs:leading-snug
            md:text-base md:leading-tight
            lg:text-[22px] lg:leading-[28px]
            text-left w-full"
          >
            {title}
          </Typography>
        </div>

        {/* Descripción */}
        <Paragraph
          variant="caption"
          spacing="tight"
          color={descriptionColor}
          className="text-sm leading-tight
          xs:text-[15px] xs:leading-snug
          md:text-xs md:leading-tight
          lg:text-base lg:leading-relaxed
          text-left w-full"
        >
          {description}
        </Paragraph>
      </div>
    </div>
  );
}
