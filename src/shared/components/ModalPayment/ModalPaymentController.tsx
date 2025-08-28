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

  const isEncryptedSim = React.useMemo(() => {
  const p: any = params || {};
  const prov = (p.provider || p.brand || "").toLowerCase();
  const catId = String(p.categoryId ?? p.category?.id ?? "");
  const catName = (p.categoryName || p.category?.name || "").toLowerCase();

  const providerCandidate = prov || qpProvider;
  const isSimCategory =
    catId === "40" || catName.includes("sim") || qpSelectedOption === "40";
  return isSimCategory && providerCandidate.includes("encript");
  }, [params, qpProvider, qpSelectedOption]);

  const { theme = "light", mode = "roning_code" } = (params || {}) as {
    theme?: "light" | "dark";
    mode?: Mode;
  };

  React.useEffect(() => {
    if (!isModalOpen) return;
    if (isEncryptedSim && mode !== "sim") {
      openModal({ ...(params || {}), mode: "sim" });
    }
    if (!isEncryptedSim && mode === "sim") {
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
        return <ModalSIM />;
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
      panelClassName="
  bg-[#F7F9FB]
  rounded-none p-3
  w-full h-full max-h-screen
  overflow-x-hidden
  sm:rounded-[16px] sm:h-auto sm:max-h-[90vh] sm:p-6 sm:w-[628px]
  md:w-[628px]
  ipad:bg-[#FAFAFA] ipad:w-[628px] ipad:rounded-[21px]
  lg:w-[696px] lg:rounded-[21px] lg:overflow-hidden 
"
    >
      <div
        className="
    max-h-full overflow-y-auto overflow-x-hidden overscroll-contain
    pb-4 md:pb-6 lg:pb-8
    lg:max-h-[calc(100vh-120px)] no-scrollbar-lg
  "
      >
        <ModalStack className="ipad:w-full lg:w-full md:mx-0">
          {renderByMode()}
        </ModalStack>
      </div>
    </ModalPayment>
  );
}
