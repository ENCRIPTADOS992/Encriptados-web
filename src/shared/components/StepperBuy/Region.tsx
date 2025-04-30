import React from "react";
import { Controller, useFormContext, FieldValues } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface SelectCardProps {
  name: string;
  options: Option[];
}

const Region: React.FC<SelectCardProps> = ({ name, options }) => {
  const { control, watch, setValue } = useFormContext<FieldValues>();
  const selectedValue = watch(name);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange } }) => (
        <div className="w-full flex gap-4">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setValue(name, option.value);
                onChange(option.value);
              }}
              className={`flex w-full sm:w-[calc(33.33%-8px)] items-center justify-center py-4 cursor-pointer shadow-md rounded-full text-center transition duration-200 ease-in-out ${
                selectedValue === option.value
                  ? "bg-white font-bold"
                  : "bg-gray-300"
              }`} // Cambia el fondo según la selección
            >
              <span
                className={`${
                  selectedValue === option.value
                    ? "text-black"
                    : "text-gray-600"
                } text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl`}
              >
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default Region;
