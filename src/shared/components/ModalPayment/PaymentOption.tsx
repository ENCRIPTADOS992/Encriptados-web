"use client";

import React from "react";

interface Option {
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  value: string;
}

interface Props {
  option: Option;
  activeOption: string | null;
  setActiveOption: (value: string) => void;
}

const PaymentOption: React.FC<Props> = ({ option, activeOption, setActiveOption }) => {
  const isActive = activeOption === option.value;

  return (
    <button
      onClick={() => setActiveOption(option.value)}
      className={`w-full rounded-lg px-4 py-3 border text-center transition
        ${isActive ? "bg-primary border-primary text-white" : "bg-[#f6f9fb] border-gray-200 text-gray-700"}
        hover:border-primary hover:bg-blue-50`}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <option.icon
          className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-600"}`}
        />
        <span className="text-xs font-medium">{option.label}</span>
      </div>
    </button>
  );
};

export default PaymentOption;
