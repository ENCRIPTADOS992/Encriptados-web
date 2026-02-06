// src/shared/components/ModalPayment/ModalPaymentController.tsx
"use client";

import React, { Suspense, useState, useCallback } from "react";
import ModalPayment from "./ModalPayment";

import ModalStack from "./atoms/ModalStack";

import ModalNewUser from "./new/ModalNewUser";
import ModalRoning from "./new/ModalRoning";
import ModalRecharge from "./new/ModalRecharge";
import ModalSIM from "./new/ModalSIM";
import PaymentSuccessModal from "@/payments/PaymentSuccessModal";
import type { ProductSuccessInfo } from "@/payments/PaymentSuccessModal";
import { getModalContentClassName } from "./modalLayout";

import { PurchaseKindProvider } from "./PurchaseKindContext";
import { useModalPaymentController, type Mode } from "./useModalPaymentController";

/** Data that child modals emit when payment succeeds */
export type SuccessDisplayData = {
  intent: { id: string; amount: number; currency: string; created?: number } | null;
  orderId?: number | null;
  product?: ProductSuccessInfo | null;
};

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

  // ── Success state lives here, OUTSIDE ModalPayment ──
  const [successDisplay, setSuccessDisplay] = useState<SuccessDisplayData | null>(null);

  const handlePaymentSuccess = useCallback(
    (data: SuccessDisplayData) => {
      // 1. Close the purchase modal
      closeModal();
      // 2. Show the success modal independently
      setSuccessDisplay(data);
    },
    [closeModal]
  );

  const handleSuccessClose = useCallback(() => {
    setSuccessDisplay(null);
  }, []);

  const renderByMode = () => {
    switch (mode as Mode) {
      case "roning_code":
        return <ModalRoning onPaymentSuccess={handlePaymentSuccess} />;
      case "recharge":
        return <ModalRecharge />;
      case "sim":
        return <ModalSIM onPaymentSuccess={handlePaymentSuccess} />;
      case "new_user":
      default:
        return <ModalNewUser onPaymentSuccess={handlePaymentSuccess} />;
    }
  };

  return (
    <>
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

      {/* Success modal rendered OUTSIDE of ModalPayment → no stacking */}
      <PaymentSuccessModal
        open={!!successDisplay}
        onClose={handleSuccessClose}
        intent={successDisplay?.intent ?? null}
        orderId={successDisplay?.orderId}
        product={successDisplay?.product}
      />
    </>
  );
}
