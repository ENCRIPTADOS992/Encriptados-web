// src/shared/components/ModalPayment/new/PurchaseHeader.tsx
"use client";

import React from "react";
import Image from "next/image";

type Variant = {
  id: number;
  licensetime?: number | string;
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
  minutesPlans?: Array<{ id: string | number; label: string; value?: number }>;
  selectedPlanId?: string | number | null;
  onChangePlan?: (id: string | number) => void;
  showEsimAddon?: boolean;
  esimAddonPrice?: number;
  esimAddonLabel?: string;
  onTotalChange?: (total: number) => void;
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
  minutesPlans,
  selectedPlanId,
  onChangePlan,
  showEsimAddon = false,
  esimAddonPrice = 0,
  esimAddonLabel = "Lleva E-SIM",
}) => {
  const inc = () => setQuantity(Math.min(99, quantity + 1));
  const dec = () => setQuantity(Math.max(1, quantity - 1));

  const isOnlyThreema =
    typeof product?.name === "string" &&
    /threema/i.test(product.name) &&
    !/work/i.test(product.name);

  const shouldShowLicense = showLicense && !isOnlyThreema;

  const variants = product?.variants ?? [];
  const [showCoupon, setShowCoupon] = React.useState(false);

  const discountAmount = 0;

  // Normalizador seguro: convierte "3" -> 3, ignora basura
  const toMonths = (v: unknown): number | undefined => {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string") {
      const n = parseInt(v, 10);
      return Number.isFinite(n) ? n : undefined;
    }
    return undefined;
  };

  const rawVariants = product?.variants ?? [];

  const normVariants = rawVariants
    .map((v) => ({ ...v, months: toMonths(v.licensetime) }))
    .filter((v) => v.months !== undefined);

  const productMonths = toMonths(product?.licensetime) ?? 12;

  const showSelect = normVariants.length > 1;

  const currentMonths =
    normVariants.find((v) => v.id === (selectedVariantId ?? -1))?.months ??
    normVariants[0]?.months ??
    productMonths;

  const subtotal = unitPrice * quantity;
  const [includeEsimAddon, setIncludeEsimAddon] = React.useState(false);
  const total = Math.max(
    subtotal +
      (shipping ?? 0) +
      (showEsimAddon && includeEsimAddon ? esimAddonPrice : 0),
    0
  );

  const [openLicense, setOpenLicense] = React.useState(false);
  const licenseRef = React.useRef<HTMLDivElement | null>(null);
  const [openPlan, setOpenPlan] = React.useState(false);
  const planRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (licenseRef.current && !licenseRef.current.contains(e.target as Node))
        setOpenLicense(false);
      if (planRef.current && !planRef.current.contains(e.target as Node))
        setOpenPlan(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenLicense(false);
      if (e.key === "Escape") setOpenPlan(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

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
    h-[152px] w-[382px] rounded-t-[12px] max-[390px]:w-[360px]        /* móvil (xs) */
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
            <h3
              className="
                text-[16px] font-semibold text-black truncate
                sm:-mt-6 md:-mt-0 ipad:-mt-12   
                lg:mt-0 xl:mt-0                
              "
            >
              {product?.name ?? "Producto"}
            </h3>
            <div
              className="
    text-[16px] font-normal text-[#141414]
    translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0
    max-[390px]:-translate-x-[-30px]
    sm:-mt-6 md:-mt-0 ipad:-mt-12 lg:mt-0 xl:mt-0
  "
            >
              {unitPrice} <span className="font-normal">USD</span>
            </div>
          </div>

          {/* Fila: Cantidad */}
          <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 sm:gap-x-4">
            <span className="text-[14px] text-[#3D3D3D]">Cantidad</span>
            <div
              className="justify-self-end flex items-center bg-[#EBEBEB] rounded-[6px] h-[36px] px-[14px] gap-2 select-none
                translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0 max-[390px]:-translate-x-[-30px]"
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
          {shouldShowLicense && (
        <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 sm:gap-x-4">
          <span className="text-[14px] text-[#3D3D3D]">Licencia</span>

          {showSelect ? (
            <div
              ref={licenseRef}
              className="relative z-[1000] justify-self-end translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0 max-[390px]:-translate-x-[-30px]"
            >
              {/* Control */}
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={openLicense}
                onClick={() => setOpenLicense((v) => !v)}
                className="group w-[120px] h-[32px] rounded-[8px] bg-[#EBEBEB] pl-[10px] pr-7 text-[12px] font-normal text-black outline-none ring-0 focus:ring-2 focus:ring-black/10 flex items-center justify-between transition"
              >
                <span className="truncate">
                  {variants.find((v) => v.id === (selectedVariantId ?? -1))?.licensetime ??
                    variants[0]?.licensetime ?? currentMonths}{" "}
                  Meses
                </span>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#3D3D3D] transition group-aria-expanded:rotate-180">
                  ▾
                </span>
              </button>

              {/* Menu */}
              {openLicense && (
                <div
                  role="listbox"
                  tabIndex={-1}
                  className="absolute top-full right-0 mt-2 z-50 w-auto min-w-[120px] sm:min-w-[130px] md:min-w-[130px] ipad:min-w-[130px] rounded-[10px] bg-white shadow-lg ring-1 ring-black/10 max-h-60 overflow-auto"
                >
                  {normVariants.map((v) => {
                    const isActive = (selectedVariantId ?? normVariants[0]?.id) === v.id;
                    return (
                      <button
                        key={v.id}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => {
                          onChangeVariant?.(v.id);
                          setOpenLicense(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-[14px] whitespace-nowrap ${
                          isActive ? "bg-black text-white" : "hover:bg-[#F2F2F2] text-[#141414]"
                        }`}
                      >
                        {v.months} Meses
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="justify-self-end w-[140px] h-[34px] bg-[#EBEBEB] rounded-[8px] px-[12px] flex items-center text-[14px] font-normal text-black select-none translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0 max-[390px]:-translate-x-[-30px]">
              {currentMonths} Meses
            </div>
          )}
        </div>
      )}


          {/* Fila: Envío (si se provee) */}
          {typeof shipping === "number" && (
            <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 sm:gap-x-4">
              <span className="text-[14px] text-[#3D3D3D]">Envío</span>
              <span className="justify-self-end text-[16px] text-[#141414] translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0 max-[390px]:-translate-x-[-30px]">
                {shipping} {currency}
              </span>
            </div>
          )}

          {showCoupon && (
            <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 sm:gap-x-4">
              <span className="text-[14px] text-[#3D3D3D]">Descuento</span>
              <span className="justify-self-end text-[16px] font-bold text-[#141414] translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0 max-[390px]:-translate-x-[-30px]">
                {discountAmount.toFixed(2)} {currency}
              </span>
            </div>
          )}

          {/* Fila: Total a pagar */}
          <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 sm:gap-x-4">
            <span className="text-[14px] text-[#3D3D3D]">Total a pagar</span>
            <span className="justify-self-end text-[16px] font-bold text-[#141414] translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0 max-[390px]:-translate-x-[-30px]">
              {total} {currency}
            </span>
          </div>

          {/* Link / Input cupón */}
          {showCoupon ? (
            <div
              className="
      flex items-center
      w-full h-[42px]
      sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5
      lg:translate-x-0 xl:translate-x-0
      lg:w-[306px]   /* ancho fijo en lg+ */
    "
            >
              {/* INPUT-BOX con borde */}
              <div
                className="
        flex items-center
        h-[42px]
        rounded-[8px] border-[1.5px] border-[#3D3D3D]
        pl-[12px] pr-[12px]

        w-[250px]           
        sm:w-[180px]        
        md:w-[140px]       
        ipad:w-[150px]      
        lg:w-[180px]        
      "
              >
                <input
                  placeholder="Ingresa el código"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setShowCoupon(false);
                  }}
                  autoFocus
                  className="flex-1 bg-transparent outline-none placeholder-black/50 text-[14px]"
                />
              </div>

              {/* Botón Aplicar */}
              <button
                onClick={onApplyCoupon}
                type="button"
                className="
        ml-1 shrink-0 w-[70px] h-[42px]
        rounded-[6px] bg-black text-white
        text-[12px] font-bold
        flex items-center justify-center
      "
              >
                Aplicar
              </button>

              {/* Botón X (grande tipo texto) */}
              <button
                type="button"
                onClick={() => setShowCoupon(false)}
                aria-label="Cerrar cupón"
                title="Cerrar"
                className="
        ml-1 shrink-0 
        text-[30px] leading-none
        text-[#5D5D5D] hover:text-black
        flex items-center justify-center
      "
              >
                ×
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowCoupon(true)}
              className="self-end text-[12px] underline text-[#3D3D3D] translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0 max-[390px]:-translate-x-[-30px]"
            >
              Ingresa código de promoción
            </button>
          )}
          {/* Fila: Plan (solo si hay minutesPlans) */}
          {!!minutesPlans?.length && (
            <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 sm:gap-x-4">
              <span className="text-[14px] text-[#3D3D3D]">Plan</span>
              <div
                ref={planRef}
                className="relative z-[1000] justify-self-end translate-x-20 sm:-translate-x-5 md:-translate-x-5 ipad:-translate-x-5 lg:translate-x-0 xl:translate-x-0 max-[390px]:-translate-x-[-30px]"
              >
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={openPlan}
                  onClick={() => setOpenPlan((v) => !v)}
                  className="group w-[120px] h-[32px] rounded-[8px] bg-[#EBEBEB]
                             pl-[10px] pr-7 text-[12px] font-normal text-black
                             outline-none ring-0 focus:ring-2 focus:ring-black/10
                             flex items-center justify-between transition"
                >
                  <span className="truncate">
                    {minutesPlans.find(
                      (p) => p.id === (selectedPlanId ?? "__none__")
                    )?.label ??
                      minutesPlans[0]?.label ??
                      "Plan"}
                  </span>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#3D3D3D]">
                    ▾
                  </span>
                </button>

                {openPlan && (
                  <div
                    role="listbox"
                    tabIndex={-1}
                    className="absolute top-full right-0 mt-2 z-50 w-[160px]
                               rounded-[10px] bg-white shadow-lg ring-1 ring-black/10
                               max-h-60 overflow-auto"
                  >
                    {minutesPlans.map((p) => {
                      const isActive =
                        (selectedPlanId ?? minutesPlans[0]?.id) === p.id;
                      return (
                        <button
                          key={String(p.id)}
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            onChangePlan?.(p.id);
                            setOpenPlan(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-[12px] ${
                            isActive
                              ? "bg-black text-white"
                              : "hover:bg-[#F2F2F2] text-[#141414]"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Upsell eSIM (data & minutes) */}
          {showEsimAddon && (
            <label className="flex items-center gap-2 text-[12px] leading-[18px] text-[#010C0F]">
              <input
                type="checkbox"
                checked={includeEsimAddon}
                onChange={(e) => setIncludeEsimAddon(e.target.checked)}
                className="w-[16px] h-[16px] border-2 border-black rounded-[2px] accent-black focus:outline-none focus:ring-0"
              />
              <span className="select-none">
                {esimAddonLabel.replace(
                  "7.50",
                  (esimAddonPrice ?? 0).toFixed(2)
                )}
              </span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHeader;
