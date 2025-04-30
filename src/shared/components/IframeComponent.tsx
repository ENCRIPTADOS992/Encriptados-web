import React from "react";

// Definimos los tipos permitidos para width y height

interface IframeComponentProps {
  url: string;
  width: string; // Propiedad opcional para el ancho
  height: string; // Propiedad opcional para la altura
  className?: string; // Propiedad opcional para clases CSS
}

const IframeComponent: React.FC<IframeComponentProps> = ({
  url,
  width = "100%", // Valor por defecto
  height = "100%", // Valor por defecto
  className = "", // Valor por defecto para className
}) => {
  return (
    <iframe
      src={url}
      width={width} // Usamos width aquí
      height={height} // Usamos height aquí
      className={`rounded-xl ${className}`} // Aplicamos className directamente
      title="Iframe Example"
    />
  );
};

export default IframeComponent;
