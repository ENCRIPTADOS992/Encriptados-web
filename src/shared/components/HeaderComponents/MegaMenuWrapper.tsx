"use client";

import { useState } from "react";
import MegaMenu from "./MegaMenu";

type MenuItem = {
  title: string;
  link: string;
  image?: string;
  description?: string;
};

type Category = {
  title: string;
  description?: string;
  link: string;
  image?: string;
  items: MenuItem[];
};

type Props = {
  categories: Category[];
};

export default function MegaMenuWrapper({ categories }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);

  const openMegaMenu = () => setIsOpen(true);
  const closeMegaMenu = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openMegaMenu}>Open Mega Menu</button>
      <MegaMenu
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        closeMegaMenu={closeMegaMenu}
        isOpen={isOpen}
      />
    </div>
  );
}
