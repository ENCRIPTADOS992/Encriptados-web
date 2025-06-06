// // src/shared/components/ModalPayment/ModalPaymentView.tsx
"use client";

import React, { useState } from "react";
import { Formik, FormikProps } from "formik";

import { useModalPayment } from "@/providers/ModalPaymentProvider";
// import IconSvg from "../IconSvg/IconSvg";
import OrderDetails from "./OrderDetails";
import FormPaymentInput from "./FormPaymentInput";
import PaymentOption from "./PaymentOption";
import DividerSection from "./DividerSection";
import EditableDividerSection from "./EditableDividerSection";

import PayWithCreditCard from "./PaymentMethodsView/PayWithCreditCard";
import PayWithAtm from "./PaymentMethodsView/PayWithAtm";
import PayWithBancolombia from "./PaymentMethodsView/PayWithBancolombia";
import PayWithCrypto from "./PaymentMethodsView/PayWithCrypto";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/features/products/services";
import type { Product } from "@/features/products/types/AllProductsResponse";

import { PAYMENTS_METHODS, paymentOptions } from "@/shared/hooks/paymentOptions";

// Validaciones y valores iniciales de Formik
import { paymentValidationSchema } from "@/shared/validations/paymentValidation";
import { initialFormValues } from "@/shared/constants/initialFormValues";

// import { useTranslations } from "next-intl";

export interface FormValuesPayment {
  email: string;
  telegramId?: string;
  termsAccepted: boolean;
}

const ModalPaymentView: React.FC = () => {
  // const t = useTranslations();
  const { closeModal, params } = useModalPayment();
  const { productid } = params as { productid?: string; languageCode?: string };

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["productById", productid],
    // queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });

  const [quantity, setQuantity] = useState(1);
  const totalPrice = (Number(product?.price) || 0) * quantity;
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [activePaymentOption, setPaymentActiveOption] = useState<string | null>(null);

  const goBack = () => {
    closeModal();
  };

  // Decide qué componente de pago mostrar
  let paymentComponent: React.ReactNode = null;
  switch (activePaymentOption) {
    case PAYMENTS_METHODS.CREDIT_CARD:
      paymentComponent = (
        <PayWithCreditCard
          productId={productid!}
          closeModal={goBack}
          languageCode={(params as any).languageCode ?? "es"}
        />
      );
      break;
    case PAYMENTS_METHODS.ATM:
      paymentComponent = <PayWithAtm 
          productId={productid!}
          closeModal={goBack}
          languageCode={(params as any).languageCode ?? "es"}
      />;
      break;
    case PAYMENTS_METHODS.BANCOLOMBIA_PAY:
      paymentComponent = <PayWithBancolombia 
          productId={productid!}
          closeModal={goBack}
          languageCode={(params as any).languageCode ?? "es"}
      />;
      break;
    case PAYMENTS_METHODS.CRYPTO:
      paymentComponent = (
        <PayWithCrypto
          productId={productid!}
          closeModal={goBack}
          languageCode={(params as any).languageCode ?? "es"}
        />
      );
      break;
    default:
      paymentComponent = null;
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="flex flex-col bg-gray-800 text-white rounded-xl">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-6">
            <p className="mb-4 text-lg"></p>
            <div className="h-10 w-10 border-4 border-transparent border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <Formik
            initialValues={initialFormValues}
            validationSchema={paymentValidationSchema}
            onSubmit={(values: FormValuesPayment) => {
              closeModal();
            }}
          >
            {({ handleChange, handleBlur, values, errors, touched, setFieldValue }: FormikProps<FormValuesPayment>) => (
              <div className="w-full p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold"></h2>
                  <button onClick={goBack} className="text-white hover:text-gray-300">
                    {/* <IconSvg type="closeicon" /> */}
                  </button>
                </div>

                {/* Detalles del producto */}
                <OrderDetails
                  image={product?.images[0]?.src ?? ""}  // tomo la primera imagen; si no existe, paso cadena vacía
                  title={product?.name ?? ""}            // uso la propiedad 'name'
                  price={product?.price}
                />


                {/* Separador */}
                <div className="mb-2" />

                {/* Sección de precio unitario / cantidad / cupón, _solo_ si no es ATM ni Bancolombia */}
                {activePaymentOption === PAYMENTS_METHODS.ATM ||
                activePaymentOption === PAYMENTS_METHODS.BANCOLOMBIA_PAY ? null : (
                  <div>
                    <DividerSection label="Descuento" value={`${product?.price} USD`} />

                    <EditableDividerSection label="modalPayment.quantity">
                      <div className="flex items-center">
                        <FormPaymentInput
                          placeholder="Ingresa tu email"
                          handleChange={(e) => {
                            const val = Number(e.target.value);
                            if (!isNaN(val)) setQuantity(val);
                          }}
                          handleBlur={() => {}}
                          value={quantity.toString()}
                          width="80%"
                        />
                      </div>
                    </EditableDividerSection>

                    <EditableDividerSection label="">
                      <div className="flex items-center">
                        <FormPaymentInput
                          placeholder=""
                          handleChange={(e) => setCoupon(e.target.value)}
                          handleBlur={() => {}}
                          value={coupon}
                          width="80%"
                        />
                        <button
                          onClick={() => {
                            if (coupon.trim().toUpperCase() === "DESCUENTO5") setDiscount(5);
                            else setDiscount(0);
                          }}
                          className="ml-2 text-primary underline"
                        >
                          Aplicar
                        </button>
                      </div>
                    </EditableDividerSection>

                    <DividerSection label="Descuento" value={`-${discount} USD`} />
                    <DividerSection label="Total de pago" value={`${totalPrice} USD`} />
                  </div>
                )}

                {/* Si no eligió método de pago */}
                {activePaymentOption === null ? (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <FormPaymentInput
                        placeholder="Ingresa tu email"
                        handleChange={handleChange("email")}
                        handleBlur={handleBlur("email")}
                        value={values.email}
                        width="48%"
                      />
                      <FormPaymentInput
                        placeholder="Ingresa tu usuario de telegram"
                        handleChange={handleChange("telegramId")}
                        handleBlur={handleBlur("telegramId")}
                        value={values.telegramId ?? ""}
                        width="48%"
                      />
                    </div>

                    <div className="flex items-center mb-2">
                      <input
                        id="termsAccepted"
                        type="checkbox"
                        checked={values.termsAccepted}
                        onChange={() => setFieldValue("termsAccepted", !values.termsAccepted)}
                        className="h-4 w-4 rounded border-gray-300 bg-gray-700 text-primary focus:ring-primary"
                      />
                      <label htmlFor="termsAccepted" className="ml-2 select-none">
                        Acepto los términos y condiciones
                      </label>
                    </div>
                    {errors.termsAccepted && touched.termsAccepted && (
                      <p className="text-sm text-red-500">{errors.termsAccepted}</p>
                    )}
                  </div>
                ) : (
                  paymentComponent
                )}

                {/* Opciones de pago: se renderizan solo si activePaymentOption es null */}
                {activePaymentOption === null && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {paymentOptions.map((option, index) => (
                      <PaymentOption
                        key={index}
                        option={option}
                        activeOption={activePaymentOption}
                        setActiveOption={setPaymentActiveOption}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ModalPaymentView;
