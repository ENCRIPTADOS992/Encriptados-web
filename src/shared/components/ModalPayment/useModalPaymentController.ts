// src/shared/components/ModalPayment/useModalPaymentController.ts
"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
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

export type Mode = "new_user" | "roning_code" | "recharge" | "sim";

type UseModalPaymentControllerResult = {
  isModalOpen: boolean;
  closeModal: () => void;
  mode: Mode;
  theme: "light" | "dark";
  kind: CategoryKind;
  panelClassName: string;
  contentClassName: string;
};

export function useModalPaymentController(): UseModalPaymentControllerResult {
  const { isModalOpen, closeModal, params, openModal } = useModalPayment();
  const search = useSearchParams();

  const qpProvider = (search.get("provider") || "").toLowerCase();
  const qpSelectedOption = search.get("selectedOption");

  const { theme = "light", mode = "new_user" } = (params || {}) as {
    theme?: "light" | "dark";
    mode?: Mode;
  };

  const productid = (params as any)?.productid as string | undefined;

  const { data: product } = useQuery({
    queryKey: ["productById-for-mode", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
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

  const isEncryptedSim = React.useMemo(() => {
    const p: any = params || {};
    const provP = norm(p.provider || p.brand || "");
    const catIdP = String(p.categoryId ?? p.category?.id ?? "");
    const catNameP = norm(p.categoryName || p.category?.name || "");

    const providerCandidate = provP || qpProvider;
    const isSimCategoryParams =
      catIdP === "40" || catNameP.includes("sim") || qpSelectedOption === "40";

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

  // Track if we've already set the initial mode for this modal session
  const hasSetInitialMode = React.useRef(false);

  React.useEffect(() => {
    // Reset the ref when modal closes
    if (!isModalOpen) {
      hasSetInitialMode.current = false;
      return;
    }

    if (!product || hasSetInitialMode.current) return;

    if (supportOnly) {
      if (mode !== "new_user") openModal({ ...(params || {}), mode: "new_user" });
      hasSetInitialMode.current = true;
      return;
    }

    const wantSimMode = kind === "SIM";

    // Only auto-switch mode on initial load, not on user interaction
    if (wantSimMode && mode !== "sim") {
      openModal({ ...(params || {}), mode: "sim" });
      hasSetInitialMode.current = true;
    } else if (!wantSimMode && mode === "sim") {
      openModal({ ...(params || {}), mode: "roning_code" });
      hasSetInitialMode.current = true;
    } else {
      hasSetInitialMode.current = true;
    }
  }, [isModalOpen, product, kind, mode, openModal, params, supportOnly]);

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
  };
}
