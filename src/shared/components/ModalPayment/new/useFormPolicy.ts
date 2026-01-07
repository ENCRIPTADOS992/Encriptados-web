// src/shared/components/ModalPayment/new/useFormPolicy.ts
"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import { 
  getFormPolicyForProduct, 
  getFormTypeForProduct,
  FORM_POLICIES,
  type FormPolicy, 
  type FormType 
} from "@/shared/constants/formPolicies";

export interface UseFormPolicyResult {
  formType: FormType;
  policy: FormPolicy;
  isLoading: boolean;
  productName: string;
  categoryId: number;
}

/**
 * Hook para obtener la política de formulario correcta según el producto actual.
 * Usa el producto del modal para determinar qué tipo de formulario mostrar.
 */
export function useFormPolicy(): UseFormPolicyResult {
  const { params } = useModalPayment();
  const productid = (params as any)?.productid as string | undefined;

  const { data: product, isLoading } = useQuery({
    queryKey: ["productForFormPolicy", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
    staleTime: 1000 * 60 * 5,
  });

  const result = useMemo(() => {
    if (!product) {
      return {
        formType: "APP_RONING" as FormType,
        policy: FORM_POLICIES.APP_RONING,
        productName: "",
        categoryId: 0,
      };
    }

    const productName = product.name || "";
    const categoryId = product.category?.id || 0;
    const formType = getFormTypeForProduct(productName, categoryId);
    const policy = getFormPolicyForProduct(productName, categoryId);

    return {
      formType,
      policy,
      productName,
      categoryId,
    };
  }, [product]);

  return {
    ...result,
    isLoading,
  };
}
