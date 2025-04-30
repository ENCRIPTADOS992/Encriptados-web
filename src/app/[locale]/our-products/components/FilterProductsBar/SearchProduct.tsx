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
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconClassName}`}
        >
          <SearchSvg />
        </div>
      )}

      <input
        type="text"
        placeholder={placeholder}
        {...register(name)}
        className={`py-4 text-[#085D77] border rounded-2xl border-[#085D77]  flex-grow ${
          iconPosition === "left" ? "pl-10 pr-3" : "pl-3 pr-10"
        } ${inputClassName} placeholder-[#085D77] outline-none`} // Eliminado el estilo de foco
        style={{ boxShadow: "none" }} // Opcional: Elimina el sombreado de enfoque
      />

      {iconPosition === "right" && (
        <div
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${iconClassName}`}
        >
          <SearchSvg color="#085D77" />
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
