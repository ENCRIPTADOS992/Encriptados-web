// ProductCardGrid.tsx
"use client";
import React from "react";
import Button from "@/shared/components/Button";
import ShoppingCart from "@/shared/svgs/ShoppingCart";
import TelegramButton from "@/shared/components/TelegramButton";

interface ProductCardGridProps {
  id?: number;
  name: string;
  description?: string;
  price: string;
  image: string;
  checks?: { name: string }[];
}

const ProductCardGrid: React.FC<ProductCardGridProps> = ({
  id,
  name,
  description,
  price,
  image,
  checks = [],
}) => {
  return (
    <div className="w-full rounded-lg overflow-hidden flex flex-col border p-3">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h2 className="text-lg font-bold text-gray-800">{name}</h2>
      {description && (
        <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
      )}

      <div className="mt-2 space-y-1">
        {checks.map((feature, key) => (
          <div key={key} className="flex items-center gap-2">
            {/* tu ícono aquí si quieres */}
            <span className="text-xs text-gray-700">{feature.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-col">
        <span className="text-xs text-gray-500">Desde</span>
        <span className="text-lg font-bold text-gray-800">{price} USD</span>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <Button
          icon={<ShoppingCart color="white" />}
          iconPosition="right"
          rounded="full"
          intent="black"
        >
          Comprar Ahora
        </Button>
        <TelegramButton />
      </div>
    </div>
  );
};

export default ProductCardGrid;
