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
    <article className="flex h-full flex-col rounded-2xl bg-white px-6 py-6 mt-5">
      {/* Icono */}
      <div className="mb-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4f8fa] shadow-sm">
          {icon}
        </div>
      </div>

      {/* Título */}
      <h3 className="mb-2 text-base font-semibold text-[#111827]">
        {title}
      </h3>

      {/* Descripción */}
      <p className="text-sm leading-snug text-[#6B7280]">
        {description}
      </p>
    </article>
  );
};

export default CardFeatureSim;
