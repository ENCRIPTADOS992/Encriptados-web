"use client";

import { useFormContext, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

interface FilterItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface ListOfFiltersButtonProps {
  items?: FilterItem[];
  name: string;
}

export default function FiltersOffers({
  items,
  name = "navigation",
}: ListOfFiltersButtonProps) {
  const t = useTranslations("OffersPage");
  const { control, watch } = useFormContext();
  const selectedItem = watch(name);
  const filterItems = items ?? [
    { value: "sims", label: t("menu.sims") },
    { value: "aplicaciones", label: t("menu.apps") },
    { value: "sistemas", label: t("menu.system") },
  ];

  return (
    <nav className="w-full max-w-[720px] min-w-[280px] sm:min-w-[560px] bg-[#1A1A1A] rounded-full px-1.5 sm:px-3 h-12 sm:h-16 overflow-hidden mx-auto" aria-label={t("filtersAriaLabel")}>
      <div className="flex items-center h-full gap-1">
        {filterItems.map((item, index) => (
          <Controller
            key={index}
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { onChange } }) => (
              <button
                type="button"
                onClick={() => onChange(item.value)}
                aria-label={t("filterBy", { category: item.label })}
                aria-pressed={selectedItem === item.value}
                className={`basis-1/3 grow-0 shrink-0 h-9 sm:h-12 text-center px-1 text-[11px] min-[360px]:text-xs min-[400px]:text-sm sm:text-base md:text-lg font-medium rounded-full transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1A1A1A]
                  ${
                    selectedItem === item.value
                      ? "bg-[#2A2A2A] text-white"
                      : "text-[#CFCFCF] hover:bg-white/5"
                  }`}
              >
                {item.icon && <span className="mr-2" aria-hidden="true">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            )}
          />
        ))}
      </div>
    </nav>
  );
}
