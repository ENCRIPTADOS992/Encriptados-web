"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface FilterItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface ListOfFiltersButtonProps {
  items: FilterItem[];
  name: string;
}

const ListOfFiltersButton: React.FC<ListOfFiltersButtonProps> = ({
  items,
  name,
}) => {
  const { control, watch } = useFormContext();
  const selectedItem = watch(name);

  return (
    <div className="flex gap-x-4 justify-between  ">
      {items?.map((item, index) => (
        <Controller
          key={index}
          name={name}
          control={control}
          defaultValue=""
          render={({ field: { onChange } }) => (
            <button
              type="button"
              onClick={() => onChange(item.value)}
              className={`flex flex-col items-center justify-center  rounded-lg shadow-md transition-transform transform p-1 w-full ${
                selectedItem === item.value
                  ? "bg-[#E3F8FF] border-[#0AAEE1] border"
                  : "bg-white border border-gray-300"
              }`}
            >
              {item.icon && <span className="mb-2">{item.icon}</span>}
              <span
                className={`text-xs font-semibold ${
                  selectedItem === item.value
                    ? "text-[#085D77]"
                    : "text-[#7E7E7E]"
                }`}
              >
                {item.label}
              </span>
            </button>
          )}
        />
      ))}
    </div>
  );
};

export default ListOfFiltersButton;
