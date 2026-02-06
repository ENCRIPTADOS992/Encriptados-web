// src/shared/components/ModalPayment/new/PurchaseHeader.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import CopyPaste from "@/shared/svgs/CopyPast";
import { getShareConfigByProductId, getShareUrlWithLocale } from "@/shared/constants/shareConfig";
import { getProductLink, getSimProductUrl } from "@/shared/utils/productRouteResolver";
import { useToast } from "@/shared/context/ToastContext";
import { CircleFlag } from "react-circle-flags";
import { SIM_DEFAULT_IDS } from "@/shared/constants/simDefaultIds";
import { RegionIcon } from "@/shared/components/RegionIcon";

type Variant = {
  id: number;
  licensetime?: number | string;
  price: number;
  cost?: number;
  sku?: string;
  name?: string;
  image?: string;
  scope?: { type?: string; code?: string };
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
  buyNowImage_variants?: { license_duration: string; lang: string; image: string }[];
};

type RechargeAmountOpt = {
  id: number;
  value: number;
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
  minutesPlans?: Array<{ id: string | number; label: string; value?: number; minutes?: number }>;
  dataPlans?: Array<{ id: string | number; label: string; value?: number; gb?: number }>;
  selectedPlanId?: string | number | null;
  onChangePlan?: (id: string | number) => void;
  showEsimAddon?: boolean;
  esimAddonPrice?: number;
  esimAddonLabel?: string;
  onTotalChange?: (total: number) => void;
  onChangeEsimAddon?: (checked: boolean) => void;
  /** URL de origen para compartir (se captura al abrir el modal) */
  sourceUrl?: string;
  gb?: string;
  region?: string;
  regionCode?: string;
  flagUrl?: string;
  /** Explicit Product ID to use for sharing (prioritized over product object) */
  shareProductId?: string;
  discount?: number;
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
  dataPlans,
  selectedPlanId,
  onChangePlan,
  showEsimAddon = false,
  esimAddonPrice = 0,
  esimAddonLabel = "Lleva E-SIM",
  onTotalChange,
  onChangeEsimAddon,
  sourceUrl,
  gb,
  region,
  regionCode,
  flagUrl,
  shareProductId,
  discount = 0,
}) => {
  const locale = useLocale();
  const t = useTranslations("paymentModal");
  const toast = useToast();
  const inc = () => setQuantity(Math.min(99, quantity + 1));
  const dec = () => setQuantity(Math.max(1, quantity - 1));

  const isOnlyThreema =
    typeof product?.name === "string" &&
    /threema/i.test(product.name) &&
    !/work/i.test(product.name);

  const variants = product?.variants ?? [];
  const [showCoupon, setShowCoupon] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [flagUrl]);

  const discountAmount = discount;

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

  // Ocultar licencia si: no se debe mostrar, es Threema simple, o la licencia es 0 meses
  const shouldShowLicense = showLicense && !isOnlyThreema && currentMonths > 0;

  const subtotal = unitPrice * quantity;
  const [includeEsimAddon, setIncludeEsimAddon] = React.useState(false);
  const total = Math.max(
    subtotal +
    (shipping ?? 0) -
    (discount ?? 0) +
    (showEsimAddon && includeEsimAddon ? esimAddonPrice : 0),
    0
  );

  const [openLicense, setOpenLicense] = React.useState(false);
  const licenseRef = React.useRef<HTMLDivElement | null>(null);
  const [openPlan, setOpenPlan] = React.useState(false);
  const planRef = React.useRef<HTMLDivElement | null>(null);
  const [openRecharge, setOpenRecharge] = React.useState(false);
  const rechargeRef = React.useRef<HTMLDivElement | null>(null);
  const [openDataPlan, setOpenDataPlan] = React.useState(false);
  const dataPlanRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (licenseRef.current && !licenseRef.current.contains(e.target as Node))
        setOpenLicense(false);
      if (planRef.current && !planRef.current.contains(e.target as Node))
        setOpenPlan(false);
      if (rechargeRef.current && !rechargeRef.current.contains(e.target as Node))
        setOpenRecharge(false);
      if (dataPlanRef.current && !dataPlanRef.current.contains(e.target as Node))
        setOpenDataPlan(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenLicense(false);
      if (e.key === "Escape") setOpenPlan(false);
      if (e.key === "Escape") setOpenRecharge(false);
      if (e.key === "Escape") setOpenDataPlan(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const providerNorm = ((product?.provider || product?.brand) ?? "").toLowerCase();
  const titleNorm = (product?.name || product?.headerTitle || "").toLowerCase();

  const isEncryptedProvider =
    providerNorm.includes("encript") || providerNorm.includes("encrypted");

  // Multi-idioma: ES datos, EN data, FR données, IT dati, PT dados
  const hasDataWord = /(datos?|data|dati|donn[ée]es|dados)/i.test(titleNorm);
  const hasRechargeWord = /(recarga|recharge|ricarica)/i.test(titleNorm);

  const isRecargaDatos = hasRechargeWord && hasDataWord;

  const isEsimDataComboTitle =
    /esim/i.test(titleNorm) && hasDataWord;

  const isEsimRecargaDatosTitle = /esim/i.test(titleNorm) && hasRechargeWord && hasDataWord;
  const isEsimDatosTitle = /esim/i.test(titleNorm) && hasDataWord;
  // eSIM solo (sin datos ni recarga)
  const isEsimOnlyTitle = titleNorm === "esim" || (/esim/i.test(titleNorm) && !hasDataWord && !hasRechargeWord);
  // SIM Física (multi-idioma: ES física, EN physical, FR physique, IT fisica, PT física)
  const isSimFisicaTitle = /sim\s*(f[ií]sica?|physics?|physique)/i.test(titleNorm);
  const ESIM_RECARGA_BASE_PRICE = 12;

  const showRechargeAmount =
    isEncryptedProvider && (isRecargaDatos || isEsimDataComboTitle);

  const isEncryptedDataRecharge = React.useMemo(() => {
    const p: any = product || {};

    const prov = (p.provider || p.brand || "").toLowerCase();
    const cfgType = (p.config_sim?.[0]?.type || "").toLowerCase();
    const name = (p.name || "").toLowerCase();
    const categoryName = (p.category?.name || "").toLowerCase();

    const isEncrypted = prov.includes("encript");
    const isDataSim = cfgType === "data";

    const isDataRechargeByName =
      /(recarga|recharge|ricarica)/i.test(name);

    const isDataRechargeByCategory =
      /(recarga|recharge|ricarica|datos?|data|dati|donn[ée]es|dados)/i.test(categoryName);

    return (
      isEncrypted &&
      isDataSim &&
      (isDataRechargeByName || isDataRechargeByCategory)
    );
  }, [product]);

  const RECHARGE_AMOUNTS = React.useMemo<RechargeAmountOpt[]>(() => {
    // Si el producto tiene variantes, usarlas
    const productVariants = (product as any)?.variants ?? [];
    if (productVariants.length > 0) {
      return productVariants.map((v: any) => ({
        id: v.id ?? v.price ?? v.cost,
        value: Math.max(
          Number(v.price ?? v.cost ?? v.regular_price ?? v.sale_price ?? 0) -
          (isEsimRecargaDatosTitle || isEsimDatosTitle ? ESIM_RECARGA_BASE_PRICE : 0),
          0
        ),
      }));
    }

    // Fallback a valores fijos
    return [
      { id: 25, value: 25 },
      { id: 50, value: 50 },
      { id: 100, value: 100 },
      { id: 150, value: 150 },
      { id: 200, value: 200 },
      { id: 250, value: 250 },
      { id: 500, value: 500 },
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
              src={(() => {
                const buyNowVars = product?.buyNowImage_variants;
                if (buyNowVars && buyNowVars.length > 0 && selectedVariantId) {
                  // Buscar licensetime de la variante seleccionada
                  const selectedVar = variants.find(v => v.id === selectedVariantId);
                  const duration = String(selectedVar?.licensetime || "0").toLowerCase().trim();
                  const durationNum = duration.replace(/\D/g, "");

                  // Buscar coincidencia exacta por license_duration + locale
                  const match = buyNowVars.find(bv => {
                    const bvDur = String(bv.license_duration).toLowerCase().trim();
                    const bvNum = bvDur.replace(/\D/g, "");
                    return (bvDur === duration || (bvNum && durationNum && bvNum === durationNum))
                      && bv.lang === locale;
                  });
                  if (match) return match.image;

                  // Fallback: misma duración en español
                  const fallback = buyNowVars.find(bv => {
                    const bvDur = String(bv.license_duration).toLowerCase().trim();
                    const bvNum = bvDur.replace(/\D/g, "");
                    return (bvDur === duration || (bvNum && durationNum && bvNum === durationNum))
                      && bv.lang === "es";
                  });
                  if (fallback) return fallback.image;
                }
                // Sin buyNowImage_variants → siempre images[0].src (igual que tarjetas)
                return product?.images?.[0]?.src || "/your-image-placeholder.png";
              })()}
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
                // Obtener el ID del producto desde prop explicito o params
                const productId = shareProductId || (product as any)?.id || (product as any)?.productId;
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
                  shareProductId,
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
                if (isSimProduct && (productId || shareProductId) && unitPrice != null) {
                  // Para SIMs: usar MISMA función que CardProduct "Más información"
                  const relativePath = getSimProductUrl(provider, typeProduct);

                  // Intentar obtener el ID canónico para este slug
                  // Esto evita que IDs de variantes (como Recargas) se propaguen al link de compartir
                  const slug = relativePath.replace("/sim/", "").split("?")[0];
                  const canonicalId = SIM_DEFAULT_IDS[slug];
                  // UPDATE: Priorizar el ID especifíco del producto actual si existe. 
                  // Usar canonicalId solo como fallback si no tenemos ID explicito (raro) o para normalizar si se desea, 
                  // pero el usuario indica que "está cargando el id incorrecto", lo que sugiere que canonicalId está sobreescribiendo el correcto.
                  const finalProductId = (shareProductId || productId) ? String(shareProductId || productId) : (canonicalId ? String(canonicalId) : "");

                  // Construir URL absoluta con productId, variants y buy=1
                  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://encriptados.io';

                  // SECURE UPDATE: Removed 'price' parameter. Price must be resolved by ID/Variant.
                  // MATCHING CardProduct LOGIC: Added categoryId=40
                  let simUrl = `${baseUrl}/${locale}${relativePath}?productId=${finalProductId}&categoryId=40&buy=1`;

                  // Agregar variantId si está seleccionado (CRITICO para precio correcto)
                  if (selectedVariantId) {
                    simUrl += `&variantId=${selectedVariantId}`;
                  }

                  // Agregar params adicionales si existen (gb, region, flagUrl)
                  // Estos deben venir de las props o del estado actual
                  if (gb) simUrl += `&gb=${encodeURIComponent(gb)}`;
                  if (region) simUrl += `&region=${encodeURIComponent(region)}`;

                  if (regionCode) {
                    simUrl += `&regionCode=${encodeURIComponent(regionCode)}`;
                    // Para compatibilidad con lógica de SimTimBanner (Igual que en CardProduct)
                    // Si el proveedor es TIM, duplicamos regionCode en sim_region
                    const providerLower = (provider || "").toLowerCase();
                    const isSimTim = providerLower.includes("tim");
                    if (isSimTim) {
                      simUrl += `&sim_region=${encodeURIComponent(regionCode)}`;
                    }
                  }

                  if (flagUrl) simUrl += `&flagUrl=${encodeURIComponent(flagUrl)}`;

                  shareUrl = simUrl;

                  console.log("🔗 [PurchaseHeader] Generated SECURE SIM share URL:", {
                    provider,
                    typeProduct,
                    relativePath,
                    slug,
                    canonicalId,
                    finalProductId,
                    variantId: selectedVariantId,
                    shareUrl
                  });
                } else {
                  // Para Apps/Sistemas/Router: usar getProductLink con lógica dinámica de slugs
                  const categoryId = Number((product as any)?.category?.id ?? (product as any)?.categoryId ?? NaN);
                  const productName = String(product?.name || "");

                  // Generar el slug dinámicamente basado en el nombre (ej: "Silent Phone" -> "/apps/silent-phone")
                  const derivedLink = Number.isFinite(categoryId)
                    ? getProductLink(productName, categoryId, Number(productId), provider, typeProduct)
                    : null;

                  if (derivedLink) {
                    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://encriptados.io";
                    // Asegurar que usamos productId y price correctos en la URL
                    // NOTA: Mantenemos price aqui si el producto NO es SIM y no tiene variantes complejas, 
                    // pero por consistencia intentamos evitarlo si es posible.
                    // Para apps, a veces el precio es simple. Dejamos price por compatibilidad 
                    // a menos que el user quiera "todos". El user dijo "productos de sim".
                    // Pero para seguridad general, mejor quitarlo también si el backend lo soporta.
                    // Asumiremos que Apps aun pueden necesitarlo o no es critico este cambio ahora.
                    // PERO el user dijo "no admitas url donde se que me el price".
                    // Asi que lo quitamos tambien aqui.
                    shareUrl = `${baseUrl}/${locale}${derivedLink}?productId=${productId}&buy=1`;
                  } else if (sourceUrl) {
                    // Usar sourceUrl si está disponible
                    const currentUrl = new URL(sourceUrl);
                    currentUrl.searchParams.set("buy", "1");

                    // Limpieza de seguridad
                    currentUrl.searchParams.delete("price");

                    // Asegurar productId si falta
                    if (!currentUrl.searchParams.has("productId") && productId) {
                      currentUrl.searchParams.set("productId", String(productId));
                    }
                    shareUrl = currentUrl.toString();
                  } else {
                    // Fallback a URL actual
                    const currentUrl = new URL(window.location.href);
                    currentUrl.searchParams.set("buy", "1");
                    currentUrl.searchParams.delete("price");
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
                  navigator.share(shareData).catch(() => { });
                } else {
                  navigator.clipboard
                    .writeText(shareUrl)
                    .then(() => toast.success(t("linkCopied")))
                    .catch(() =>
                      toast.error(
                        t("linkCopyFailed", {
                          defaultValue: "No se pudo copiar el enlace",
                        })
                      )
                    );
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
        <div className="flex flex-col gap-2">
          {/* Encabezado: solo nombre (precio se muestra en Total a pagar) */}
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-base font-semibold text-black truncate">
              {product?.name ?? "Producto"}
            </h3>
          </div>

          {/* Fila: Precio de eSIM (para eSIM solo, eSIM + Datos, eSIM + Recarga Datos) */}
          {(isEsimRecargaDatosTitle || isEsimDatosTitle || isEsimOnlyTitle) && (
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <span className="text-base text-[#3D3D3D]">{t("esimPrice", { defaultValue: "Precio de eSIM" })}</span>
              <span className="text-base font-bold text-[#141414] min-w-[5rem] text-right">
                {ESIM_RECARGA_BASE_PRICE} {currency}
              </span>
            </div>
          )}

          {/* Fila: Precio de SIM (para SIM Física) */}
          {isSimFisicaTitle && (
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <span className="text-base text-[#3D3D3D]">{t("simPrice", { defaultValue: "Precio de SIM" })}</span>
              <span className="text-base font-bold text-[#141414] min-w-[5rem] text-right">
                {unitPrice} {currency}
              </span>
            </div>
          )}

          {/* Fila: Monto de recarga */}
          {showRechargeAmount && (
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <span className="text-base text-[#3D3D3D]">{t("rechargeAmount")}</span>
              <div ref={rechargeRef} className="relative z-[1000]">
                {(() => {
                  const opts = RECHARGE_AMOUNTS.filter(
                    (x: RechargeAmountOpt) => Number(x.value) > 0
                  );
                  const current =
                    opts.find((p) => Number(p.value) === Number(selectedPlanId)) ??
                    opts[0];
                  const label = current ? `${current.value} ${currency}` : `${currency}`;
                  return (
                    <button
                      type="button"
                      aria-haspopup="listbox"
                      aria-expanded={openRecharge}
                      onClick={() => setOpenRecharge((v) => !v)}
                      className="relative min-w-[5rem] w-auto h-9 rounded-lg bg-[#EBEBEB] px-3 text-xs text-black outline-none focus:ring-2 focus:ring-black/10 flex items-center justify-between gap-2"
                    >
                      <span className="truncate">{label}</span>
                      <span className="ml-1 text-[#3D3D3D]">▾</span>
                    </button>
                  );
                })()}

                {openRecharge && (
                  <div
                    role="listbox"
                    tabIndex={-1}
                    className="absolute top-full right-0 mt-2 z-50 min-w-full w-fit rounded-lg bg-white shadow-lg ring-1 ring-black/10 max-h-60 overflow-auto"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {RECHARGE_AMOUNTS.filter(
                      (x: RechargeAmountOpt) => Number(x.value) > 0
                    ).map((opt: RechargeAmountOpt) => {
                      const isActive = Number(selectedPlanId) === Number(opt.value);
                      const label = `${opt.value} ${currency}`;
                      return (
                        <button
                          key={String(opt.id)}
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            onChangePlan?.(Number(opt.value));
                            setOpenRecharge(false);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          className={`w-full px-3 py-2 text-left text-xs whitespace-nowrap ${isActive ? "bg-black text-white" : "hover:bg-gray-100 text-[#141414]"}`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {!!dataPlans?.length && (
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <span className="text-base text-[#3D3D3D]">{t("chooseGigas")}</span>
              <div ref={dataPlanRef} className="relative z-[1000]">
                {(() => {
                  const current =
                    dataPlans.find((p) => String(p.id) === String(selectedPlanId ?? "__none__")) ??
                    dataPlans[0];
                  const label = current?.label ?? "Plan";
                  return (
                    <button
                      type="button"
                      aria-haspopup="listbox"
                      aria-expanded={openDataPlan}
                      onClick={() => setOpenDataPlan((v) => !v)}
                      onMouseDown={(e) => e.stopPropagation()}
                      className="relative min-w-[5rem] w-auto h-9 rounded-lg bg-[#EBEBEB] px-3 text-xs text-black outline-none focus:ring-2 focus:ring-black/10 flex items-center justify-between gap-2"
                    >
                      <span className="truncate">{label}</span>
                      <span className="ml-1 text-[#3D3D3D]">▾</span>
                    </button>
                  );
                })()}

                {openDataPlan && (
                  <div
                    role="listbox"
                    tabIndex={-1}
                    className="absolute top-full right-0 mt-2 z-50 min-w-full w-fit rounded-lg bg-white shadow-lg ring-1 ring-black/10 max-h-60 overflow-auto"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {dataPlans.map((p) => {
                      const isActive = String(selectedPlanId ?? dataPlans[0]?.id) === String(p.id);
                      return (
                        <button
                          key={String(p.id)}
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            onChangePlan?.(p.id);
                            setOpenDataPlan(false);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          className={`w-full px-3 py-2 text-left text-xs whitespace-nowrap ${isActive ? "bg-black text-white" : "hover:bg-gray-100 text-[#141414]"}`}
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

          {/* Fila: Plan (solo si hay minutesPlans) */}
          {!!minutesPlans?.length && (
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <span className="text-base text-[#3D3D3D]">{t("minutes")}</span>
              <div ref={planRef} className="relative z-[1000]">
                {(() => {
                  const current =
                    minutesPlans.find((p) => p.id === (selectedPlanId ?? "__none__")) ??
                    minutesPlans[0];
                  const label =
                    typeof current?.minutes === "number" && current.minutes > 0
                      ? `${current.minutes} ${t("minutes")}`
                      : current?.label ?? "Plan";
                  return (
                    <button
                      type="button"
                      aria-haspopup="listbox"
                      aria-expanded={openPlan}
                      onClick={() => setOpenPlan((v) => !v)}
                      className="relative min-w-[5rem] w-auto h-9 rounded-lg bg-[#EBEBEB] px-3 text-xs text-black outline-none focus:ring-2 focus:ring-black/10 flex items-center justify-between gap-2"
                    >
                      <span className="truncate">
                        {label}
                      </span>
                      <span className="ml-1 text-[#3D3D3D]">▾</span>
                    </button>
                  );
                })()}

                {openPlan && (
                  <div
                    role="listbox"
                    tabIndex={-1}
                    className="absolute top-full right-0 mt-2 z-50 min-w-full w-fit rounded-lg bg-white shadow-lg ring-1 ring-black/10 max-h-60 overflow-auto"
                  >
                    {minutesPlans.map((p) => {
                      const isActive = (selectedPlanId ?? minutesPlans[0]?.id) === p.id;
                      const label =
                        typeof p.minutes === "number" && p.minutes > 0
                          ? `${p.minutes} ${t("minutes")}`
                          : p.label;
                      return (
                        <button
                          key={String(p.id)}
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            onChangePlan?.(p.id);
                            setOpenPlan(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs whitespace-nowrap ${isActive ? "bg-black text-white" : "hover:bg-gray-100 text-[#141414]"}`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}





          {/* Fila: País o región (si existe) - Ocultar para Sim Física */}
          {(region || regionCode) && !titleNorm.includes("sim física") && !titleNorm.includes("sim fisica") && (
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              {/* @ts-ignore */}
              <span className="text-base text-[#3D3D3D]">{t("countryOrRegion", { defaultValue: "País o región" })}</span>
              <div className="flex items-center gap-2">
                {flagUrl && !imgError ? (
                  <Image
                    src={flagUrl}
                    alt={region || "Region"}
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full object-cover shadow-sm"
                    onError={() => setImgError(true)}
                  />
                ) : regionCode && regionCode.length === 2 && regionCode.toUpperCase() !== 'GLOBAL' ? (
                  // @ts-ignore
                  <CircleFlag
                    countryCode={regionCode.toLowerCase()}
                    className="w-5 h-5 shadow-sm"
                  />
                ) : (
                  // Para regiones (europa, global, etc) o códigos largos
                  <RegionIcon size={20} className="w-5 h-5 shadow-sm" />
                )}
                <span className="text-base text-[#141414] font-medium">
                  {region}
                </span>
              </div>
            </div>
          )}

          {/* Fila: Cantidad */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-4">
            <span className="text-base text-[#3D3D3D]">{t("quantity")}</span>
            <div className="flex items-center bg-[#EBEBEB] rounded-lg h-9 min-w-[5rem] px-3 gap-2 select-none justify-between">
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
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <span className="text-base text-[#3D3D3D]">{t("license")}</span>

              {showSelect ? (
                <div ref={licenseRef} className="relative z-[1000]">
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={openLicense}
                    onClick={() => setOpenLicense((v) => !v)}
                    className="relative min-w-[8rem] w-auto h-8 rounded-lg bg-[#EBEBEB] px-3 text-xs text-black outline-none focus:ring-2 focus:ring-black/10 flex items-center justify-between gap-2"
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
                      className="absolute top-full right-0 mt-2 z-50 min-w-full w-fit rounded-lg bg-white shadow-lg ring-1 ring-black/10 max-h-60 overflow-auto"
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
                <div className="min-w-[9rem] w-auto h-9 bg-[#EBEBEB] rounded-lg px-3 flex items-center text-sm text-black select-none whitespace-nowrap">
                  {currentMonths} Meses
                </div>
              )}
            </div>
          )}

          {/* Fila: Envío */}
          {typeof shipping === "number" && (
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <span className="text-base text-[#3D3D3D]">Envío</span>
              <span className="text-base text-[#141414]">
                {shipping} {currency}
              </span>
            </div>
          )}

          {/* Fila: Descuento */}
          {(showCoupon || discountAmount > 0) && (
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <span className="text-base text-[#3D3D3D]">Descuento</span>
              <span className="text-base font-bold text-[#141414]">
                {discountAmount.toFixed(2)} {currency}
              </span>
            </div>
          )}

          {/* Fila: Total a pagar */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-4">
            <span className="text-base text-[#3D3D3D]">{t("totalToPay")}</span>
            <span className="text-base font-bold text-[#141414] min-w-[5rem] text-right">
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
            <div className="flex items-center gap-2 h-9">
              <div className="flex items-center h-full flex-1 rounded-lg bg-[#EBEBEB] px-3">
                <input
                  placeholder="Ingresa el código"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onApplyCoupon();
                    if (e.key === "Escape") setShowCoupon(false);
                  }}
                  autoFocus
                  className="flex-1 bg-transparent outline-none placeholder-[#010C0F]/50 text-xs text-[#010C0F]"
                />
              </div>
              <button
                onClick={onApplyCoupon}
                type="button"
                className="shrink-0 h-full px-4 rounded-lg bg-black text-white text-xs font-bold hover:bg-black/90"
              >
                {t("apply")}
              </button>
              <button
                type="button"
                onClick={() => setShowCoupon(false)}
                aria-label="Cerrar cupón"
                className="shrink-0 text-xl text-[#5D5D5D] hover:text-black"
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
