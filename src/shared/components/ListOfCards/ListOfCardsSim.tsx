"use client";

import React from "react";
import CardFeatureSim from "./CardFeatureSim";

interface CardItem {
  icon: React.ReactElement;
  title: string;
  description: string;
}

interface ListOfCardsSimProps {
  items: CardItem[];
}

const ListOfCardsSim: React.FC<ListOfCardsSimProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {items.map((item, index) => (
        <CardFeatureSim
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default ListOfCardsSim;
