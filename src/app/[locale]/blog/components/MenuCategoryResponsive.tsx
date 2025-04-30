"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css"; // Asegúrate de incluir los estilos básicos de la librería
import { useTranslations } from "next-intl";
import ArrowDown from "../icons/ArrowDown";

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface MenuDropdownProductBarProps {
  options: Option[];
  name: string;
}

const MenuCategoryResponsive: React.FC<MenuDropdownProductBarProps> = ({
  options,
  name,
}) => {
  const { control, watch } = useFormContext();
  const selectedItem = watch(name);

  const t = useTranslations("OurProductsPage");

  return (
    <div className="flex items-center justify-between w-full px-4">
      <h1 className="text-white text-sm font-bold w-6/12">Categoría:</h1>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange } }) => (
          <Menu
            menuButton={
              <MenuButton
                className={`flex items-center justify-between rounded-full shadow-md p-4 w-6/12 text-sm transition duration-150 ease-in-out ${
                  selectedItem
                    ? "border-[#0AAEE1] text-white bg-[#2A2A2A]"
                    : "text-[#7E7E7E] bg-[#2A2A2A]"
                }`}
              >
                <span>
                  {selectedItem
                    ? options.find((option) => option.value === selectedItem)
                        ?.label || t("filterProducts.selectPlacerholder")
                    : t("filterProducts.selectPlacerholder")}
                </span>
                <ArrowDown />
              </MenuButton>
            }
            menuClassName="bg-red-500 rounded-lg p-2 shadow-lg text-sm" // Fondo rojo y estilos para el menú
          >
            {options.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => onChange(item.value)}
                className={`flex items-center transition duration-150 ease-in-out m-1 p-2 rounded-lg text-sm ${
                  selectedItem === item.value
                    ? "bg-[#3A3A3A] text-white"
                    : "bg-transparent text-[#7E7E7E] hover:bg-[#3A3A3A] hover:text-white"
                }`}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                <span className="font-semibold">{item.label}</span>
              </MenuItem>
            ))}
          </Menu>
        )}
      />
    </div>
  );
};

export default MenuCategoryResponsive;
