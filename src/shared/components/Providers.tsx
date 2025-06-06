"use client";

import { ToastProvider } from "@/shared/context/ToastContext";
import { QueryClientProvider } from "@/providers/query-client/QueryClientProvider";
import { ModalPaymentProvider } from "@/providers/ModalPaymentProvider";
import ModalPaymentController from "@/shared/components/ModalPayment/ModalPaymentController";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <QueryClientProvider>
        <ModalPaymentProvider>
          <ModalPaymentController />
          {children}
        </ModalPaymentProvider>
      </QueryClientProvider>
    </ToastProvider>
  );
}
