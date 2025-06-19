import SearchSvg from "@/shared/svgs/SearchSvg";
import React from "react";
import { useFormContext } from "react-hook-form";

const SearchProduct = ({
  name,
  placeholder,
  inputClassName = "",
  containerClassName = "",
  iconClassName = "",
  iconPosition = "right",
}: {
  name: string;
  placeholder: string;
  inputClassName?: string;
  containerClassName?: string;
  iconClassName?: string;
  iconPosition?: "left" | "right";
}) => {
  const { register } = useFormContext();

  return (
    <div className={`relative flex w-full ${containerClassName}`}>
      {iconPosition === "left" && (
        <div
          className={`absolute left-6 top-1/2 transform -translate-y-1/2 ${iconClassName}`}
        >
          <SearchSvg />
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        {...register(name)}
        className={`
          py-5 bg-[#222222] text-sm text-white rounded-[3rem] flex-grow
          ${iconPosition === "left" ? "pl-12 pr-6" : "pl-6 pr-12"}
          ${inputClassName}
          placeholder-[#CCCCCC] outline-none
        `}
        style={{ boxShadow: "none" }} 
      />

      {iconPosition === "right" && (
        <div
          className={`absolute right-6 top-1/2 transform -translate-y-1/2 ${iconClassName}`}
        >
          <SearchSvg color="#CCCCCC" />
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
