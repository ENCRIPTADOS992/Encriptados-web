"use client";

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

export default function FiltersOffers({
  items = [
    { value: "sims", label: "SIMS" },
    { value: "aplicaciones", label: "Aplicaciones" },
    { value: "sistemas", label: "Sistemas" },
  ],
  name = "navigation",
}: ListOfFiltersButtonProps) {
  const { control, watch } = useFormContext();
  const selectedItem = watch(name);

  return (
    <div className="w-full bg-[#141414] rounded-full p-4">
      <div className="flex gap-x-1">
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
                className={`flex-1 px-4 py-3 text-sm sm:text-base md:text-lg font-medium rounded-full transition-colors
                  ${
                    selectedItem === item.value
                      ? "bg-[#2A2A2A] text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            )}
          />
        ))}
      </div>
    </div>
  );
}
