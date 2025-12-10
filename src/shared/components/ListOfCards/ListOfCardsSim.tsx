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
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
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
