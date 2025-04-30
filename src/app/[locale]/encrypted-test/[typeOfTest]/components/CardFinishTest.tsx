import React from "react";

interface ComponentProps {
  icon: React.ReactNode; // Aceptar un elemento JSX
  title: string;
  iconPosition?: "left" | "right";
}

export default function Component({
  icon,
  title,
  iconPosition = "left",
}: ComponentProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-[#161616] p-6 text-white backdrop-blur-sm">
      {iconPosition === "left" && icon && (
        <div className="flex-shrink-0">{icon}</div>
      )}
      <h2 className="text-base font-medium text-gray-200">{title}</h2>
      {iconPosition === "right" && icon && (
        <div className="flex-shrink-0">{icon}</div>
      )}
    </div>
  );
}
