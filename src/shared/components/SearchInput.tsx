import SearchSvg from "@/shared/svgs/SearchSvg";
import React from "react";
import { useFormContext } from "react-hook-form";

const SearchInput = ({
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
    <div className={`relative flex items-center ${containerClassName}`}>
      {iconPosition === "left" && (
        <div
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconClassName}`}
        >
          <SearchSvg />
        </div>
      )}

      <input
        type="text"
        placeholder={placeholder}
        {...register(name)}
        className={`py-4 border rounded-full border-gray-400  flex-grow ${
          iconPosition === "left" ? "pl-14 pr-6" : "pl-6 pr-14"
        } ${inputClassName}`}
      />

      {iconPosition === "right" && (
        <div
          className={`absolute right-6 top-1/2 transform -translate-y-1/2 ${iconClassName}`}
        >
          <SearchSvg />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
