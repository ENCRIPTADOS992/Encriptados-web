"use client";
import React, { useState } from "react";
import CheckProductIcon from "./icon/CheckProductIcon";
import Button from "@/shared/components/Button";
import SupportContact from "@/shared/svgs/SupportContact";
import ShoppingCart from "@/shared/svgs/ShoppingCart";
import { useProductById } from "../context/ProductByIdContext";

export default function CardProduct() {
  const [selectedPlan, setSelectedPlan] = useState<number>(); // Estado inicial sin selección

  const { currentProduct } = useProductById();

  console.log(currentProduct?.variants);

  return (
    <div className="w-full rounded-lg overflow-hidden flex flex-col">
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          {currentProduct?.title}
        </h2>
        <p className="text-sm text-gray-600">{currentProduct?.description}</p>
        <div className="space-y-3">
          {currentProduct?.advantages.map((feature, key) => (
            <div key={key} className="flex items-center gap-2">
              <CheckProductIcon />
              <span className="text-sm text-gray-700">{feature.title}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {currentProduct?.variants.map((variant) => (
            <label
              key={variant.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="relative">
                <input
                  type="radio"
                  value={variant.id}
                  checked={selectedPlan === variant.id}
                  onChange={() => setSelectedPlan(variant.id)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border rounded-full ${
                    selectedPlan === variant.id
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPlan === variant.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {variant.name} ({variant.price}$ {variant.currency})
              </span>
            </label>
          ))}
        </div>

        <div className="space-y-2 flex-col flex">
          <hr className="border-t border-1 border-[#D9D9D9]" />
          <p className="text-sm text-gray-500">Desde</p>
          <p className="text-xl md:text-2xl font-bold text-gray-800 pb-2">
            {selectedPlan
              ? currentProduct?.variants.find(
                  (variant) => variant.id === selectedPlan
                )?.price
              : currentProduct?.price}
            $ USD
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          icon={<ShoppingCart color="white" />}
          iconPosition="right"
          rounded="full"
          intent="black"
        >
          Comprar Ahora
        </Button>

        <Button
          icon={<SupportContact color="#00516B" />}
          iconPosition="right"
          rounded="full"
          intent="support"
        >
          Chat soporte
        </Button>
      </div>
    </div>
  );
}
