"use client";
import React from "react";
import { cva } from "class-variance-authority";

const buttonStyles = cva("px-4 py-2 font-bold flex items-center", {
  variants: {
    intent: {
      primary: "bg-[#2AABEE] text-white",
      secondary: "bg-[#35CDFB] text-[#00516B]",
      solid: "text-white",
      ghost: "bg-transparent border border-black text-black",
      black:
        "bg-black text-white text-sm py-3 w-full flex items-center justify-center",
      dangerMetal: "bg-[#2D0505] text-[#FF6C6C] font-light",
      profile: "bg-[#1D1D1D] text-white font-medium",
      elegant: "bg-[#F4F4F4] text-black",
      cyan: "bg-transparent border border-[#70DEFF] text-cyan-500 font-light", // Nuevo estilo cyan
      support:
        "bg-[#EDF4F6] text-[#00516B] text-sm py-3 w-full flex items-center justify-center",
    },
    size: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
    rounded: "md",
  },
});

type ButtonProps = {
  intent?:
    | "primary"
    | "secondary"
    | "solid"
    | "ghost"
    | "black"
    | "dangerMetal"
    | "profile"
    | "elegant"
    | "support" // Ajuste para incluir support
    | "cyan";
  size?: "small" | "medium" | "large";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  customStyles?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean; // Agregado para habilitar la propiedad disabled
};

const Button: React.FC<ButtonProps> = ({
  intent = "solid",
  size = "medium",
  rounded = "md",
  customStyles = "",
  children,
  icon,
  iconPosition = "left",
  onClick,
  type = "button",
  disabled = false, // Valor por defecto de disabled
}) => {
  return (
    <button
      type={type}
      className={`${buttonStyles({ intent, size, rounded })} ${customStyles}`}
      onClick={onClick}
      disabled={disabled} // Se pasa el disabled al botón
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
