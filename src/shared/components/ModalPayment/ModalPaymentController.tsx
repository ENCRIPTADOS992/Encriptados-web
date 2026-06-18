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
import { sendPurchaseToServer, trackPurchase } from "@/shared/utils/analytics";

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
    isReady,
  } = useModalPaymentController();

  // ── Success state lives here, OUTSIDE ModalPayment ──
  const [successDisplay, setSuccessDisplay] = useState<SuccessDisplayData | null>(null);
  const trackedPurchaseKeysRef = React.useRef<Set<string>>(new Set());

  const handlePaymentSuccess = useCallback(
    (data: SuccessDisplayData) => {
      const transactionKey = String(data.orderId ?? data.intent?.id ?? "").trim();

      if (transactionKey && !trackedPurchaseKeysRef.current.has(transactionKey)) {
        trackedPurchaseKeysRef.current.add(transactionKey);

        const quantity = data.product?.quantity ?? 1;
        const fallbackValue = Math.max(
          (data.product?.unitPrice ?? 0) * quantity + (data.product?.shippingCost ?? 0) - (data.product?.discount ?? 0),
          0
        );
        const payload = {
          transactionId: transactionKey,
          value: data.intent?.amount != null ? data.intent.amount / 100 : fallbackValue,
          currency: (data.intent?.currency || "usd").toUpperCase(),
          shipping: data.product?.shippingCost,
          discount: data.product?.discount,
          source: "frontend_success",
          items: [
            {
              item_id: String(data.product?.productId ?? transactionKey),
              item_name: data.product?.name,
              item_brand: data.product?.brandKey ?? data.product?.brand,
              item_variant: data.product?.licensePeriod,
              price: data.product?.unitPrice,
              quantity,
            },
          ],
        };

        trackPurchase(payload);
        sendPurchaseToServer(payload);
      }

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
              {isReady ? (
                renderByMode()
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-16">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-500" />
                </div>
              )}
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
