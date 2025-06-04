// src/shared/components/ModalPayment/PaymentOption.tsx
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
      className={`
        flex flex-col items-center justify-center
        gap-1 rounded-lg border 
        ${isActive ? "border-primary bg-primary" : "border-gray-700 bg-gray-700"} 
        px-4 py-3 hover:border-primary hover:bg-gray-600 transition
        w-20
      `}
    >
      <div className="h-8 w-8">
        <option.icon className={isActive ? "text-white" : "text-gray-300"} />
      </div>
      <p className={`text-xs ${isActive ? "text-white" : "text-gray-300"}`}>{option.label}</p>
    </button>
  );
};

export default PaymentOption;
