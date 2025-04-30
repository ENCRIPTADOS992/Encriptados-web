import React from "react";
import { Controller, useFormContext, FieldValues } from "react-hook-form";
import { motion } from "framer-motion";

export interface Option {
  label: string;
  value: string;
}

interface SelectCardProps {
  name: string;
  options: Option[];
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const MultiMenu: React.FC<SelectCardProps> = ({
  name,
  options,
  icon,
  iconPosition = "left",
}) => {
  const { control, watch, setValue } = useFormContext<FieldValues>();
  const selectedValue = watch(name);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange } }) => (
        <div className="flex flex-row gap-2 md:flex-row gap-y-2 md:gap-x-2 w-2/12">
          {options.map((option, index) => (
            <motion.div
              key={index}
              onClick={() => {
                setValue(name, option.value);
                onChange(option.value);
              }}
              className={`flex px-5 py-1 border w-full justify-center items-center rounded-lg cursor-pointer ${
                selectedValue === option.value
                  ? " bg-[#F2FCFF] font-bold text-[#0B90B9] shadow-xl text-xs "
                  : "bg-gray-100 border-gray font-bold text-gray-500 text-xs"
              }`}
              initial={{ scale: 1 }} // Estado inicial
              whileTap={{ scale: 0.95 }} // Escalar al hacer clic
              transition={{ type: "spring", stiffness: 300 }} // Configuración de la animación
            >
              {icon && iconPosition === "left" && (
                <div className="mr-2">
                  {" "}
                  {/* Espaciado entre el icono y el texto */}
                  {icon}
                </div>
              )}
              <span>{option.label}</span>
              {icon && iconPosition === "right" && (
                <div className="ml-2">
                  {" "}
                  {/* Espaciado entre el texto y el icono */}
                  {icon}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    />
  );
};

export default MultiMenu;
