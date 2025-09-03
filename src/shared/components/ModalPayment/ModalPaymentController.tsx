// src/shared/components/ModalPayment/ModalPaymentController.tsx
"use client";

import React, { Suspense } from "react";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import ModalPayment from "./ModalPayment";

import ModalStack from "./atoms/ModalStack";
import ModalNewUser from "./new/ModalNewUser";
import ModalRoning from "./new/ModalRoning";
import ModalRecharge from "./new/ModalRecharge";
import ModalSIM from "./new/ModalSIM";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/features/products/services";

type Mode = "new_user" | "roning_code" | "recharge" | "sim";

export default function ModalPaymentController() {
  return (
    <Suspense fallback={null}>
      <ModalPaymentControllerInner />
    </Suspense>
  );
}

function ModalPaymentControllerInner() {
  const { isModalOpen, closeModal, params, openModal } = useModalPayment();
  const search = useSearchParams();

  const qpProvider = (search.get("provider") || "").toLowerCase();
  const qpSelectedOption = search.get("selectedOption");

  const { theme = "light", mode = "roning_code" } = (params || {}) as {
    theme?: "light" | "dark";
    mode?: Mode;
  };

  const productid = (params as any)?.productid as string | undefined;

  // 🔎 si tenemos productid pero faltan datos del producto en params, los consultamos
  const { data: product } = useQuery({
    queryKey: ["productById-for-mode", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });

  const norm = (s?: string) =>
    (s ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // ✅ criterio robusto para detectar que es producto de SIM Encriptados
  const isEncryptedSim = React.useMemo(() => {
    const p: any = params || {};
    // 1) intenta con params
    const provP = norm(p.provider || p.brand || "");
    const catIdP = String(p.categoryId ?? p.category?.id ?? "");
    const catNameP = norm(p.categoryName || p.category?.name || "");

    const providerCandidate = provP || qpProvider;
    const isSimCategoryParams =
      catIdP === "40" || catNameP.includes("sim") || qpSelectedOption === "40";

    // 2) si no alcanzan los params, intenta con el producto cargado
    const provProd = norm((product as any)?.provider || (product as any)?.brand);
    const typeProd = norm((product as any)?.type_product);
    const shipProd = norm((product as any)?.shipping);
    const cfgProd  = norm((product as any)?.config_sim?.[0]?.type);
    const isSimByProduct =
      cfgProd === "esim" ||
      cfgProd === "data" ||
      cfgProd === "minutes" ||
      typeProd.includes("fisic") || // cubre "físico"/"fisico"
      shipProd === "si";

    const isSimByParams = isSimCategoryParams && (providerCandidate.includes("encript"));
    const providerIsEncriptados = (provP || provProd).includes("encript");

    // Si por params o por producto sabemos que es SIM "encriptados", true
    return (isSimByParams && providerIsEncriptados) || (isSimByProduct && providerIsEncriptados);
  }, [params, qpProvider, qpSelectedOption, product]);

  // 🔁 ajustar mode SOLO cuando el modal está abierto
  React.useEffect(() => {
    if (!isModalOpen) return;
    // Evita bucles: solo cambia si realmente es distinto
    if (isEncryptedSim && mode !== "sim") {
      openModal({ ...(params || {}), mode: "sim" });
    } else if (!isEncryptedSim && mode === "sim") {
      openModal({ ...(params || {}), mode: "roning_code" });
    }
  }, [isModalOpen, isEncryptedSim, mode, openModal, params]);

  const renderByMode = () => {
    switch (mode) {
      case "roning_code":
        return <ModalRoning />;
      case "recharge":
        return <ModalRecharge />;
      case "sim":
        return <ModalSIM />;  // <-- aquí ya llega
      case "new_user":
      default:
        return <ModalNewUser />;
    }
  };

  return (
    <ModalPayment
      visible={isModalOpen}
      onClose={closeModal}
      theme={theme}
      panelClassName="bg-[#F7F9FB] rounded-none p-3 w-full h-full max-h-screen overflow-x-hidden
                      sm:rounded-[16px] sm:h-auto sm:max-h-[90vh] sm:p-6 sm:w-[628px]
                      md:w-[628px] ipad:bg-[#FAFAFA] ipad:w-[628px] ipad:rounded-[21px]
                      lg:w-[696px] lg:rounded-[21px] lg:overflow-hidden"
    >
      <div className="max-h-full overflow-y-auto overflow-x-hidden overscroll-contain pb-4 md:pb-6 lg:pb-8 lg:max-h-[calc(100vh-120px)] no-scrollbar-lg">
        <ModalStack className="ipad:w/full lg:w/full md:mx-0">
          {renderByMode()}
        </ModalStack>
      </div>
    </ModalPayment>
  );
}
