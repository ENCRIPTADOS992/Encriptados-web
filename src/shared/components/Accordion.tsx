"use client";
import React, { useState, FC, useRef } from "react";

interface AccordionItem {
  title: React.ReactNode; // Permitir HTML o JSX en el título
  content: React.ReactNode; // Permitir HTML o JSX en el contenido
}

interface AccordionProps {
  items: AccordionItem[];
  showIcon?: boolean; // Prop para mostrar u ocultar el ícono
  icon?: React.ReactNode; // Prop para pasar un ícono personalizado
}

const Accordion: FC<AccordionProps> = ({ items, showIcon = true, icon }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = (index: number) => {
    if (activeIndex === index) {
      setMaxHeight(0); // Colapsa el contenido cuando se cierra
      setActiveIndex(null);
    } else {
      setMaxHeight(contentRef.current?.scrollHeight || 0); // Expande el contenido basado en la altura real
      setActiveIndex(index);
    }
  };

  return (
    <div className="w-full mx-auto border border-gray-300 text-black rounded-2xl overflow-hidden">
      {items?.map((item, index) => (
        <div key={index} className="border-b border-gray-300">
          <div
            onClick={() => handleToggle(index)}
            className={`p-5 flex items-center cursor-pointer gap-x-2 transition-colors duration-300 ${
              activeIndex === index ? "bg-white" : "bg-white"
            }`}
          >
            {showIcon && (
              <div className="bg-[#EFEFEF] px-3 py-1 rounded-full">
                {/* Si se proporciona un ícono personalizado, se usa, de lo contrario, se muestra "?" */}
                {icon ? (
                  icon
                ) : (
                  <h1 className="text-[#329CC7] font-semibold">?</h1>
                )}
              </div>
            )}
            <span className="font-semibold">{item.title}</span>{" "}
            {/* Ahora title puede ser HTML o JSX */}
          </div>
          <div
            ref={contentRef}
            style={{
              maxHeight: activeIndex === index ? `${maxHeight}px` : "0px",
              transition: "max-height 0.3s ease",
              overflow: "hidden",
            }}
          >
            <div className="p-6 bg-gray-100 text-gray-700">
              {item.content} {/* Ahora content puede ser HTML o JSX */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
