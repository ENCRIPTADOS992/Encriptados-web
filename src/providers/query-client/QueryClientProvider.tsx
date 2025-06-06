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
        staleTime: 3600,
        refetchOnMount: true,
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
        gcTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
      },
    },
   }));

  return (
    <QueryClientProviderBase client={queryClient}>
      {children}
    </QueryClientProviderBase>
  );
};
