import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  centered?: boolean;
  bgIconCard?: string;
  bgColorCard?: string; // Nueva prop para el color de fondo
  titleColor?: string; // Nueva prop para el color del título
  descriptionColor?: string; // Nueva prop para el color de la descripción
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,

  centered,
  bgIconCard,
  bgColorCard,
  titleColor,
  descriptionColor,
}) => {
  return (
    <div
      className={`p-4 rounded-2xl shadow ${centered ? "text-center" : ""}`}
      style={{ backgroundColor: bgColorCard }} // Aplicando el color de fondo
    >
      <div
        className="icon"
        style={{
          padding: 10,
          borderRadius: 20,
          backgroundColor: bgIconCard,
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold" style={{ color: titleColor }}>
        {title}
      </h3>{" "}
      {/* Aplicando el color del título */}
      <p className="text-gray-700 mt-2" style={{ color: descriptionColor }}>
        {description}
      </p>{" "}
      {/* Aplicando el color de la descripción */}
    </div>
  );
};

export default Card;
