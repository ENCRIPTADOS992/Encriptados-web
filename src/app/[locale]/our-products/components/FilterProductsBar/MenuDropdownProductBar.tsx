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
}

const MenuDropdownProductBar: React.FC<MenuDropdownProductBarProps> = ({
  options,
  name,
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
          menuButton={
            <MenuButton
              className={`flex items-center justify-between border rounded-2xl shadow-md p-4 w-full transition duration-150 ease-in-out ${
                selectedItem
                  ? "border-[#0AAEE1] text-[#085D77] bg-[#E3F8FF]"
                  : "border-gray-300 text-[#7E7E7E] bg-white"
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
              onClick={() => onChange(item.value)} // Actualiza el valor al seleccionar
              className={`flex items-center hover:bg-[#E3F8FF] transition duration-150 ease-in-out bg-[#FAFAFA] m-4 rounded-xl ${
                selectedItem === item.value ? "bg-cyan-50" : ""
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
                    ? "text-[#085D77] ]"
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
