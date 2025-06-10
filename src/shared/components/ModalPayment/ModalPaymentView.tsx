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

  console.log("ModalPaymentView -> params:", params);
  console.log("ModalPaymentView -> productid:", productid);
  const lang = languageCode ?? "es";

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<ProductById>({
    queryKey: ["productById", productid, lang],
    queryFn: () => {
      if (!productid) {
        return Promise.reject(new Error("No se proporcionó productid"));
      }
      return getProductById(productid, lang);
    },
    enabled: !!productid,
  });

  if (error) {
    console.error("Error al obtener el producto:", error);
  }

  console.log("ModalPaymentView -> product data:", product);

  const [quantity, setQuantity] = useState(1);
  const totalPrice = (Number(product?.price) || 0) * quantity;
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [activePaymentOption, setPaymentActiveOption] = useState<string | null>(
    null
  );
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
  console.log("Imagen:", product?.images?.[0]?.src);
  console.log("Precio:", product?.price);
 return (
    <div className="space-y-1 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-600">Detalles de compra</h2>
        <button onClick={goBack} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <Formik
        initialValues={initialFormValues as FormValuesPayment}
        validationSchema={paymentValidationSchema}
        innerRef={formikRef}
        onSubmit={(values, { setSubmitting }) => {
          // Guardamos email cuando se hace submit. Pero no navegamos aún:
          setUserEmail(values.email);
          setSubmitting(false);
          // No cerramos modal aquí; la selección de método se hace al click de PaymentOption.
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched, setTouched, validateForm, handleSubmit }) => (
          <>
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              {/* Imagen del producto */}
              <div className="flex-1 bg-blue-100 rounded-xl p-4 flex items-center justify-center h-full">
                <div className="text-center">
                  <img
                    src={product?.images?.[0]?.src ?? "/your-image-placeholder.png"}
                    alt={product?.name ?? "Producto"}
                    className="mx-auto w-40 h-40 object-contain"
                  />
                  <h3 className="mt-4 font-semibold text-lg text-blue-900">{product?.name}</h3>
                </div>
              </div>

              {/* Formulario principal */}
              <div className="flex-1">
                <div className="flex flex-col gap-1">
                  <DividerSection label="Descuento" value={`${product?.price ?? "0"} USD`} />

                  <EditableDividerSection label="Cantidad">
                    <FormPaymentInput
                      placeholder="1"
                      handleChange={(e) => {
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
                        handleChange={(e) => setCoupon(e.target.value)}
                        handleBlur={() => {}}
                        value={coupon}
                        width="100%"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (coupon.trim().toUpperCase() === "DESCUENTO5") setDiscount(5);
                          else setDiscount(0);
                        }}
                        className="text-[#10b4e7] text-xs underline"
                      >
                        Aplicar
                      </button>
                    </>
                  </EditableDividerSection>

                  <DividerSection label="Descuento" value={`-${discount} USD`} />
                  <DividerSection label="Total a pagar" value={`${totalPrice - discount} USD`} />

                  {/* Mostrar componente de pago si ya se eligió */}
                  {activePaymentOption !== null && paymentComponent}
                </div>
              </div>
            </div>

            {/* Sección Datos de compra */}
            {activePaymentOption === null && (
              <div className="w-full rounded-xl p-4 mt-1 bg-white shadow">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Datos de compra</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <FormPaymentInput
                      name="email"
                      placeholder="Ingresa tu Email"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.email}
                      width="100%"
                    />
                    {touched.email && errors.email && (
                      <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                    )}
                  </div>
                  {/* TelegramId */}
                  <div>
                    <FormPaymentInput
                      name="telegramId"
                      placeholder="ID telegram (opcional)"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.telegramId || ""}
                      width="100%"
                    />
                    {touched.telegramId && errors.telegramId && (
                      <div className="text-red-500 text-xs mt-1">{errors.telegramId}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    checked={values.termsAccepted}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="termsAccepted" className="text-xs text-gray-800">
                    Acepto términos y condiciones de la compra
                  </label>
                </div>
                {touched.termsAccepted && errors.termsAccepted && (
                  <div className="text-red-500 text-xs mt-1">{errors.termsAccepted}</div>
                )}

                {/* Métodos de pago */}
                <div className="pt-4">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Métodos de pago</h3>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full">
                    {paymentOptions.map((option, index) => (
                      <PaymentOption
                        key={index}
                        option={option}
                        activeOption={activePaymentOption}
                        setActiveOption={() => {
                          setTouched({
                            email: true,
                            telegramId: touched.telegramId ?? false,
                            termsAccepted: true,
                          });
                          validateForm().then((errs) => {
                            const hasEmailError = !!errs.email;
                            const hasTermsError = !!errs.termsAccepted;
                            if (!hasEmailError && !hasTermsError) {
                              setUserEmail(values.email);
                              setPaymentActiveOption(option.value);
                            }
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Formik>
    </div>
  );
};

export default ModalPaymentView;
