"use client";

import { ToastProvider } from "@/shared/context/ToastContext";
import { QueryClientProvider } from "@/providers/query-client/QueryClientProvider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <QueryClientProvider>
        {children}
      </QueryClientProvider>
    </ToastProvider>
  );
}
