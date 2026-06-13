// In Next.js, this file would be called: app/providers.jsx
"use client";

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "@tanstack/react-query";

export const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 5 * 60 * 1000, // 5 minutos
        refetchOnMount: false,
      },
    },
  });
};

export const QueryClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 10 * 60 * 1000,     // 10 minutos
        staleTime: 5 * 60 * 1000,   // 5 minutos
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
      },
    },
   }));

  return (
    <QueryClientProviderBase client={queryClient}>
      {children}
    </QueryClientProviderBase>
  );
};
