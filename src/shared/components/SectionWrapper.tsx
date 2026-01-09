"use client";

import React, { ReactNode, HTMLAttributes } from "react";

interface SectionWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  maxWidth?: "default" | "header" | "full";
}

export default function SectionWrapper({
  children,
  className = "",
  maxWidth = "default",
  style,
  ...rest
}: SectionWrapperProps) {
  const maxWidthClass = {
    default: "max-w-screen-xl", // 1280px
    header: "max-w-[1400px]", // 1400px para header (coincide con MegaMenu)
    full: "max-w-full",
  }[maxWidth];

  return (
    <div
      className={`w-full ${maxWidthClass} mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}
