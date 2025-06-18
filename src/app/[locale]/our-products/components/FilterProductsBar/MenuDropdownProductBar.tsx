"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css"; // Asegúrate de incluir los estilos
import { useTranslations } from "next-intl";

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface MenuDropdownProductBarProps {
  options: Option[];
  name: string;
  onChangeExternal?: (value: string) => void; 
}

const MenuDropdownProductBar: React.FC<MenuDropdownProductBarProps> = ({
  options,
  name,
  onChangeExternal,
}) => {
  const { control, watch } = useFormContext();
  const selectedItem = watch(name);

  const t = useTranslations("OurProductsPage");

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={selectedItem || ""} // Usa el valor de selectedItem como defaultValue
      render={({ field: { onChange } }) => (
        <Menu
          gap={10}
          menuClassName="bg-[#222222] border-none p-2 rounded-xl"
          menuButton={
            <MenuButton
              className={`flex items-center justify-between border rounded-2xl shadow-md p-4 w-full transition duration-150 ease-in-out ${
                selectedItem
                  ? "border-[#CCCCCC] text-[#CCCCCC] bg-[#3E3E3E]"
                  : "border-gray-300 text-[#7E7E7E] bg-[#222222]"
              }`}
            >
              <span className="flex items-center gap-x-2">
                {/* Mostrar el icono en el botón de selección si está presente */}
                {selectedItem &&
                  options.find((option) => option.value === selectedItem)?.icon}
                {/* Mostrar la etiqueta seleccionada o el placeholder */}
                <span>
                  {selectedItem
                    ? options.find((option) => option.value === selectedItem)
                        ?.label || t("filterProducts.selectPlacerholder")
                    : t("filterProducts.selectPlacerholder")}
                </span>
              </span>
            </MenuButton>
          }
        >
          {options.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                onChange(item.value);  
                if (onChangeExternal) {
                  console.log(`[MenuDropdownProductBar] onChangeExternal ejecutado con: ${item.value}`);
                  onChangeExternal(item.value);
                }
              }}
              className={`flex items-center hover:bg-[#3E3E3E] transition duration-150 ease-in-out bg-[#222222] m-4 rounded-xl ${
                selectedItem === item.value ? "bg-[#3E3E3E]" : ""
              }`}
            >
              <input
                type="radio"
                name={name}
                value={item.value}
                checked={selectedItem === item.value}
                readOnly
                className={`mr-2 accent-cyan-700 ${
                  selectedItem === item.value ? "" : ""
                }`}
              />
              {/* Mostrar el icono de la opción */}
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span
                className={`font-semibold py-2 ${
                  selectedItem === item.value
                    ? "text-[#CCCCCC] ]"
                    : "text-[#7E7E7E]"
                }`}
              >
                {item.label}
              </span>
            </MenuItem>
          ))}
        </Menu>
      )}
    />
  );
};

export default MenuDropdownProductBar;
