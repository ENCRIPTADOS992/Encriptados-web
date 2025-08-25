// src/shared/components/ModalPayment/new/PurchaseHeader.tsx
"use client";

import React from "react";
import Image from "next/image";

type Variant = {
  id: number;
  licensetime: number;
  price: number;
  sku?: string;
  image?: string;
};

type ProductLike = {
  name?: string;
  price?: number | string;
  licensetime?: number | string;
  images?: { src: string }[];
  variants?: Variant[];
};

type Props = {
  product: ProductLike | undefined;
  selectedVariantId?: number | null;
  onChangeVariant?: (id: number) => void;

  quantity: number;
  setQuantity: (n: number) => void;

  coupon: string;
  setCoupon: (s: string) => void;
  onApplyCoupon: () => void;

  unitPrice: number;
};

const PurchaseHeader: React.FC<Props> = ({
  product,
  selectedVariantId,
  onChangeVariant,
  quantity,
  setQuantity,
  coupon,
  setCoupon,
  onApplyCoupon,
  unitPrice,
}) => {
  const inc = () => setQuantity(Math.min(99, quantity + 1));
  const dec = () => setQuantity(Math.max(1, quantity - 1));

  const variants = product?.variants ?? [];
  const showSelect = variants.length > 1;
  const [showCoupon, setShowCoupon] = React.useState(false);

  const currentMonths =
    variants.find((v) => v.id === (selectedVariantId ?? -1))?.licensetime ??
    variants[0]?.licensetime ??
    (Number(product?.licensetime) || 12);

  const total = unitPrice * quantity;

  return (
    <div className="w-full">
      {/* Título */}
      <div className="text-center text-[13px] md:text-[13px] lg:text-sm font-medium text-gray-600 pb-2">
        Detalles de compra
      </div>

      {/* Layout 2 columnas: imagen izquierda (306x194) | derecha 306 */}
      <div className="mt-[22px] flex flex-col sm:flex-row sm:items-start gap-[22px]">
        {/* Izquierda: imagen */}
        <div className="relative w-[306px] h-[194px] overflow-hidden rounded-[8px] mx-auto md:mx-0 flex-none">
          <Image
            src={product?.images?.[0]?.src ?? "/your-image-placeholder.png"}
            alt={product?.name ?? "Producto"}
            fill
            className="object-cover"
            sizes="306px"
            priority
          />
        </div>

        {/* Derecha: info */}
        <div className="mt-[22px] md:mt-0 w-[306px] max-w-[306px] flex-none shrink-0 grow-0 flex flex-col gap-[16px]">
          {/* Encabezado: nombre + precio */}
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-semibold text-black truncate">
              {product?.name ?? "Producto"}
            </h3>
            <div className="text-[16px] font-normal text-[#141414]">
              {unitPrice} <span className="font-normal">USD</span>
            </div>
          </div>

          {/* Fila: Cantidad */}
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-[#3D3D3D]">Cantidad</span>
            <div className="flex items-center bg-[#EBEBEB] rounded-[6px] h-[36px] px-[14px] gap-2 select-none">
              <button
                onClick={dec}
                className="text-[16px] font-bold leading-none"
                aria-label="Disminuir"
                type="button"
              >
                –
              </button>
              <span className="min-w-[18px] text-center text-[16px]">
                {quantity}
              </span>
              <button
                onClick={inc}
                className="text-[16px] font-bold leading-none"
                aria-label="Aumentar"
                type="button"
              >
                +
              </button>
            </div>
          </div>

          {/* Fila: Licencia */}
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-[#3D3D3D]">Licencia</span>

            {showSelect ? (
              <div className="relative">
                <select
                  aria-label="Duración de licencia"
                  value={selectedVariantId ?? variants[0]?.id ?? ""}
                  onChange={(e) => onChangeVariant?.(Number(e.target.value))}
                  className="
                    appearance-none
                    w-[120px] h-[31px]
                    bg-[#EBEBEB] rounded-[6px]
                    pl-[14px] pr-8 text-[14px] font-normal text-black
                    focus:outline-none
                  "
                >
                  {variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.licensetime} Meses
                    </option>
                  ))}
                </select>
                <span
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#3D3D3D]"
                  aria-hidden="true"
                >
                  ▾
                </span>
              </div>
            ) : (
              <div className="w-[120px] h-[31px] bg-[#EBEBEB] rounded-[6px] px-[14px] flex items-center text-[14px] font-normal text-black select-none">
                {currentMonths} Meses
              </div>
            )}
          </div>

          {/* Fila: Total a pagar */}
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-[#3D3D3D]">Total a pagar</span>
            <span className="text-[16px] font-bold text-[#141414]">
              {total} USD
            </span>
          </div>
          {/* Link / Input cupón */}
          {!showCoupon ? (
            <button
              type="button"
              onClick={() => setShowCoupon(true)}
              className="self-end text-[12px] underline text-[#3D3D3D]"
            >
              Ingresa código de promoción
            </button>
          ) : (
            <div className="w-full h-[42px] flex items-center justify-between rounded-[8px] border-2 border-[#3D3D3D] pl-[12px] pr-[6px]">
              <input
                placeholder="Ingresa el código"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 bg-transparent outline-none placeholder-black/50 text-[14px]"
              />
              <button
                onClick={onApplyCoupon}
                type="button"
                className="h-[31px] rounded-[6px] bg-black text-white text-[12px] font-bold px-[12px] flex items-center justify-center"
              >
                Aplicar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHeader;
