// src/shared/components/ModalPayment/PurchaseKindContext.tsx
"use client";
import React, { createContext, useContext } from "react";
import type { CategoryKind } from "@/shared/utils/getProductCategoryKind";

const PurchaseKindContext = createContext<CategoryKind>("DESCONOCIDO");
export const PurchaseKindProvider = PurchaseKindContext.Provider;
export const usePurchaseKind = () => useContext(PurchaseKindContext);
