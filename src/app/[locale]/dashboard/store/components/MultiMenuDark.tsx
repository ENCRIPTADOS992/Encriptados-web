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

const MultiMenuDark: React.FC<SelectCardProps> = ({
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
        <div className="flex flex-row gap-y-2 md:gap-x-2 w-12/12 gap-2 md:w-3/12 ">
          {options.map((option, index) => (
            <motion.div
              key={index}
              onClick={() => {
                setValue(name, option.value);
                onChange(option.value);
              }}
              className={`flex border w-full justify-center items-center  cursor-pointer rounded-full ${
                selectedValue === option.value
                  ? " bg-[#1D1D1D] font-bold rounded-full text-white shadow-xl text-xs  p-4 "
                  : "bg-gray-100 border-gray font-bold text-gray-500 text-xs  p-4 "
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

export default MultiMenuDark;
