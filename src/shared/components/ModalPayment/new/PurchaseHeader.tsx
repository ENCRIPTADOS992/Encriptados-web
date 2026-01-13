// src/shared/components/ModalPayment/new/PurchaseHeader.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import CopyPaste from "@/shared/svgs/CopyPast";
import { getShareConfigByProductId, getShareUrlWithLocale } from "@/shared/constants/shareConfig";
import { getSimProductUrl } from "@/shared/utils/productRouteResolver";

type Variant = {
  id: number;
  licensetime?: number | string;
  price: number;
  sku?: string;
  image?: string;
};

type ProductLike = {
  name?: string;
  headerTitle?: string;
  provider?: string;
  brand?: string;
  type_product?: string;
  price?: number | string;
  licensetime?: number | string;
  images?: { src: string }[];
  variants?: Variant[];
  id?: number | string;
  productId?: number | string;
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
  onChangeEsimAddon?: (checked: boolean) => void;
  /** URL de origen para compartir (se captura al abrir el modal) */
  sourceUrl?: string;
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
  onTotalChange,
  onChangeEsimAddon,
  sourceUrl,
}) => {
  const locale = useLocale();
  const t = useTranslations("paymentModal");
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

  const providerNorm = (product?.provider || "").toLowerCase();
  const titleNorm = (product?.name || product?.headerTitle || "").toLowerCase();

  const isEncryptedProvider = providerNorm.includes("encript");

  const isRecargaDatos =
    titleNorm.includes("recarga") && titleNorm.includes("datos");

  const showRechargeAmount =
    isEncryptedProvider && isRecargaDatos;

  const isEncryptedDataRecharge = React.useMemo(() => {
    const p: any = product || {};

    const prov = (p.provider || p.brand || "").toLowerCase();
    const cfgType = (p.config_sim?.[0]?.type || "").toLowerCase();
    const name = (p.name || "").toLowerCase();
    const categoryName = (p.category?.name || "").toLowerCase();

    const isEncrypted = prov.includes("encript");
    const isDataSim = cfgType === "data";

    const isDataRechargeByName =
      name.includes("recarga") || name.includes("recharge");

    const isDataRechargeByCategory =
      categoryName.includes("recarga") || categoryName.includes("datos");

    return (
      isEncrypted &&
      isDataSim &&
      (isDataRechargeByName || isDataRechargeByCategory)
    );
  }, [product]);

  const RECHARGE_AMOUNTS = React.useMemo(() => {
    // Si el producto tiene variantes, usarlas
    const productVariants = (product as any)?.variants ?? [];
    if (productVariants.length > 0) {
      return productVariants.map((v: any) => ({
        id: v.id ?? v.price,
        label: `${v.price} USD`,
        value: Number(v.price),
      }));
    }
    
    // Fallback a valores fijos
    return [
      { id: 25, label: "25 USD", value: 25 },
      { id: 50, label: "50 USD", value: 50 },
      { id: 100, label: "100 USD", value: 100 },
      { id: 150, label: "150 USD", value: 150 },
      { id: 200, label: "200 USD", value: 200 },
      { id: 250, label: "250 USD", value: 250 },
      { id: 500, label: "500 USD", value: 500 },
    ];
  }, [product]);
  return (
    <div className="w-full">
      {/* Título */}
      <div className="text-center text-sm font-medium text-gray-600 pb-2">
        {t("purchaseDetails")}
      </div>

      {/* Layout Grid Responsivo */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-5 px-4 sm:px-0">
        {/* Columna 1: Imagen con botón compartir */}
        <div className="relative min-h-[200px]">
          <div className="relative w-full">
            <Image
              src={product?.images?.[0]?.src ?? "/your-image-placeholder.png"}
              alt={product?.name ?? "Producto"}
              width={500}
              height={375}
              className="w-full h-auto rounded-xl object-contain"
              sizes="(max-width: 640px) calc(100vw - 32px), 50vw"
              priority
            />
            <button
              type="button"
              onClick={() => {
                // Obtener el ID del producto desde params si está disponible
                const productId = (product as any)?.id || (product as any)?.productId;
                const provider = (product as any)?.provider || (product as any)?.brand;
                const typeProduct = (product as any)?.type_product;
                
                // Detectar si es un producto SIM (categoría 40) basándose en el provider
                // Solo "Sim Encriptados", "Sim TIM", "encrypted", "tim" son productos SIM
                const providerLower = (provider || "").toLowerCase();
                const isSimProduct = providerLower.includes("encript") || 
                                     providerLower.includes("tim") ||
                                     providerLower === "encrypted";
                
                // Debug: mostrar datos del producto para verificar derivación
                console.log("🔗 [PurchaseHeader] Share button clicked:", {
                  productId,
                  unitPrice,
                  provider,
                  typeProduct,
                  isSimProduct,
                  productName: product?.name,
                });
                
                // Generar la URL de compartir
                let shareUrl: string;
                
                // Para productos SIM (categoría 40): derivar URL desde provider/typeProduct
                // Esto asegura que el link de Compartir sea igual al de "Más información"
                if (isSimProduct && productId && unitPrice != null) {
                  // Para SIMs: usar MISMA función que CardProduct "Más información"
                  const relativePath = getSimProductUrl(provider, typeProduct);
                  
                  // Construir URL absoluta con productId, price y buy=1
                  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://encriptados.io';
                  shareUrl = `${baseUrl}/${locale}${relativePath}?productId=${productId}&price=${unitPrice}&buy=1`;
                  
                  console.log("🔗 [PurchaseHeader] Generated SIM share URL:", { provider, typeProduct, relativePath, shareUrl });
                } else {
                  // Para Apps/Sistemas/Router: usar shareConfig (URLs hardcodeadas)
                  const shareConfig = productId ? getShareConfigByProductId(Number(productId)) : null;
                  
                  if (shareConfig?.shareUrl) {
                    shareUrl = getShareUrlWithLocale(shareConfig.shareUrl, locale);
                  } else if (sourceUrl) {
                    // Usar sourceUrl si está disponible
                    const currentUrl = new URL(sourceUrl);
                    currentUrl.searchParams.set('buy', '1');
                    shareUrl = currentUrl.toString();
                  } else {
                    // Fallback a URL actual
                    const currentUrl = new URL(window.location.href);
                    currentUrl.searchParams.set('buy', '1');
                    shareUrl = currentUrl.toString();
                  }
                }
                
                console.log("🔗 [PurchaseHeader] Final shareUrl:", shareUrl);
                
                const shareData = {
                  title: product?.name || "Producto",
                  text: `${product?.name ?? "Producto"} - ${unitPrice} ${currency}. ¡Compra aquí!`,
                  url: shareUrl,
                };
                
                if (navigator.share) {
                  navigator.share(shareData).catch(() => {});
                } else {
                  navigator.clipboard.writeText(shareUrl).then(() => {
                    alert(t("linkCopied"));
                  }).catch(() => {});
                }
              }}
              className="absolute bottom-2 left-3 z-10 flex items-center gap-2 bg-[#0AAEE1] hover:bg-[#0AAEE1]/90 text-white pl-4 pr-3 py-2 rounded-full text-sm font-medium transition-colors shadow-lg whitespace-nowrap"
              aria-label={t("share")}
            >
              {t("share")}
              <CopyPaste width={18} height={18} color="white" />
            </button>
          </div>
        </div>

        {/* Columna 2: Información del producto */}
        <div className="flex flex-col gap-2.5">
          {/* Encabezado: nombre + precio */}
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-base font-semibold text-black truncate">
              {product?.name ?? "Producto"}
            </h3>
            <div className="text-base font-bold text-[#141414] shrink-0">
              {unitPrice} <span className="font-bold">USD</span>
            </div>
          </div>

          {/* Fila: Monto de recarga */}
          {showRechargeAmount && (
            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
              <span className="text-base text-[#3D3D3D]">Monto de recarga</span>
              <select
                className="justify-self-end h-9 rounded-lg bg-[#EBEBEB] px-3 text-xs text-black outline-none focus:ring-2 focus:ring-black/10"
                value={String(selectedPlanId ?? RECHARGE_AMOUNTS[0].id)}
                onChange={(e) => onChangePlan?.(Number(e.target.value))}
              >
                {RECHARGE_AMOUNTS.map((opt: { id: number; label: string; value: number }) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Fila: Plan (solo si hay minutesPlans) */}
          {!!minutesPlans?.length && (
            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
              <span className="text-base text-[#3D3D3D]">Minutos</span>
              <div ref={planRef} className="relative justify-self-end z-[1000]">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={openPlan}
                  onClick={() => setOpenPlan((v) => !v)}
                  className="relative w-20 h-9 rounded-lg bg-[#EBEBEB] px-3 text-xs text-black outline-none focus:ring-2 focus:ring-black/10 flex items-center justify-between"
                >
                  <span className="truncate">
                    {minutesPlans.find((p) => p.id === (selectedPlanId ?? "__none__"))?.label ?? minutesPlans[0]?.label ?? "Plan"}
                  </span>
                  <span className="ml-1 text-[#3D3D3D]">▾</span>
                </button>

                {openPlan && (
                  <div
                    role="listbox"
                    tabIndex={-1}
                    className="absolute top-full right-0 mt-2 z-50 w-40 rounded-lg bg-white shadow-lg ring-1 ring-black/10 max-h-60 overflow-auto"
                  >
                    {minutesPlans.map((p) => {
                      const isActive = (selectedPlanId ?? minutesPlans[0]?.id) === p.id;
                      return (
                        <button
                          key={String(p.id)}
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            onChangePlan?.(p.id);
                            setOpenPlan(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs ${isActive ? "bg-black text-white" : "hover:bg-gray-100 text-[#141414]"}`}
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

          {/* Fila: Cantidad */}
          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <span className="text-base text-[#3D3D3D]">{t("quantity")}</span>
            <div className="justify-self-end flex items-center bg-[#EBEBEB] rounded-md h-9 px-4 gap-2 select-none">
              <button
                onClick={dec}
                className="text-base font-bold leading-none hover:opacity-70"
                aria-label="Disminuir"
                type="button"
              >
                –
              </button>
              <span className="min-w-[18px] text-center text-base">
                {quantity}
              </span>
              <button
                onClick={inc}
                className="text-base font-bold leading-none hover:opacity-70"
                aria-label="Aumentar"
                type="button"
              >
                +
              </button>
            </div>
          </div>

          {/* Fila: Licencia (ocultable) */}
          {shouldShowLicense && (
            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
              <span className="text-base text-[#3D3D3D]">{t("license")}</span>

              {showSelect ? (
                <div ref={licenseRef} className="relative justify-self-end z-[1000]">
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={openLicense}
                    onClick={() => setOpenLicense((v) => !v)}
                    className="relative w-32 h-8 rounded-lg bg-[#EBEBEB] px-3 text-xs text-black outline-none focus:ring-2 focus:ring-black/10 flex items-center justify-between"
                  >
                    <span className="truncate">
                      {variants.find((v) => v.id === (selectedVariantId ?? -1))?.licensetime ?? variants[0]?.licensetime ?? currentMonths} {t("months")}
                    </span>
                    <span className="ml-1 text-[#3D3D3D]">▾</span>
                  </button>

                  {openLicense && (
                    <div
                      role="listbox"
                      tabIndex={-1}
                      className="absolute top-full right-0 mt-2 z-50 min-w-[120px] rounded-lg bg-white shadow-lg ring-1 ring-black/10 max-h-60 overflow-auto"
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
                            className={`w-full px-3 py-2 text-left text-sm whitespace-nowrap ${isActive ? "bg-black text-white" : "hover:bg-gray-100 text-[#141414]"}`}
                          >
                            {v.months} Meses
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="justify-self-end w-36 h-9 bg-[#EBEBEB] rounded-lg px-3 flex items-center text-sm text-black select-none">
                  {currentMonths} Meses
                </div>
              )}
            </div>
          )}

          {/* Fila: Envío */}
          {typeof shipping === "number" && (
            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
              <span className="text-sm text-[#3D3D3D]">Envío</span>
              <span className="justify-self-end text-base text-[#141414]">
                {shipping} {currency}
              </span>
            </div>
          )}

          {/* Fila: Descuento */}
          {showCoupon && (
            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
              <span className="text-sm text-[#3D3D3D]">Descuento</span>
              <span className="justify-self-end text-base font-bold text-[#141414]">
                {discountAmount.toFixed(2)} {currency}
              </span>
            </div>
          )}

          {/* Fila: Total a pagar */}
          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <span className="text-base text-[#3D3D3D]">{t("totalToPay")}</span>
            <span className="justify-self-end text-base font-bold text-[#141414]">
              {total} {currency}
            </span>
          </div>

          {/* Upsell eSIM */}
          {showEsimAddon && (
            <label className="flex items-center gap-2 text-xs text-[#010C0F] cursor-pointer">
              <input
                type="checkbox"
                checked={includeEsimAddon}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setIncludeEsimAddon(checked);
                  onChangeEsimAddon?.(checked);
                }}
                className="w-4 h-4 border-2 border-black rounded accent-black focus:outline-none focus:ring-0"
              />
              <span className="select-none">
                {esimAddonLabel.replace("7.50", (esimAddonPrice ?? 0).toFixed(2))}
              </span>
            </label>
          )}

          {/* Cupón de descuento */}
          {showCoupon ? (
            <div className="flex items-center gap-1 h-11">
              <div className="flex items-center h-full flex-1 rounded-lg border-2 border-[#3D3D3D] px-3">
                <input
                  placeholder="Ingresa el código"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setShowCoupon(false);
                  }}
                  autoFocus
                  className="flex-1 bg-transparent outline-none placeholder-black/50 text-sm"
                />
              </div>
              <button
                onClick={onApplyCoupon}
                type="button"
                className="shrink-0 h-full px-5 rounded-md bg-black text-white text-xs font-bold hover:bg-black/90"
              >
                {t("apply")}
              </button>
              <button
                type="button"
                onClick={() => setShowCoupon(false)}
                aria-label="Cerrar cupón"
                className="shrink-0 text-2xl text-[#5D5D5D] hover:text-black"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowCoupon(true)}
              className="self-end text-xs underline text-[#3D3D3D] hover:text-black"
            >
              {t("enterPromoCode")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHeader;
