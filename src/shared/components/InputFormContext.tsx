import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { Path, FieldValues, useFormContext, FieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  light?: boolean;
  dark?: boolean;
  rounded?: "xs" | "sm" | "lg" | "xl" | "full";
  customClassName?: string; // Nueva propiedad opcional
}

const inputStyles = cva("block w-full px-4 py-2 transition-all", {
  variants: {
    intent: {
      primary: "bg-[#191919] border-[#6A6A6A] text-[#6A6A6A]",
      error:
        "bg-[#191919] border-red-500 text-[#6A6A6A] focus:border-red-500 focus:ring-2 focus:ring-red-300",
      light: "bg-[#F5F5F5] border-[#6A6A6A] text-[#191919]",
      dark: "bg-[#121212] border-[#6A6A6A] text-[#ffffff]",
    },
    rounded: {
      xs: "rounded-sm",
      sm: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    intent: "primary",
    rounded: "lg",
  },
});

export const InputFormContext = <T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  icon,
  iconPosition = "left",
  light = false,
  dark = false,
  rounded = "full",
  customClassName = "", // Valor predeterminado vacío
}: InputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const error = errors[name] as FieldError | undefined;
  const errorMessage = error?.message?.toString() || "";

  return (
    <div className="relative mb-6">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold mb-1 text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === "left" && (
          <span className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          className={`${inputStyles({
            intent: error
              ? "error"
              : dark
              ? "dark"
              : light
              ? "light"
              : "primary",
            rounded,
          })} ${customClassName}`} // Combinar estilos predeterminados con customClassName
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? `${name}-error` : undefined}
          {...register(name)}
          style={{
            paddingLeft: icon && iconPosition === "left" ? "3rem" : "1rem",
            paddingRight: icon && iconPosition === "right" ? "3rem" : "1rem",
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
        {icon && iconPosition === "right" && (
          <span className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
      </div>
      {errorMessage && (
        <p
          id={`${name}-error`}
          className="text-red-600 text-sm mt-2"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};
