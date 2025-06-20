"use client";

import React, { ReactNode, HTMLAttributes } from "react";

interface SectionWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  children,
  className = "",
  style,
  ...rest
}: SectionWrapperProps) {
  return (
    <div
      className={`w-full max-w-screen-xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}
