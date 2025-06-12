import React from "react";
import CardFeatureStandard from "./CardFeatureStandard";

interface CardType {
  title: string;
  description: string;
  icon: React.ReactElement;
}

interface ListOfCardsBProps {
  items: CardType[];
  columns?: number;
}

const ListOfCardsStandard: React.FC<ListOfCardsBProps> = ({ items, columns = 4 }) => {
  const gridClasses = `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-${columns} gap-6`;

  return (
    <div className={gridClasses}>
      {items.map((item, index) => (
        <CardFeatureStandard
          key={index}
          title={item.title}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default ListOfCardsStandard;
