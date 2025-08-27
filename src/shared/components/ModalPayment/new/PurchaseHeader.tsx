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

  shipping?: number;
  showLicense?: boolean;
  currency?: string;
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
  shipping,
  showLicense = true,
  currency = "USD",
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

  const subtotal = unitPrice * quantity;
  const total = Math.max(subtotal + (shipping ?? 0), 0);

  return (
    <div className="w-full">
      {/* Título */}
      <div className="text-center text-[13px] md:text-[13px] lg:text-sm font-medium text-gray-600 pb-2">
        Detalles de compra
      </div>

      {/* Layout 2 columnas: imagen izquierda (306x194) | derecha 306 */}
      <div className="mt-[22px] flex flex-col sm:flex-row sm:items-start gap-[22px]">
        {/* Izquierda: imagen */}
        <div
          className="
    relative overflow-hidden mx-auto sm:mx-0 flex-none
    h-[152px] w-[382px] rounded-t-[12px]        /* móvil (xs) */
    sm:h-[194px] sm:w-[282px] sm:rounded-[12px] /* sm */
    md:h-[194px] md:w-[282px] md:rounded-[12px] /* md */
    ipad:h-[194px] ipad:w-[282px] ipad:rounded-[12px] /* 744 */
    lg:h-[194px] lg:w-[306px] lg:rounded-[8px]  /* lg+ */
    xl:h-[194px] xl:w-[306px] xl:rounded-[8px]
  "
        >
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
        <div className="mt-[22px] md:mt-0 w-[306px] max-w-[306px] flex-none shrink-0 grow-0 flex flex-col gap-[16px] px-3 sm:px-4 ipad:px-3 lg:px-4">
          {/* Encabezado: nombre + precio */}
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-semibold text-black truncate">
              {product?.name ?? "Producto"}
            </h3>
            <div
              className="text-[16px] font-normal text-[#141414]
                        translate-x-20
                        sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5
                        lg:translate-x-0 xl:translate-x-0"
            >
              {unitPrice} <span className="font-normal">USD</span>
            </div>
          </div>

          {/* Fila: Cantidad */}
          <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 sm:gap-x-4">
            <span className="text-[14px] text-[#3D3D3D]">Cantidad</span>
            <div
              className="justify-self-end flex items-center bg-[#EBEBEB] rounded-[6px] h-[36px] px-[14px] gap-2 select-none
                translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0"
            >
              {/* stepper */}
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

          {/* Fila: Licencia (ocultable) */}
          {showLicense && (
            <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 sm:gap-x-4">
              <span className="text-[14px] text-[#3D3D3D]">Licencia</span>
              {showSelect ? (
                <div
                  className="relative justify-self-end
                  translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0"
                >
                  <select
                    aria-label="Duración de licencia"
                    value={selectedVariantId ?? variants[0]?.id ?? ""}
                    onChange={(e) => onChangeVariant?.(Number(e.target.value))}
                    className="appearance-none w-[120px] h-[31px] bg-[#EBEBEB] rounded-[6px] pl-[14px] pr-8 text-[14px] font-normal text-black focus:outline-none"
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
                <div
                  className="justify-self-end w-[120px] h-[31px] bg-[#EBEBEB] rounded-[6px] px-[14px] flex items-center text-[14px] font-normal text-black select-none
                  translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0"
                >
                  {currentMonths} Meses
                </div>
              )}
            </div>
          )}

          {/* Fila: Envío (si se provee) */}
          {typeof shipping === "number" && (
            <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 sm:gap-x-4">
              <span className="text-[14px] text-[#3D3D3D]">Envío</span>
              <span
                className="justify-self-end text-[16px] text-[#141414]
                translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0"
              >
                {shipping} {currency}
              </span>
            </div>
          )}

          {/* Fila: Total a pagar */}
          <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 sm:gap-x-4">
            <span className="text-[14px] text-[#3D3D3D]">Total a pagar</span>
            <span
              className="justify-self-end text-[16px] font-bold text-[#141414]
             translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0"
            >
              {total} {currency}
            </span>
          </div>

          {/* Link / Input cupón */}
          {showCoupon ? (
            <div
              className="w-full h-[42px] flex items-center justify-between rounded-[8px]
      border-2 border-[#3D3D3D] pl-[12px] pr-[6px]
      sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5
      lg:translate-x-0 xl:translate-x-0"
            >
              <input
                placeholder="Ingresa el código"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setShowCoupon(false);
                  }
                }}
                autoFocus
                className="flex-1 bg-transparent outline-none placeholder-black/50 text-[14px]"
              />

              <button
                onClick={onApplyCoupon}
                type="button"
                className="h-[31px] rounded-[6px] bg-black text-white text-[12px] font-bold px-[12px] flex items-center justify-center ml-2"
              >
                Aplicar
              </button>

              {/* Botón X para cerrar */}
              <button
                type="button"
                onClick={() => setShowCoupon(false)}
                aria-label="Cerrar cupón"
                title="Cerrar"
                className="ml-4 px-2 text-[#5D5D5D] hover:text-black text-[30px] leading-none"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowCoupon(true)}
              className="self-end text-[12px] underline text-[#3D3D3D]
      translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0"
            >
              Ingresa código de promoción
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHeader;
