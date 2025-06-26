"use client";

import React, { useState } from "react";
import Link from "next/link"; 
import { Formik } from "formik";
import Image from "next/image";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import FormPaymentInput from "./FormPaymentInput";
import PaymentOption from "./PaymentOption";
import DividerSection from "./DividerSection";
import EditableDividerSection from "./EditableDividerSection";

import PayWithCreditCard from "./PaymentMethodsView/PayWithCreditCard";
import PayWithCrypto from "./PaymentMethodsView/PayWithCrypto";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/features/products/services";
import type { Product } from "@/features/products/types/AllProductsResponse";

import {
  PAYMENTS_METHODS,
  paymentOptions,
} from "@/shared/hooks/paymentOptions";
import { paymentValidationSchema } from "@/shared/validations/paymentValidation";
import { initialFormValues } from "@/shared/constants/initialFormValues";
import { StripeProvider } from "@/shared/components/StripeProvider";

const ModalPaymentView: React.FC = () => {
  const { closeModal, params } = useModalPayment();
  const { productid, languageCode } = params as {
    productid?: string;
    languageCode?: string;
  };

  const {
    data: product,
    isLoading,
    error: productError,
  } = useQuery<Product, Error, Product>({
    queryKey: ["productById", productid],
    // aquí va tu función de fetch
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });

  const [quantity, setQuantity] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [activePaymentOption, setPaymentActiveOption] = useState<string | null>(
    null
  );

  const totalPrice = (Number(product?.price) || 0) * quantity;
  const goBack = () => closeModal();

  const TERMS_URL = "https://encriptados.io/pages/terminos-y-condiciones/";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 h-full w-full">
        <p className="mb-4 text-sm text-gray-500">Cargando producto...</p>
        <div className="h-8 w-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={paymentValidationSchema}
      onSubmit={() => closeModal()}
    >
      {({
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        setFieldTouched,
      }) => {
        const emailIsValid = values.email && !errors.email;
        return (
          <div className="space-y-1 w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-600">
                Detalles de compra
              </h2>
              <button
                onClick={goBack}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              {/* Imagen del producto */}
              <div className="flex-1 rounded-xl flex flex-col justify-start">
                <div className="w-full h-48 relative rounded-lg overflow-hidden">
                  <Image
                    src={product?.images[0]?.src ?? "/your-image-placeholder.png"}
                    alt={product?.name ?? "Producto"}
                    fill
                    className="object-cover"
                  />
                  </div>
                  <h3 className="mt-4 font-semibold text-lg text-blue-900 text-center">
                    {product?.name}
                  </h3>
              </div>

              {/* Formulario principal */}
              <div className="flex-1">
                <div className="flex flex-col gap-1">
                  <DividerSection
                    label="Precio unitario"
                    value={`${product?.price ?? "0"} USD`}
                  />

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
                        onClick={() => {
                          setDiscount(
                            coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0
                          );
                        }}
                        className="text-[#10b4e7] text-xs underline"
                      >
                        Aplicar
                      </button>
                    </>
                  </EditableDividerSection>

                  <DividerSection
                    label="Descuento"
                    value={`${discount > 0 ? `- ${discount} USD` : "0 USD"}`}
                  />
                  <DividerSection
                    label="Total a pagar"
                    value={`${totalPrice} USD`}
                  />

                  {/* Componente de pago */}
                  {activePaymentOption === PAYMENTS_METHODS.CREDIT_CARD && (
                    <StripeProvider>
                      <PayWithCreditCard
                        productId={productid!}
                        closeModal={goBack}
                        languageCode={languageCode ?? "es"}
                        email={values.email}
                        product={product!}
                      />
                    </StripeProvider>
                  )}

                 {activePaymentOption === PAYMENTS_METHODS.CRYPTO && product && (
                  <div className="hidden">
                    <PayWithCrypto
                      product={product}
                      closeModal={goBack}
                      languageCode={languageCode ?? "es"}
                      email={values.email}
                    />
                  </div>
                )}
                </div>
              </div>
            </div>
            {activePaymentOption === null && (
              <div className="w-full rounded-xl p-4 mt-1">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Datos de compra
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <FormPaymentInput
                      name="email"
                      placeholder="Ingresa tu Email"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.email}
                      width="100%"
                      className={
                        touched.email && errors.email
                          ? "border border-red-500"
                          : ""
                      }
                    />
                    {touched.email && errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <FormPaymentInput
                    name="telegramId"
                    placeholder="ID telegram (opcional)"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.telegramId || ""}
                    width="100%"
                  />
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    checked={values.termsAccepted}
                    onChange={handleChange}
                    className={`h-4 w-4 border-gray-300 text-primary focus:ring-primary ${
                      touched.termsAccepted && errors.termsAccepted
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <label
    htmlFor="termsAccepted"
    className="text-xs text-gray-800"
  >
    Acepto{" "}
    <Link
      href={TERMS_URL}
      className="underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      términos y condiciones
    </Link>{" "}
    de la compra
  </label>
                </div>
                {touched.termsAccepted && errors.termsAccepted && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.termsAccepted}
                  </p>
                )}
              </div>
            )}
            {activePaymentOption === null && (
              <div className="pt-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  Métodos de pago
                </h3>
                <div className="grid grid-cols-2 gap-4 w-full">
                  {paymentOptions.map((option, idx) => (
                    <PaymentOption
                      key={idx}
                      option={option}
                      activeOption={activePaymentOption}
                      setActiveOption={(value) => {
                      if (!emailIsValid) {
                        setFieldTouched("email", true);
                        setFieldTouched("termsAccepted", true);
                        return;
                      }

                      if (value === PAYMENTS_METHODS.CRYPTO) {
                        const url = process.env.NEXT_PUBLIC_API_CRYPTO_MUS || `${window.location.origin}/api/cripto/cryptomus-process`;

                        const payload = {
                          sim_number: "",
                          email: values.email,
                          telegramid: values.telegramId || "",
                          name: product?.name || "",
                          product_type: product?.type_product || "app",
                          esim_select: "No",
                          lang: languageCode ?? "es",
                          type: "5",
                          cripto: "",
                          description: `${product?.name}\n${product?.licensetime || "12 meses de servicio"}`,
                          amount: Number(product?.price || 0) * 100,
                          image: product?.images?.[0]?.src || "",
                          quantity: 1,
                          planinfo: "",
                          variant1: "",
                          variant2: "",
                          variant3: "",
                          address: "",
                          city: "",
                          country: "",
                          postal: "",
                          phone: "",
                          titular: "",
                          postal_code: "",
                        };

                        fetch(url, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(payload),
                        })
                          .then((res) => res.json())
                          .then((json) => {
                            if (json?.status && json?.url) {
                              window.location.href = json.url;
                            } else {
                              throw new Error(json.message || "Error al generar pago cripto");
                            }
                          })
                          .catch((err) => {
                            console.error("❌ Error redirigiendo a Cryptomus", err);
                            alert("Hubo un error al procesar el pago con criptomonedas.");
                            closeModal();
                          });

                        return; 
                      }

                      setPaymentActiveOption(value);
                    }}

                      disabled={!emailIsValid}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }}
    </Formik>
  );
};

export default ModalPaymentView;
