"use client";
import React from "react";

interface FilterItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface ListOfFiltersButtonProps {
  items: FilterItem[];
  value: string;
  onChange: (value: string) => void;
}

const ListOfFiltersButton: React.FC<ListOfFiltersButtonProps> = ({ items, value, onChange }) => {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-2 justify-between"
    >
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onChange(item.value)}
          className={`flex flex-col items-center justify-center rounded-lg shadow-md transition-transform transform p-1 w-full ${
            value === item.value
              ? "bg-[#3E3E3E] border-[#CCCCCC] border"
              : "bg-[#222222] border-[#3E3E3E] border"
          }`}
        >
          {item.icon && <span className="mb-2">{item.icon}</span>}
          <span
            className={`text-xs font-semibold ${
              value === item.value ? "text-[#CCCCCC]" : "text-[#7E7E7E]"
            }`}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ListOfFiltersButton;