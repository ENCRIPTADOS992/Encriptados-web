// src/shared/components/ModalPayment/ModalPaymentView.tsx
"use client";

import React, { useState, useRef } from "react";
import { Formik, FormikProps } from "formik";

import { useModalPayment } from "@/providers/ModalPaymentProvider";
import OrderDetails from "./OrderDetails";
import FormPaymentInput from "./FormPaymentInput";
import PaymentOption from "./PaymentOption";
import DividerSection from "./DividerSection";
import EditableDividerSection from "./EditableDividerSection";

import PayWithCreditCard from "./PaymentMethodsView/PayWithCreditCard";
import PayWithCrypto from "./PaymentMethodsView/PayWithCrypto";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";

import {
  PAYMENTS_METHODS,
  paymentOptions,
} from "@/shared/hooks/paymentOptions";
import { paymentValidationSchema } from "@/shared/validations/paymentValidation";
import { initialFormValues } from "@/shared/constants/initialFormValues";

export interface FormValuesPayment {
  email: string;
  telegramId?: string;
  termsAccepted: boolean;
}

const ModalPaymentView: React.FC = () => {
  const { closeModal, params } = useModalPayment();
  const { productid, languageCode } = params as {
    productid?: string;
    languageCode?: string;
  };
  const lang = languageCode ?? "es";

  const { data: product, isLoading, error } = useQuery<ProductById>(
    {
      queryKey: ["productById", productid, lang],
      queryFn: () =>
        productid
          ? getProductById(productid, lang)
          : Promise.reject(new Error("No se proporcionó productid")),
      enabled: !!productid,
    }
  );

  if (error) {
    console.error("Error al obtener el producto:", error);
  }

  const [quantity, setQuantity] = useState(1);
  const totalPrice = (Number(product?.price) || 0) * quantity;
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [activePaymentOption, setPaymentActiveOption] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  const formikRef = useRef<FormikProps<FormValuesPayment>>(null);
  const goBack = () => closeModal();

  let paymentComponent: React.ReactNode = null;
  switch (activePaymentOption) {
    case PAYMENTS_METHODS.CREDIT_CARD:
      paymentComponent = (
        <PayWithCreditCard
          productId={productid!}
          closeModal={goBack}
          languageCode={lang}
          email={userEmail}
        />
      );
      break;
    case PAYMENTS_METHODS.CRYPTO:
      paymentComponent = (
        <PayWithCrypto
          productId={productid!}
          closeModal={goBack}
          languageCode={lang}
          email={userEmail}
        />
      );
      break;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 h-full w-full">
        <p className="mb-4 text-sm text-gray-500">Cargando producto...</p>
        <div className="h-8 w-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-1 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-600">Detalles de compra</h2>
        <button onClick={goBack} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {/* Imagen + Precio/Cupón */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <div className="flex-1 bg-blue-100 rounded-xl p-4 flex items-center justify-center h-full">
          <div className="text-center">
            <img
              src={product?.images?.[0]?.src ?? "/placeholder.png"}
              alt={product?.name}
              className="mx-auto w-40 h-40 object-contain"
            />
            <h3 className="mt-4 text-sm font-semibold text-blue-900">{product?.name}</h3>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-1">
            <DividerSection label="Descuento" value={`${product?.price ?? "0"} USD`} />
            <EditableDividerSection label="Cantidad">
              <FormPaymentInput
                placeholder="1"
                handleChange={e => {
                  const val = Number(e.target.value);
                  if (!isNaN(val)) setQuantity(val);
                }}
                handleBlur={() => {}}
                value={quantity.toString()}
                width="100%"
              />
            </EditableDividerSection>
            <EditableDividerSection label="Cupón">
              <>
                <FormPaymentInput
                  placeholder="Ingresa tu cupón"
                  handleChange={e => setCoupon(e.target.value)}
                  handleBlur={() => {}}
                  value={coupon}
                  width="100%"
                />
                <button
                  type="button"
                  onClick={() =>
                    setDiscount(coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0)
                  }
                  className="text-xs text-[#10b4e7] underline"
                >
                  Aplicar
                </button>
              </>
            </EditableDividerSection>
            <DividerSection label="Descuento" value={`-${discount} USD`} />
            <DividerSection label="Total a pagar" value={`${totalPrice - discount} USD`} />
            {/* <<— REMOVED here: paymentComponent render */}
          </div>
        </div>
      </div>

      {/* Datos de compra */}
      {activePaymentOption === null && (
        <div className="w-full bg-white rounded-xl p-4 mt-1 shadow">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Datos de compra</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormPaymentInput
              name="email"
              placeholder="Ingresa tu Email"
              handleChange={formikRef.current?.handleChange ?? (() => {})}
              handleBlur={formikRef.current?.handleBlur ?? (() => {})}
              value={formikRef.current?.values.email || ""}
              width="100%"
            />
            <FormPaymentInput
              name="telegramId"
              placeholder="ID telegram (opcional)"
              handleChange={formikRef.current?.handleChange ?? (() => {})}
              handleBlur={formikRef.current?.handleBlur ?? (() => {})}
              value={formikRef.current?.values.telegramId || ""}
              width="100%"
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input
              id="termsAccepted"
              name="termsAccepted"
              type="checkbox"
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              checked={formikRef.current?.values.termsAccepted}
              onChange={formikRef.current?.handleChange}
            />
            <label htmlFor="termsAccepted" className="text-xs text-gray-800">
              Acepto términos y condiciones de la compra
            </label>
          </div>
        </div>
      )}

      {/* <<— NEW: Render paymentComponent full width below Datos de compra */}
      {activePaymentOption !== null && (
        <div className="w-full pt-4">
          {paymentComponent}
        </div>
      )}

      {/* Métodos de pago */}
      {activePaymentOption === null && (
        <div className="pt-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Métodos de pago</h3>
          <div className="grid grid-cols-2 gap-4 w-full">
            {paymentOptions.map((option, index) => (
              <PaymentOption
                key={index}
                option={option}
                activeOption={activePaymentOption}
                setActiveOption={setPaymentActiveOption}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalPaymentView;