import React, { ReactElement } from "react";
import Card from "./Card";

interface CardType {
  title: string;
  description: string;
  icon: ReactElement;
}

interface ListOfFeatureCardsProps {
  items: CardType[];
  centered?: boolean;
  bgIconCard?: string;
  columns?: number;
  bgColorCard?: string; // Nueva prop para el color de fondo de la tarjeta
  titleColor?: string; // Nueva prop para el color del título
  descriptionColor?: string; // Nueva prop para el color de la descripción
  padding?: number;
}

const ListOfCards: React.FC<ListOfFeatureCardsProps> = ({
  items,
  centered,
  bgIconCard,

  columns = 4,
  bgColorCard = "white", // Valor por defecto para el color de fondo
  titleColor = "black", // Valor por defecto para el color del título
  descriptionColor = "gray", // Valor por defecto para el color de la descripción
}) => {
  const gridClasses = `grid grid-cols-1 sm:grid-cols-${Math.min(
    columns,
    2
  )} md:grid-cols-${Math.min(columns, 4)} lg:grid-cols-${columns} gap-4`;

  return (
    <div className={gridClasses}>
      {items?.map((item, index) => (
        <Card
          bgIconCard={bgIconCard}
          key={index}
          title={item.title}
          description={item.description}
          icon={item.icon}
          centered={centered}
          bgColorCard={bgColorCard} // Pasando el color de fondo a Card
          titleColor={titleColor} // Pasando el color del título a Card
          descriptionColor={descriptionColor} // Pasando el color de la descripción a Card
        />
      ))}
    </div>
  );
};

export default ListOfCards;
