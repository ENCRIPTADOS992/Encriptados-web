"use client";

import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "@tanstack/react-query";

export const QueryClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 10 * 60 * 1000,     // 10 minutes
        staleTime: 5 * 60 * 1000,   // 5 minutes
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
