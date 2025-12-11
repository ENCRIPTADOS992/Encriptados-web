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
    <div className="w-full max-w-[720px] min-w-[320px] sm:min-w-[560px] bg-[#1A1A1A] rounded-full px-2 sm:px-3 h-14 sm:h-16 overflow-hidden mx-auto">
      <div className="flex items-center h-full gap-1">
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
                className={`basis-1/3 grow-0 shrink-0 h-10 sm:h-12 text-center px-0 text-sm sm:text-base md:text-lg font-medium rounded-full transition-colors whitespace-nowrap
                  ${
                    selectedItem === item.value
                      ? "bg-[#2A2A2A] text-white"
                      : "text-[#CFCFCF] hover:bg-white/5"
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
