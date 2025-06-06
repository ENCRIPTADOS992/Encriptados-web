"use client";

import React from "react";

interface Props {
  placeholder?: string;
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  width?: string;
}

const FormPaymentInput: React.FC<Props> = ({
  placeholder,
  value,
  handleChange,
  handleBlur,
  width = "100%",
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      style={{ width }}
      className="rounded-md border border-gray-300 bg-[#f6f9fb] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"

    />
  );
};

export default FormPaymentInput;
