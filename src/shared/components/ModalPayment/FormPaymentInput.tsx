// src/shared/components/ModalPayment/FormPaymentInput.tsx
"use client";

import React from "react";

interface Props {
  placeholder?: string;
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  width?: string;
}

const FormPaymentInput: React.FC<Props> = ({ placeholder, value, handleChange, handleBlur, width = "100%" }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      style={{ width }}
      className="rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-primary focus:outline-none"
    />
  );
};

export default FormPaymentInput;
