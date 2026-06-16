// src/shared/components/ModalPayment/useModalPaymentController.ts
"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import {
  getProductCategoryKind,
  type CategoryKind,
} from "@/shared/utils/getProductCategoryKind";
import { useUiPolicy } from "./new/useUiPolicy";
import {
  getModalPanelClassName,
  getModalContentClassName,
} from "./modalLayout";
import {
  PRODUCT_CATEGORY_IDS,
  isSimCategoryId,
} from "@/shared/constants/productCategories";

export type Mode = "new_user" | "roning_code" | "recharge" | "sim";

type UseModalPaymentControllerResult = {
  isModalOpen: boolean;
  closeModal: () => void;
  mode: Mode;
  theme: "light" | "dark";
  kind: CategoryKind;
  panelClassName: string;
  contentClassName: string;
  /** true once the product has loaded and the correct mode has been determined */
  isReady: boolean;
};

export function useModalPaymentController(): UseModalPaymentControllerResult {
  const { isModalOpen, closeModal, params, openModal, setMode } = useModalPayment();
  const search = useSearchParams();
  const pathname = usePathname();

  // Extract primitives from searchParams to avoid re-renders from reference changes
  const qpBuy = search.get("buy");
  const qpProvider = (search.get("provider") || "").toLowerCase();
  const qpSelectedOption = search.get("selectedOption");
  const qpProductId = search.get("productId");
  const qpPrice = search.get("price");
  const qpVariantId = search.get("variantId");
  const qpGb = search.get("gb");
  const qpRegion = search.get("region");
  const qpRegionCode = search.get("regionCode");
  const qpFlagUrl = search.get("flagUrl");

  const { theme = "light", mode = "new_user" } = (params || {}) as {
    theme?: "light" | "dark";
    mode?: Mode;
  };

  const productid = (params as any)?.productid as string | undefined;

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["productById", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
    staleTime: 1000 * 60 * 5, // 5 minutos — igual que ModalNewUser, evita doble fetch
  });

  const selectedOption = Number(
    (params as any)?.selectedOption ?? qpSelectedOption ?? NaN
  );

  const { kind }: { kind: CategoryKind } = product
    ? getProductCategoryKind(product, {
      selectedOption,
      categoryId: (params as any)?.categoryId ?? product?.category?.id,
      categoryName:
        (params as any)?.categoryName ?? product?.category?.name,
    })
    : { kind: "DESCONOCIDO" as CategoryKind, reason: "no product yet" };

  const { allowedModes } = useUiPolicy();

  const norm = (s?: string) =>
    (s ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const formatGbBadge = (raw?: string | null) => {
    const value = String(raw ?? "").trim();
    if (!value) return undefined;
    if (/^\d+(?:[.,]\d+)?$/i.test(value)) return `${value.replace(",", ".")} GB`;
    if (/^\d+(?:[.,]\d+)?\s*(gb|gigas?)$/i.test(value)) {
      const amount = value.match(/^\d+(?:[.,]\d+)?/)?.[0]?.replace(",", ".");
      return amount ? `${amount} GB` : value.toUpperCase();
    }
    return value.toUpperCase();
  };

  const isEncryptedSim = React.useMemo(() => {
    const p: any = params || {};
    const provP = norm(p.provider || p.brand || "");
    const catIdP = String(p.categoryId ?? p.category?.id ?? "");
    const catNameP = norm(p.categoryName || p.category?.name || "");

    const providerCandidate = provP || qpProvider;
    const isSimCategoryParams =
      isSimCategoryId(catIdP) ||
      catNameP.includes("sim") ||
      isSimCategoryId(qpSelectedOption);

    const provProd = norm(
      (product as any)?.provider || (product as any)?.brand
    );
    const typeProd = norm((product as any)?.type_product);
    const shipProd = norm((product as any)?.shipping);
    const cfgProd = norm((product as any)?.config_sim?.[0]?.type);

    const isSimByProduct =
      cfgProd === "esim" ||
      cfgProd === "data" ||
      cfgProd === "minutes" ||
      typeProd.includes("fisic") ||
      shipProd === "si";

    const isSimByParams =
      isSimCategoryParams && providerCandidate.includes("encript");
    const providerIsEncriptados = (provP || provProd).includes("encript");

    return (
      (isSimByParams && providerIsEncriptados) ||
      (isSimByProduct && providerIsEncriptados)
    );
  }, [params, qpProvider, qpSelectedOption, product]);

  const supportOnly = React.useMemo(() => {
    const name = norm((product as any)?.name || "");
    const packed = name.replace(/[^a-z0-9]/g, "");
    const isArmadilloChat = packed.includes("armadillochat");
    const isArmadilloSystem = packed === "armadillo" || packed.includes("armadillophone");
    return (
      (!isArmadilloChat && isArmadilloSystem) ||
      packed.includes("vaultchat") ||
      packed.includes("vnclagoon") ||
      packed === "salt" ||
      packed.includes("saltapp") ||
      packed.includes("ultrax") ||
      packed.includes("intactphone") ||
      packed.includes("decsecure")
    );
  }, [product]);

  const buyAutoOpenedRef = React.useRef(false);

  React.useEffect(() => {
    if (qpBuy !== "1") {
      buyAutoOpenedRef.current = false;
      return;
    }
    if (buyAutoOpenedRef.current) return;
    if (isModalOpen) return;

    const isRouterPath = pathname.includes("/router") || pathname.includes("router-camaleon");
    const isSimPath = pathname.includes("/sim/");
    const isEncryptedSimPath =
      pathname === "/encrypted-sim" || pathname.endsWith("/encrypted-sim");
    const isTimSimPath = pathname === "/tim-sim" || pathname.endsWith("/tim-sim");

    // Apps handle buy=1 auto-open internally in AppClientPage (with variant support)
    if (!isRouterPath && !isSimPath && !isEncryptedSimPath && !isTimSimPath) {
      return;
    }

    buyAutoOpenedRef.current = true;

    const match = pathname.match(/^\/(en|es|fr|it|pt)(\/|$)/);
    const locale = match?.[1] ?? "es";

    const parsedPrice = qpPrice ? Number.parseFloat(qpPrice) : NaN;
    const parsedVariantId = qpVariantId ? Number.parseInt(qpVariantId, 10) : NaN;
    const variantIdFromUrl = Number.isFinite(parsedVariantId) && parsedVariantId > 0
      ? parsedVariantId
      : undefined;

    if (isRouterPath) {
      openModal({
        productid: qpProductId || "59747",
        languageCode: locale,
        selectedOption: PRODUCT_CATEGORY_IDS.ROUTERS,
        initialPrice: Number.isFinite(parsedPrice) ? parsedPrice : undefined,
        variantId: variantIdFromUrl,
      });
    } else {
      if (!qpProductId) return;

      // Extract additional SIM parameters from URL
      const gbFromUrl = formatGbBadge(qpGb);
      const regionFromUrl = qpRegion;
      const regionCodeFromUrl = qpRegionCode;
      const flagUrlFromUrl = qpFlagUrl;

      openModal({
        productid: qpProductId,
        languageCode: locale,
        selectedOption: PRODUCT_CATEGORY_IDS.SIMS,
        initialPrice: Number.isFinite(parsedPrice) ? parsedPrice : undefined,
        variantId: variantIdFromUrl,
        mode: "sim",
        // Pass captured SIM params
        initialGb: gbFromUrl || undefined,
        initialRegion: regionFromUrl || undefined,
        initialRegionCode: regionCodeFromUrl || undefined,
        flagUrl: flagUrlFromUrl || undefined,
      });
    }

    const url = new URL(window.location.href);
    url.searchParams.delete("buy");
    window.history.replaceState({}, "", url.toString());
  }, [qpBuy, pathname, isModalOpen, openModal, qpProductId, qpPrice, qpVariantId, qpGb, qpRegion, qpRegionCode, qpFlagUrl]);

  // Track if we've already set the initial mode for this modal session
  // Uses state (not ref) so that isReady re-renders when mode is resolved
  const [modeResolved, setModeResolved] = React.useState(false);
  // Use ref for mode to avoid re-triggering this effect when mode changes
  const modeRef = React.useRef(mode);
  modeRef.current = mode;

  React.useEffect(() => {
    // Reset when modal closes
    if (!isModalOpen) {
      setModeResolved(false);
      return;
    }

    if (modeResolved) return;

    // If query is finished but product is not found or failed, resolve it anyway to avoid infinite spinner
    if (!isLoadingProduct && !product) {
      setModeResolved(true);
      return;
    }

    if (!product) return;

    if (supportOnly) {
      if (modeRef.current !== "new_user") setMode("new_user");
      setModeResolved(true);
      return;
    }

    const wantSimMode = kind === "SIM";

    // Only auto-switch mode on initial load, not on user interaction
    if (wantSimMode && modeRef.current !== "sim") {
      setMode("sim");
    } else if (!wantSimMode && modeRef.current === "sim") {
      setMode("roning_code");
    }
    setModeResolved(true);
  }, [isModalOpen, product, kind, setMode, supportOnly, modeResolved, isLoadingProduct]);

  // The modal is "ready" once we've loaded the product and determined the correct mode,
  // or if there's no productid to fetch at all,
  // or if the mode was explicitly set in openModal params (e.g., mode: "sim" from FixedSimProducts).
  // When mode is explicit, we trust the caller and don't block on product loading.
  const hasExplicitMode = !!(params as any)?.mode;
  const isReady = !productid || (!isLoadingProduct && modeResolved) || hasExplicitMode;

  const panelClassName = getModalPanelClassName({ mode, kind });
  const contentClassName = getModalContentClassName({ mode, kind });

  return {
    isModalOpen,
    closeModal,
    mode,
    theme,
    kind,
    panelClassName,
    contentClassName,
    isReady,
  };
}
