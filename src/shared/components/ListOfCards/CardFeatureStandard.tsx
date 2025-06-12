"use client";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface CardFeatureStandardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const CardFeatureStandard: React.FC<CardFeatureStandardProps> = ({
  icon,
  title,
  description,
}) => {
  const encodedSVG = encodeURIComponent(renderToStaticMarkup(icon));

  return (
    <div className="bg-[#101010] text-white p-6 rounded-xl space-y-2 h-full">
      {/* Icono con degradado */}
      <div
        className="w-12 h-12"
        style={{
          background: "linear-gradient(180deg, #00C0F9 0%, #00DF91 100%)",
          WebkitMaskImage: `url("data:image/svg+xml;utf8,${encodedSVG}")`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "contain",
          maskImage: `url("data:image/svg+xml;utf8,${encodedSVG}")`,
          maskRepeat: "no-repeat",
          maskPosition: "center",
          maskSize: "contain",
        }}
      />

      {/* Título y descripción */}
      <h3 className="text-white font-semibold text-base">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default CardFeatureStandard;
