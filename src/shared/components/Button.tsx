"use client";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "font-bold flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      intent: {
        // Botones principales basados en el diseño real
        primary: "bg-primary text-white hover:bg-[#0899CC] rounded-full",
        secondary: "bg-secondary text-[#00516B] hover:bg-[#2ABEE8] rounded-full",
        outline: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black rounded-full",
        outlineDark: "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white rounded-full",
        light: "bg-[#E3F8FF] text-[#1C1B1F] hover:bg-[#D0F2FF] rounded-full",
        dark: "bg-black text-white hover:bg-[#1A1A1A] rounded-full",
        ghost: "bg-transparent text-black hover:bg-black/5",
        link: "bg-transparent text-black hover:underline px-0 py-0 font-normal",
        
        // Variantes alternativas
        alternate1: "bg-[#054D61] text-white hover:bg-[#043A4A] rounded-full",
        alternate2: "bg-white text-black hover:bg-gray-100 border-2 border-gray-200 rounded-full",
        alternate3: "bg-[#00D4AA] text-white hover:bg-[#00B890] rounded-full",
        
        // Variantes legacy para compatibilidad (deprecated)
        solid: "text-white bg-primary rounded-md",
        black: "bg-black text-white py-3 w-full flex items-center justify-center",
        dangerMetal: "bg-[#2D0505] text-[#FF6C6C] font-light rounded-md",
        profile: "bg-[#1D1D1D] text-white font-medium rounded-md",
        elegant: "bg-[#F4F4F4] text-black rounded-md",
        cyan: "bg-transparent border border-[#70DEFF] text-cyan-500 font-light rounded-md",
        blueT: "bg-[#29A9EA] text-white hover:bg-[#1590cd] rounded-md",
        support: "bg-[#EDF4F6] text-[#00516B] py-3 w-full flex items-center justify-center rounded-lg",
      },
      size: {
        sm: "text-sm px-4 py-2",        // 14px
        md: "text-base px-6 py-3",      // 16px (default - más padding)
        lg: "text-lg px-8 py-4",        // 18px
        // Legacy aliases
        small: "text-sm px-4 py-2",     // 14px
        medium: "text-base px-6 py-3",  // 16px
        large: "text-lg px-8 py-4",     // 18px
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-[24px]",
        full: "rounded-full",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    compoundVariants: [
      {
        intent: ["primary", "secondary", "outline", "outlineDark", "light", "dark", "alternate1", "alternate2", "alternate3"],
        size: "sm",
        class: "px-6 py-2",
      },
      {
        intent: ["primary", "secondary", "outline", "outlineDark", "light", "dark", "alternate1", "alternate2", "alternate3"],
        size: "lg",
        class: "px-10 py-4",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "md",
      rounded: "full",
      fullWidth: false,
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  // Legacy prop support
  customStyles?: string;
}

const Button: React.FC<ButtonProps> = ({
  intent,
  size,
  rounded,
  fullWidth,
  children,
  icon,
  iconPosition = "left",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  customStyles = "", // Legacy support
}) => {
  // Merge className and customStyles for backward compatibility
  const finalClassName = `${className} ${customStyles}`.trim();

  return (
    <button
      type={type}
      className={`${buttonStyles({ intent, size, rounded, fullWidth })} ${finalClassName}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
