// src/shared/components/ModalPayment/atoms/ModalStack.tsx
"use client";
import React from "react";
import clsx from "clsx";

export default function ModalStack({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        "w-full ipad:w-[472px] lg:w-[472px] mx-auto flex flex-col gap-4 h-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
