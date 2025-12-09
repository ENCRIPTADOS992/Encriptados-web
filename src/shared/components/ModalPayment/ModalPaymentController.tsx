// src/shared/components/ModalPayment/ModalPaymentController.tsx
"use client";

import React, { Suspense } from "react";
import ModalPayment from "./ModalPayment";

import ModalStack from "./atoms/ModalStack";

import ModalNewUser from "./new/ModalNewUser";
import ModalRoning from "./new/ModalRoning";
import ModalRecharge from "./new/ModalRecharge";
import ModalSIM from "./new/ModalSIM";
import { getModalContentClassName } from "./modalLayout";

import { PurchaseKindProvider } from "./PurchaseKindContext";
import { useModalPaymentController, type Mode } from "./useModalPaymentController";

export default function ModalPaymentController() {
  return (
    <Suspense fallback={null}>
      <ModalPaymentControllerInner />
    </Suspense>
  );
}

function ModalPaymentControllerInner() {
  const {
    isModalOpen,
    closeModal,
    mode,
    theme,
    kind,
    panelClassName,
    contentClassName,
  } = useModalPaymentController();

  const renderByMode = () => {
    switch (mode as Mode) {
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
      panelClassName={panelClassName}
    >
      <PurchaseKindProvider value={kind}>
        <div className={getModalContentClassName({ mode, kind })}>
          <ModalStack className="ipad:w-full lg:w-full md:mx-0">
            {renderByMode()}
          </ModalStack>
        </div>
      </PurchaseKindProvider>
    </ModalPayment>
  );
}
