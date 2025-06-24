"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import type { Product } from "@/features/products/types/AllProductsResponse"; // ✅ tipo correcto
import { FC, useState } from "react";

interface CardProductItemProps {
  product: Product;
  showPeriodSelector?: boolean;
  periodOptions?: string[];
}

const CardProductItem: FC<CardProductItemProps> = ({
  product,
  showPeriodSelector = false,
  periodOptions = [],
}) => {
  const [period, setPeriod] = useState(periodOptions[0] || "");
  const { openModal } = useModalPayment();
  const router = useRouter();

  return (
    <div className="bg-[#181818] dark:bg-[#131313] text-black dark:text-white rounded-xl p-6 w-full max-w-md shadow-lg">
      <div className="w-full flex justify-center mb-4">
        <Image
          src={product.images[0]?.src || "/images/fallback.png"} // ✅ acceso correcto
          alt={product.name}
          width={140}
          height={140}
          className="object-contain"
        />
      </div>

      <h3 className="text-xl text-white font-bold text-center mb-2">{product.name}</h3>

      <p className="text-center text-xs text-white dark:text-gray-400 mb-4">
        Desde ${product.price} USD
      </p>

      {showPeriodSelector && (
        <div className="flex justify-center gap-3 mb-4">
          {periodOptions.map((option) => {
            const selected = period === option;
            return (
              <button
                key={option}
                onClick={() => setPeriod(option)}
                className={`px-4 py-1 rounded-full border text-sm font-medium transition-all duration-200 ${
                  selected
                    ? "bg-[#10B4E7] text-white border-[#10B4E7]"
                    : "border-gray-400 text-gray-600"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={() => openModal({ productid: product.id.toString(), languageCode: "es" })}
          type="button"
          className="w-full bg-[#10B4E7] hover:bg-[#7EE0FF] text-black font-bold py-2 rounded-full transition-colors"
        >
          Comprar ahora
        </button>
        <button
          onClick={() => router.push(`/mas-informacion?id=${product.id}`)}
          className="text-sm text-[#10B4E7] underline text-center hover:text-[#7EE0FF]"
        >
          Más información
        </button>
      </div>
    </div>
  );
};

export default CardProductItem;
