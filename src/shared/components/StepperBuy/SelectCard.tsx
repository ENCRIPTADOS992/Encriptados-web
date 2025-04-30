"use client";

import React, { ReactNode } from "react";
import { Controller, useFormContext, FieldValues } from "react-hook-form";

export interface Option {
  label: string;
  value: string;
  icon: ReactNode;
}

interface SelectCardProps {
  name: string;
  options: Option[] | null;
}

const SelectCard: React.FC<SelectCardProps> = ({ name, options }) => {
  const { control, watch, setValue } = useFormContext<FieldValues>();
  const selectedValue = watch(name);

  return (
    <div className="w-full px-4 sm:max-w-none sm:px-0 mt-10">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange } }) => (
          <div className="flex flex-nowrap sm:flex-wrap justify-between sm:justify-center items-center gap-2 sm:gap-4 w-full">
            {options?.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setValue(name, option.value);
                  onChange(option.value);
                }}
                className={`flex flex-1 sm:flex-initial flex-col items-center justify-center py-2 px-3 sm:p-4 min-w-0 sm:min-w-[12rem] h-12 sm:h-48 cursor-pointer rounded-full sm:rounded-lg text-center text-sm sm:text-base font-bold transition duration-200 ease-in-out ${
                  selectedValue === option.value
                    ? "bg-white text-primary border-2 border-primary sm:border-4 sm:border-[#35CDFB] shadow-sm sm:shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 sm:border-none sm:hover:bg-gray-100"
                }`}
              >
                {option.icon && (
                  <div className="mb-1 hidden sm:block">{option.icon}</div>
                )}
                <span className="w-full text-xs sm:text-sm whitespace-normal leading-tight">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default SelectCard;
