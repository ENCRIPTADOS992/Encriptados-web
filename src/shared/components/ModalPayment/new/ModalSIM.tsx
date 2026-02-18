// src/shared/components/ModalPayment/new/ModalSIM.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById, getAllProducts } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import { validateCoupon } from "@/lib/payments/orderApi";
import type { SuccessDisplayData } from "../ModalPaymentController";
import { useToast } from "@/shared/context/ToastContext";
import { useTranslations } from "next-intl";

import SimFormUnified from "./sims/SimFormUnified";
import type { FormType } from "./sims/types/simFormTypes";
import { resolveSimFormType } from "./sims/utils/resolveSimFormType";
import {
  type ModalProduct,
  type Variant,
  type SuccessPaymentData,
} from "./sims/types/modalSimTypes";
import { buildMinutesPlans } from "./sims/utils/buildMinutesPlans";
import { calcSimUnitPrice } from "./sims/utils/calcSimUnitPrice";
import { buildDataPlans } from "./sims/utils/buildDataPlans";
import { CODE_BY_COUNTRY_LABEL } from "@/shared/constants/countries";

export default function ModalSIM({ onPaymentSuccess }: { onPaymentSuccess?: (data: SuccessDisplayData) => void }) {
  const { params } = useModalPayment();
  const t = useTranslations("paymentModal");
  console.log("🐛 [ModalSIM] Entry Params:", params);
  const { productid, initialPrice, initialGb, initialRegion, initialRegionCode, provider: paramProvider, typeProduct: paramTypeProduct, variantId: paramVariantId, iconUrl: paramIconUrl } = (params || {}) as {
    productid?: string;
    initialPrice?: number;
    initialGb?: string;
    initialRegion?: string;
    initialRegionCode?: string;
    provider?: string;
    typeProduct?: string;
    variantId?: number;
    variants?: any[];
    iconUrl?: string;
  };
  const toast = useToast();
  const [hideSimField, setHideSimField] = React.useState(false);

  const { data: product } = useQuery<ModalProduct>({
    queryKey: ["productById", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });
  console.log("[ModalSIM] product crudo =>", product);

  const resolvedRegionCode = React.useMemo(() => {
    if (initialRegionCode) return initialRegionCode.toUpperCase();
    if (initialRegion) {
      const distinct = initialRegion.toLowerCase().trim();
      return CODE_BY_COUNTRY_LABEL[distinct] || null;
    }
    return null;
  }, [initialRegion, initialRegionCode]);

  console.log("[ModalSIM] Resolved Region Code for API:", resolvedRegionCode);

  // Fetch regional products when initialRegion is provided (landing page scenario)
  const hasParamsVariants = (params as any)?.variants?.length > 0;
  const { data: regionalProducts } = useQuery({
    queryKey: ["regionalProducts", initialRegion, resolvedRegionCode],
    queryFn: () => {
      // Logic Upgrade: Distinguish between Region (OCEANIA, EUROPE) and Country (CO, US)
      // Broad regions (codes > 2 chars) should go to simRegion parameter.
      // Specific countries (2 chars) go to simCountry.

      const regionCode = (resolvedRegionCode || "").toUpperCase();
      const inputRegion = (initialRegion || "").toLowerCase();

      const isGlobal = regionCode === "GLOBAL" || inputRegion === "global";

      // If Global, simple.
      if (isGlobal) {
        return getAllProducts(40, "es", { simRegion: "global", simCountry: null });
      }

      // If Broad Region (Length > 2) OR "EU" -> Send as simRegion
      if (regionCode.length > 2 || regionCode === "EU") {
        console.log("🌍 [ModalSIM] Fetching by Region (Broad):", regionCode);
        return getAllProducts(40, "es", { simRegion: regionCode, simCountry: null });
      }

      // If Specific Country (Length 2) -> Send as simCountry
      // Note: We fallback to initialRegion if no code resolved, just in case inputs are raw names
      const countryParam = regionCode || initialRegion;
      console.log("🏳️ [ModalSIM] Fetching by Country:", countryParam);

      return getAllProducts(40, "es", {
        simRegion: null,
        simCountry: countryParam
      });
    },
    enabled: !!initialRegion && !hasParamsVariants && !!productid,
  });

  // Find the matching product from regional products to get regional variants
  const regionalProduct = React.useMemo(() => {
    if (!regionalProducts || !productid) return null;
    return regionalProducts.find((p: any) => String(p.id) === String(productid)) ?? null;
  }, [regionalProducts, productid]);

  console.log("🔍 [ModalSIM] Region Resolution:", {
    initialRegionCode,
    initialRegion,
    resolvedRegionCode,
    regionalProductsQueryKey: ["regionalProducts", product?.id, resolvedRegionCode],
    regionalProductFound: !!regionalProduct
  });

  console.log("[ModalSIM] regional pricing =>", {
    initialRegion,
    hasParamsVariants,
    regionalProduct,
    regionalProductsLength: Array.isArray(regionalProducts) ? regionalProducts.length : 'undefined/not-array',
    regionalProductsFirst: Array.isArray(regionalProducts) ? regionalProducts[0] : null,
    productIdToFind: productid,
    productVariantsRaw: (product as any)?.variants
  });

  // Usar valores de params con prioridad sobre los de la API
  // Esto asegura que el botón "Compartir" use los mismos valores que "Más información"
  const effectiveProvider = paramProvider || (product as any)?.provider || (product as any)?.brand;
  const effectiveTypeProduct = paramTypeProduct || (product as any)?.type_product;

  console.log("[ModalSIM] effective values =>", {
    paramProvider,
    paramTypeProduct,
    apiProvider: (product as any)?.provider,
    apiTypeProduct: (product as any)?.type_product,
    effectiveProvider,
    effectiveTypeProduct
  });

  const formType: FormType = React.useMemo(
    () => resolveSimFormType(product),
    [product]
  );

  const isEsimDataCombo = formType === "encrypted_esimData";

  // Fetch standalone eSIM product (id 449) to get its real price for breakdown
  const ESIM_STANDALONE_ID = "449";
  const { data: esimProduct } = useQuery<any>({
    queryKey: ["productById", ESIM_STANDALONE_ID],
    queryFn: () => getProductById(ESIM_STANDALONE_ID),
    enabled: isEsimDataCombo,
  });

  // eSIM price: use sale_price when on_sale, otherwise regular price
  const esimStandalonePrice = React.useMemo(() => {
    if (!esimProduct) return undefined;
    const onSale = esimProduct.on_sale === true || esimProduct.on_sale === "true";
    const salePrice = parseFloat(esimProduct.sale_price);
    const regularPrice = parseFloat(esimProduct.price);
    if (onSale && !isNaN(salePrice) && salePrice > 0) return salePrice;
    if (!isNaN(regularPrice) && regularPrice > 0) return regularPrice;
    return undefined;
  }, [esimProduct]);

  React.useEffect(() => {
    if (isEsimDataCombo) {
      setHideSimField(true);
    }
  }, [isEsimDataCombo]);

  const [selectedPlanId, setSelectedPlanId] = React.useState<
    string | number | null
  >(null);

  const [quantity, setQuantity] = React.useState(1);
  const [coupon, setCoupon] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  // Priority: 1) regionalProduct.variants (highest precision for price), 2) params.variants (from card), 3) product.variants (fallback)
  const variants: Variant[] = React.useMemo(() => {
    // Si tenemos productos regionales cargados (porque hay initialRegion), usarlos TIENEN PRIORIDAD para el precio correcto
    if (regionalProduct && (regionalProduct as any).variants?.length > 0) {
      console.log("[ModalSIM] Using regionalProduct.variants (Best Source)");
      return (regionalProduct as any).variants as Variant[];
    }
    // Si no, usar los que vienen de los params (tarjeta)
    if ((params as any)?.variants?.length > 0) {
      console.log("[ModalSIM] Using params.variants");
      return (params as any).variants as Variant[];
    }
    // Fallback final
    return (product?.variants ?? []) as Variant[];
  }, [regionalProduct, params, product]);

  // Filter variants based on resolvedRegionCode (Logic ported from ListOfProducts)
  const filteredVariants = React.useMemo(() => {
    if (!variants.length) return [];

    // If no region code resolved, return all (or should we default to something?)
    if (!resolvedRegionCode) return variants;

    const regionCode = resolvedRegionCode.toUpperCase();

    // Case Specific Country (2 char code) OR Broad Region (OCEANIA, EUROPA, etc.)
    // Try to filter strictly first.
    let filtered = variants.filter(v => {
      const vCode = v.scope?.code?.toUpperCase();
      // Since we unified countries.ts to "EUROPA", vCode should match regionCode exactly.
      // We keep the "EU" check just in case legacy data comes through.
      if (regionCode === "EUROPA" && (vCode === "EU" || vCode === "EUROPE")) return true;
      // Also handle the reverse: invalid region code but variant is correct
      if ((regionCode === "EU" || regionCode === "EUROPE") && vCode === "EUROPA") return true;

      return vCode === regionCode;
    });

    console.log("🔍 [ModalSIM] Filtering Logic Debug:", {
      regionCode,
      variantsCount: variants.length,
      filteredCount: filtered.length,
      isBroadRegion: regionCode === "GLOBAL" || regionCode.length > 2 || regionCode === "EUROPA"
    });

    // If we found specific matches (e.g. variants labeled "OCEANIA"), great! Use them.
    if (filtered.length > 0) {
      return filtered;
    }

    // Fallback: If no strict matches found (Logic unification for ALL Broad Regions)
    // If it's a Broad Region (GLOBAL, OCEANIA, EUROPA) and we found nothing strict,
    // we assume there are no specific variants for this region.
    // In this case, we shoud fallback to GLOBAL variants (which work everywhere).
    if (regionCode === "GLOBAL" || regionCode.length > 2 || regionCode === "EUROPA") {
      const globalVariants = variants.filter(v => !v.scope?.code || v.scope.code === "GLOBAL");

      if (globalVariants.length > 0) {
        console.log("⚠️ [ModalSIM] Broad Region mismatch -> Fallback to GLOBAL variants");
        return globalVariants;
      }

      console.log("⚠️ [ModalSIM] Broad Region mismatch & No GLOBAL variants -> Returning ALL variants");
      return variants;
    }

    // For specific country codes (e.g. "CO"), if not found, we return nothing (strict).
    return [];

  }, [variants, resolvedRegionCode]);

  // Use filteredVariants for selection and plans
  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(null);

  React.useEffect(() => {
    if (!filteredVariants.length) return;

    // Si hay un variantId en params, intentar seleccionarlo (si está dentro de los filtrados)
    if (paramVariantId != null) {
      const match = filteredVariants.find((v) => String(v.id) === String(paramVariantId));
      if (match) {
        setSelectedVariant(match);
        return;
      }
    }
    // Default al primero de los filtrados
    setSelectedVariant(filteredVariants[0]);
  }, [filteredVariants, paramVariantId]);

  const minutesPlans = React.useMemo(
    () =>
      buildMinutesPlans({
        formType,
        variants,
        product,
      }),
    [formType, variants, product]
  );

  const dataPlans = React.useMemo(
    () =>
      buildDataPlans({
        formType,
        variants: filteredVariants, // Use filtered variants
        product,
      }),
    [formType, filteredVariants, product]
  );

  console.log("🔍 [ModalSIM] Debugging Data Plans:", {
    formType,
    variantsLength: variants.length,
    filteredVariantsLength: filteredVariants.length,
    firstFilteredVariant: filteredVariants[0],
    dataPlansLength: dataPlans.length,
    dataPlans,
    regionCode: resolvedRegionCode
  });

  const dataAmounts = React.useMemo(() => {
    const toNumber = (v: unknown): number => {
      const n = typeof v === "string" ? parseFloat(v) : Number(v);
      return Number.isFinite(n) ? n : 0;
    };
    const amounts = (variants ?? [])
      .map((v: any) => toNumber(v.price ?? v.cost ?? v.regular_price ?? v.sale_price))
      .filter((n) => n > 0);
    return Array.from(new Set(amounts)).sort((a, b) => a - b);
  }, [variants]);

  React.useEffect(() => {
    if (formType !== "encrypted_minutes") return;
    // Si hay un initialPrice, buscar la variante que coincida con ese precio
    if (initialPrice != null && initialPrice > 0 && minutesPlans.length > 0) {
      const matchingPlan = minutesPlans.find((p) => p.value === initialPrice);
      if (matchingPlan) {
        console.log("[ModalSIM] Seleccionando plan que coincide con initialPrice:", {
          initialPrice,
          matchingPlan,
        });
        setSelectedPlanId(matchingPlan.id);
        return;
      }
    }

    // Si no hay match o no hay initialPrice, usar el primero
    console.log("[ModalSIM] useEffect minutesPlans → setSelectedPlanId", {
      minutesPlans,
      firstId: minutesPlans[0]?.id ?? null,
    });
    setSelectedPlanId(minutesPlans[0]?.id ?? null);
  }, [formType, minutesPlans, initialPrice]);

  // Track if we've already set the initial plan based on initialPrice
  const [initialPlanSet, setInitialPlanSet] = React.useState(false);

  // Reset initialPlanSet when product or price changes (important when switching products)
  React.useEffect(() => {
    setInitialPlanSet(false);
    console.log("[ModalSIM] Reset initialPlanSet due to productid/initialPrice change:", { productid, initialPrice });
  }, [productid, initialPrice]);

  React.useEffect(() => {
    if (formType !== "encrypted_esimData" && formType !== "encrypted_data") return;

    // Si ya procesamos el initialPrice, no volver a hacerlo
    if (initialPlanSet) return;

    const titleNorm = String((product as any)?.name ?? "").toLowerCase();
    // Multi-idioma: ES datos, EN data, FR données, IT dati, PT dados
    const hasDataWord = /(datos?|data|dati|donn[ée]es|dados)/i.test(titleNorm);
    const isEsimPlusDatos =
      /esim/i.test(titleNorm) && hasDataWord;
    const isRecargaDatos =
      /(recarga|recharge|ricarica)/i.test(titleNorm) && hasDataWord && !isEsimPlusDatos;

    // Base: 12 para eSIM + Datos, 0 para Recarga Datos (sin eSIM)
    const base = isEsimPlusDatos ? 12 : 0;

    // Necesitamos variants para calcular
    if (!variants.length) return;

    console.log("[ModalSIM] Data Product Price Selection Debug:", {
      initialPrice,
      formType,
      isEsimPlusDatos,
      isRecargaDatos,
      base,
      paramVariantId,
      variantsLength: variants.length,
      variantPrices: variants.map((v: any) => ({ id: v.id, price: v.price ?? v.cost })),
      productName: (product as any)?.name
    });

    // Para eSIM + Recarga Datos, eSIM + Datos, o Recarga Datos: buscar el monto de recarga que coincida
    if (
      ((formType === "encrypted_esimData" || formType === "encrypted_data") && isEsimPlusDatos) ||
      (formType === "encrypted_data" && isRecargaDatos)
    ) {
      // Si hay paramVariantId, buscar esa variante específica
      if (paramVariantId != null) {
        const matchingVariant = variants.find((v: any) => String(v.id) === String(paramVariantId));
        if (matchingVariant) {
          const variantPrice = Number((matchingVariant as any).price ?? (matchingVariant as any).cost ?? 0);
          const rechargeValue = variantPrice - base;
          console.log("[ModalSIM] ✅ Setting recharge from paramVariantId:", { paramVariantId, variantPrice, base, rechargeValue });
          setSelectedPlanId(rechargeValue);
          setSelectedVariant(matchingVariant as Variant);
          setInitialPlanSet(true);
          return;
        }
      }

      // Si hay initialPrice, buscar la variante cuyo precio coincida
      if (initialPrice != null && initialPrice > 0) {
        const matchingVariant = variants.find((v: any) => {
          const variantPrice = Number(v.price ?? v.cost ?? v.regular_price ?? v.sale_price ?? 0);
          return Math.abs(variantPrice - initialPrice) < 0.1;
        });

        console.log("[ModalSIM] Data Product Variant Matching:", {
          initialPrice,
          base,
          matchingVariant: matchingVariant ? { id: (matchingVariant as any).id, price: (matchingVariant as any).price } : null,
        });

        if (matchingVariant) {
          const variantPrice = Number((matchingVariant as any).price ?? (matchingVariant as any).cost ?? 0);
          const rechargeValue = variantPrice - base;
          console.log("[ModalSIM] ✅ Setting recharge amount:", { initialPrice, variantPrice, base, rechargeValue });
          setSelectedPlanId(rechargeValue);
          setSelectedVariant(matchingVariant as Variant); // <-- FIX: Sync variant
          setInitialPlanSet(true);
          return;
        }
      }

      // Fallback: usar el primer variante como monto de recarga
      const firstVariantPrice = Number((variants[0] as any)?.price ?? (variants[0] as any)?.cost ?? 0);
      const defaultRecharge = Math.max(firstVariantPrice - base, 0);
      console.log("[ModalSIM] Using default recharge from first variant:", { firstVariantPrice, base, defaultRecharge });
      setSelectedPlanId(defaultRecharge);
      setInitialPlanSet(true);
      return;
    }

    // Para otros tipos de productos de datos
    if (!dataAmounts.length) return;

    setSelectedPlanId(dataAmounts[0]);
    setInitialPlanSet(true);
  }, [formType, dataAmounts, variants, product, initialPrice, initialPlanSet, paramVariantId]);


  React.useEffect(() => {
    if (!dataPlans.length) return;

    // Para eSIM + Recarga Datos, NO usar este useEffect - la lógica está en el useEffect anterior
    const titleNorm = String((product as any)?.name ?? "").toLowerCase();
    const isEsimPlusDatos =
      /esim/i.test(titleNorm) && /(datos?|data|dati|donn[ée]es|dados)/i.test(titleNorm);

    if (formType === "encrypted_esimData" && isEsimPlusDatos) {
      console.log("[ModalSIM] Skipping dataPlans useEffect for eSIM + Recarga Datos");
      return;
    }

    // If we already selected a plan and he haven't changed the type/product significantly, keep it.
    // But if initialGb is set and we haven't matched it yet, try to match.

    // Priority 1: Match by GB label from URL (most reliable)
    let initPlanId: string | number | null = null;

    if (initialGb && dataPlans.length > 0) {
      // Normalize helper: remove any non-alphanumeric char (spaces, symbols, etc)
      const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
      const target = normalize(initialGb);

      // Try exact normalized match
      let matchingByLabel = dataPlans.find((p) => normalize(p.label) === target);

      // If not found, try matching by numeric value (e.g. "15 GB" -> "15")
      if (!matchingByLabel) {
        const targetNum = parseInt(initialGb.replace(/\D/g, ''), 10);
        if (!isNaN(targetNum)) {
          matchingByLabel = dataPlans.find(p => {
            const pNum = parseInt(p.label.replace(/\D/g, ''), 10);
            // Match if number matches and label contains "GB" or similar
            return !isNaN(pNum) && pNum === targetNum && /gb/i.test(p.label);
          });
        }
      }

      console.log("🔍 [ModalSIM] Selection logic:", {
        initialGb,
        target,
        dataPlansLabels: dataPlans.map(p => ({ raw: p.label, norm: normalize(p.label) })),
        matchingByLabel
      });
      if (matchingByLabel) {
        console.log("[ModalSIM] Matched plan by GB label (aggressive norm):", { initialGb, matchingPlan: matchingByLabel });
        initPlanId = matchingByLabel.id;
      }
    }

    // Priority 2: Match by variantId from params
    if (initPlanId == null && paramVariantId != null) {
      const match = dataPlans.find((p) => String(p.id) === String(paramVariantId));
      if (match) initPlanId = match.id;
    }

    // Priority 3: Match by price
    if (initPlanId == null && initialPrice != null && initialPrice > 0) {
      // Robust matching including bases
      const bases = [0, 12, 7.5];
      for (const base of bases) {
        // Direct or Base adjusted match
        const matching = dataPlans.find((p) => {
          const val = Number(p.value);
          // Check Exact, Val+Base, Val-Base
          return Math.abs(val - initialPrice) < 0.1 ||
            Math.abs((val + base) - initialPrice) < 0.1 ||
            Math.abs((val - base) - initialPrice) < 0.1;
        });

        if (matching) {
          console.log("[ModalSIM] Priority 3 matched by price:", { initialPrice, base, plan: matching });
          initPlanId = matching.id;
          break;
        }
      }
    }

    // If found a match, set it. Only if we don't have one or if we want to force initial from URL on simplified logic
    if (initPlanId != null) {
      setSelectedPlanId(initPlanId);
      const matchingVariant = variants.find(v => String(v.id) === String(initPlanId));
      if (matchingVariant) setSelectedVariant(matchingVariant);
    } else if (selectedPlanId == null) {
      // Fallback to first if nothing selected
      setSelectedPlanId(dataPlans[0].id);
      const firstVariant = variants.find(v => String(v.id) === String(dataPlans[0].id));
      if (firstVariant) setSelectedVariant(firstVariant);
    }

  }, [dataPlans, initialGb, initialPrice, paramVariantId, variants, product, formType]);

  // Track si el usuario ha cambiado manualmente el plan
  const [userChangedPlan, setUserChangedPlan] = React.useState(false);

  // Handler para cuando el usuario cambia el plan manualmente
  const handlePlanChange = React.useCallback((planId: string | number) => {
    setSelectedPlanId(planId);
    const nextVariant = variants.find((v) => String(v.id) === String(planId));
    if (nextVariant) setSelectedVariant(nextVariant);
    setUserChangedPlan(true);
  }, [variants]);

  React.useEffect(() => {
    if (selectedPlanId == null || !variants.length) return;

    const byId = variants.find((v) => String(v.id) === String(selectedPlanId));
    if (byId) {
      if (selectedVariant?.id !== byId.id) setSelectedVariant(byId);
      return;
    }

    if (formType !== "encrypted_data" && formType !== "encrypted_esimData") return;

    const selectedRecharge = Number(selectedPlanId);
    if (!Number.isFinite(selectedRecharge)) return;

    const titleNorm = String((product as any)?.name ?? "").toLowerCase();
    const hasDataWord = /(datos?|data|dati|donn[ée]es|dados)/i.test(titleNorm);
    const isEsimPlusDatos = /esim/i.test(titleNorm) && hasDataWord;
    const rechargeBase = isEsimPlusDatos ? 12 : 0;

    const mappedByAmount = variants.find((v: any) => {
      const variantPrice = Number(v.price ?? v.cost ?? v.regular_price ?? v.sale_price ?? 0);
      const rechargeValue = Math.max(variantPrice - rechargeBase, 0);
      return Math.abs(rechargeValue - selectedRecharge) < 0.01;
    });

    if (mappedByAmount && selectedVariant?.id !== mappedByAmount.id) {
      setSelectedVariant(mappedByAmount);
    }
  }, [selectedPlanId, variants, product, formType, selectedVariant]);

  const unitPrice = React.useMemo(
    () => {
      const hasCoupon = discount > 0;
      const productIsOnSale = product?.on_sale === true || (product as any)?.on_sale === "true";
      // Si hay cupón, no aplicar oferta: usar precio regular
      const skipSale = hasCoupon && productIsOnSale;

      const titleNorm = String((product as any)?.name ?? "").toLowerCase();
      const hasDataWordU = /(datos?|data|dati|donn[ée]es|dados)/i.test(titleNorm);
      const isTimEsimData =
        formType === "tim_esim" &&
        /esim/i.test(titleNorm) &&
        hasDataWordU;

      const isEncryptedEsimPlusData =
        (formType === "encrypted_esimData" || formType === "encrypted_data") &&
        /esim/i.test(titleNorm) && hasDataWordU;

      // Para productos de minutos, siempre usar el precio del plan seleccionado
      if (formType === "encrypted_minutes" && minutesPlans.length > 0) {
        const selectedPlan = minutesPlans.find((p) => p.id === selectedPlanId) ?? minutesPlans[0];
        console.log("[ModalSIM] Usando precio del plan seleccionado:", selectedPlan.value);
        return selectedPlan.value;
      }

      if (formType === "tim_data" || isTimEsimData) {
        const selected =
          dataPlans.find((p) => String(p.id) === String(selectedPlanId ?? "__none__")) ??
          dataPlans[0];

        // If user hasn't changed the plan and the selected plan matches the initial GB,
        // use initialPrice (which includes regional pricing from the card)
        // Si hay cupón y el producto estaba en oferta, NO usar initialPrice (contiene sale_price)
        if (!skipSale && !userChangedPlan && initialPrice != null && initialPrice > 0 && initialGb) {
          if (selected?.label === initialGb) {
            console.log("[ModalSIM] Using initialPrice for TIM data (matches initialGb):", { initialPrice, initialGb });
            return initialPrice;
          }
        }

        // Otherwise use the plan's backend price
        const value = Number(selected?.value ?? 0);
        if (value > 0) return value;
      }

      if (isEncryptedEsimPlusData) {
        return calcSimUnitPrice({
          formType,
          minutesPlans,
          selectedPlanId,
          variants,
          selectedVariant,
          product,
          skipSale,
        });
      }

      // Si se pasó un precio inicial desde la card y el usuario no ha cambiado nada, usarlo
      // Pero NO si hay cupón y el producto estaba en oferta (initialPrice contiene sale_price)
      if (!skipSale && initialPrice != null && initialPrice > 0 && !userChangedPlan) {
        console.log("[ModalSIM] Usando initialPrice del params:", initialPrice);
        return initialPrice;
      }

      return calcSimUnitPrice({
        formType,
        minutesPlans,
        selectedPlanId,
        variants,
        selectedVariant,
        product,
        skipSale,
      });
    },
    [formType, minutesPlans, selectedPlanId, variants, selectedVariant, product, initialPrice, userChangedPlan, discount]
  );

  const onApplyCoupon = async () => {
    if (!coupon.trim()) return;
    try {
      const totalAmount = unitPrice * quantity;
      const res = await validateCoupon(coupon.trim(), product?.name, productid, totalAmount);
      if (res.ok) {
        let effectiveDiscount: number;
        if (typeof res.discount_applied === "number") {
          effectiveDiscount = res.discount_applied;
        } else if (typeof res.discount_value === "number") {
          effectiveDiscount =
            res.discount_type === "percent"
              ? (totalAmount * res.discount_value) / 100
              : res.discount_value;
        } else {
          setDiscount(0);
          toast.error(res.message || "Cupón inválido");
          return;
        }
        setDiscount(Math.round(effectiveDiscount * 100) / 100);
        const productIsOnSale = product?.on_sale === true || (product as any)?.on_sale === "true";
        if (productIsOnSale) {
          toast.info(t("couponReplacesOffer"));
        } else {
          toast.success(res.message || "Cupón aplicado");
        }
      } else {
        setDiscount(0);
        toast.error(res.message || "Cupón inválido");
      }
    } catch (e) {
      setDiscount(0);
      toast.error("Error validando el cupón");
    }
  };

  // Crear producto enriquecido con valores efectivos de provider/typeProduct
  // Esto asegura que PurchaseHeader use los mismos valores que CardProduct "Más información"
  // Y corregir nombre si viene "Recarga" pero estamos en modo SIM/eSIM
  const enrichedProduct = React.useMemo(() => {
    if (!product) return product;

    let fixedName = product.name;
    const isRecargaName = /(recarga|recharge|ricarica)/i.test((product.name || ""));

    if (effectiveProvider?.toLowerCase().includes("tim") || effectiveProvider?.toLowerCase().includes("bne")) {
      if (effectiveTypeProduct === "Digital" && isRecargaName) {
        fixedName = "eSIM + Datos";
      } else if (effectiveTypeProduct === "Fisico" && isRecargaName) {
        fixedName = "SIM + Datos";
      }
    }

    return {
      ...product,
      name: fixedName,
      provider: effectiveProvider,
      type_product: effectiveTypeProduct,
      variants: variants,
    };
  }, [product, effectiveProvider, effectiveTypeProduct, variants]);

  const handlePaymentSuccess = React.useCallback((data: SuccessPaymentData) => {
    if (!onPaymentSuccess) return;

    const isDigital =
      formType === "encrypted_data" ||
      formType === "encrypted_minutes" ||
      formType === "encrypted_esim" ||
      formType === "encrypted_esimData" ||
      formType === "tim_esim" ||
      formType === "tim_data" ||
      formType === "tim_minutes";

    const titleNorm = String(enrichedProduct?.name ?? "").toLowerCase();
    const isEsimPlusDatos =
      (formType === "encrypted_esimData" || formType === "tim_esim") &&
      /esim/i.test(titleNorm) &&
      /(datos?|data|dati|donn[ée]es|dados)/i.test(titleNorm);

    // Use the real eSIM price from the API endpoint (product 449)
    const esimBase = isEsimPlusDatos ? (esimStandalonePrice ?? undefined) : undefined;
    const rechargeAmt = isEsimPlusDatos && esimBase != null
      ? Math.max(unitPrice - esimBase, 0)
      : undefined;

    onPaymentSuccess({
      intent: data.intent,
      orderId: data.orderId,
      product: {
        name: enrichedProduct?.name ?? "SIM",
        image: enrichedProduct?.iconUrl || paramIconUrl || enrichedProduct?.images?.[0]?.src,
        brand: enrichedProduct?.brand ?? "Encriptados",
        quantity,
        unitPrice,
        shippingCost: isDigital ? 0 : 75,
        esimPrice: esimBase,
        rechargeAmount: rechargeAmt,
      },
    });
  }, [onPaymentSuccess, formType, enrichedProduct, unitPrice, quantity, esimStandalonePrice]);

  // Lógica de oferta: calcular total original para mostrar "Antes" en el tag
  // No mostrar tag de oferta si hay cupón activo (no dos descuentos a la vez)
  const isOnSale = React.useMemo(() => {
    if (discount > 0) return false;
    return product?.on_sale === true || (product as any)?.on_sale === "true";
  }, [product, discount]);

  const originalTotal = React.useMemo(() => {
    if (!isOnSale) return undefined;
    const regularPrice = parseFloat(String(product?.price ?? "0"));
    if (!regularPrice || regularPrice <= unitPrice) return undefined;
    const shipping_ =
      formType === "encrypted_data" ||
      formType === "encrypted_minutes" ||
      formType === "encrypted_esim" ||
      formType === "encrypted_esimData" ||
      formType === "tim_esim" ||
      formType === "tim_data" ||
      formType === "tim_minutes"
        ? 0
        : 75;
    return regularPrice * quantity + shipping_;
  }, [isOnSale, product, unitPrice, quantity, formType]);

  return (
    <PurchaseScaffold
      mode="sim"
      enableTabSwitch={false}
      showRechargeCTA={false}
      product={enrichedProduct}
      selectedVariantId={selectedVariant?.id ?? null}
      onChangeVariant={(id) =>
        setSelectedVariant(variants.find((v) => v.id === id) ?? null)
      }
      quantity={quantity}
      setQuantity={setQuantity}
      coupon={coupon}
      setCoupon={setCoupon}
      onApplyCoupon={onApplyCoupon}
      discount={discount}
      unitPrice={unitPrice}
      showLicense={false}
      shipping={
        formType === "encrypted_data" ||
          formType === "encrypted_minutes" ||
          formType === "encrypted_esim" ||
          formType === "encrypted_esimData" ||
          formType === "tim_esim" ||
          formType === "tim_data" ||
          formType === "tim_minutes"
          ? undefined
          : 75
      }
      minutesPlans={minutesPlans}
      dataPlans={dataPlans}
      selectedPlanId={selectedPlanId}
      onChangePlan={handlePlanChange}
      showEsimAddon={
        formType === "encrypted_data" ||
        (formType === "encrypted_minutes" && !isEsimDataCombo)
      }
      esimAddonPrice={7.5}
      esimAddonLabel="Lleva E-SIM por 7.50 USD"
      onChangeEsimAddon={(checked) => setHideSimField(checked)}
      sourceUrl={params.sourceUrl}
      gb={dataPlans.find((p) => String(p.id) === String(selectedPlanId))?.label || initialGb}
      region={initialRegion}
      regionCode={(() => {
        const code = initialRegionCode || resolvedRegionCode || selectedVariant?.scope?.code || variants[0]?.scope?.code;
        console.log("🚩 [ModalSIM] Resolving regionCode:", {
          initialRegionCode,
          resolvedRegionCode,
          selectedVariantScope: selectedVariant?.scope,
          firstVariantScope: variants[0]?.scope,
          resolvedCode: code,
          initialRegion
        });
        return code;
      })()}
      flagUrl={
        (params.flagUrl === "/images/icons/global.svg" || params.flagUrl === "/icons/alcance-global.svg")
          ? undefined
          : params.flagUrl
      }
      shareProductId={productid}
      onSale={isOnSale}
      originalTotal={originalTotal}
      onRemoveCoupon={() => { setDiscount(0); setCoupon(""); }}
    >
      <SimFormUnified
        formType={formType}
        productid={productid}
        product={product}
        unitPrice={unitPrice}
        quantity={quantity}
        discount={discount}
        hideSimField={hideSimField || isEsimDataCombo}
        selectedPlanId={selectedPlanId}
        selectedVariantId={selectedVariant?.id ?? null}
        sourceUrl={params.sourceUrl}
        onSuccess={handlePaymentSuccess}
      />
    </PurchaseScaffold >
  );
}
