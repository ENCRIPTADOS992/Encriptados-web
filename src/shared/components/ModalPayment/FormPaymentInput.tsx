"use client";

import React from "react";

interface Props {
  name?: string;
  placeholder?: string;
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  width?: string;
  type?: string;
  className?: string;
}

const FormPaymentInput: React.FC<Props> = ({
  name,
  placeholder,
  value,
  handleChange,
  handleBlur,
  width = "100%",
  type = "text",
  className,
}) => {
  return (
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      style={{ width }}
      className={`rounded-md bg-[#f6f9fb] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-500 leading-tight focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
        className ? className : "border border-gray-300"
      }`}
    />
  );
};

export default FormPaymentInput;
