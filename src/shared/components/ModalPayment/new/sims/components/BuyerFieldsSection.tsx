// src/shared/components/ModalPayment/new/sims/components/BuyerFieldsSection.tsx
"use client";

import React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { SimFormValues, FormType } from "../types/simFormTypes";
import type { SimFormConfig } from "../config/simFormConfig";
import {
  getFieldWrapperClassName,
  TWO_COL_GRID,
  TWO_COL_GRID_ALWAYS_2,
} from "../layout/simFormLayout";

type Validations = {
  emailOk: boolean;
  simOk: boolean;
  fullNameOk: boolean;
  addressOk: boolean;
  countryOk: boolean;
  postalOk: boolean;
  phoneOk: boolean;
};

type Props = {
  formType: FormType;
  cfg: SimFormConfig;
  register: UseFormRegister<SimFormValues>;
  errors: FieldErrors<SimFormValues>;
  countryValue: string;
  quantity?: number;
  showErrors?: boolean;
  validations?: Validations;
};

export function BuyerFieldsSection({
  formType,
  cfg,
  register,
  errors,
  countryValue,
  quantity = 1,
  showErrors = false,
  validations,
}: Props) {
  // Helper para determinar si un campo debe mostrarse con error
  const shouldShowFieldError = (fieldError: boolean, isValid: boolean) => {
    return fieldError || (showErrors && !isValid);
  };
  const { emailFullWidth } = cfg;
  const simNextToEmail = formType === "tim_data" || formType === "tim_minutes";

  const gridForPairs =
    cfg.showAddress
      ? TWO_COL_GRID_ALWAYS_2   
      : TWO_COL_GRID; 


  return (
    <>
      {emailFullWidth ? (
        cfg.showSimNumber ? (
          <>
            {simNextToEmail ? (
              quantity <= 1 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={getFieldWrapperClassName(shouldShowFieldError(!!errors.email, validations?.emailOk ?? true))}>
                    <input
                      {...register("email", { required: true })}
                      placeholder="Ingresa tu Email"
                      type="email"
                      className="w-full bg-transparent outline-none text-[14px] py-2"
                    />
                  </div>
                  <div className={getFieldWrapperClassName(shouldShowFieldError(!!errors.simNumber, validations?.simOk ?? true))}>
                    <input
                      {...register("simNumber", { required: cfg.reqSimNumber })}
                      placeholder="Número de SIM"
                      className="w-full bg-transparent outline-none text-[14px] py-2"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={getFieldWrapperClassName(shouldShowFieldError(!!errors.email, validations?.emailOk ?? true))}>
                    <input
                      {...register("email", { required: true })}
                      placeholder="Ingresa tu Email"
                      type="email"
                      className="w-full bg-transparent outline-none text-[14px] py-2"
                    />
                  </div>
                  {Array.from({ length: quantity }).map((_, idx) => (
                    <div
                      key={idx}
                      className={getFieldWrapperClassName(
                        shouldShowFieldError(!!(errors as any).simNumbers?.[idx], validations?.simOk ?? true)
                      )}
                    >
                      <input
                        {...register(`simNumbers.${idx}` as const, {
                          required: cfg.reqSimNumber,
                        })}
                        placeholder={`Número de SIM ${idx + 1}`}
                        className="w-full bg-transparent outline-none text-[14px] py-2"
                      />
                    </div>
                  ))}
                </div>
              )
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={getFieldWrapperClassName(shouldShowFieldError(!!errors.email, validations?.emailOk ?? true))}>
                    <input
                      {...register("email", { required: true })}
                      placeholder="Ingresa tu Email"
                      type="email"
                      className="w-full bg-transparent outline-none text-[14px] py-2"
                    />
                  </div>
                  <div />
                </div>

                {quantity <= 1 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className={getFieldWrapperClassName(shouldShowFieldError(!!errors.simNumber, validations?.simOk ?? true))}>
                      <input
                        {...register("simNumber", { required: cfg.reqSimNumber })}
                        placeholder="Número de SIM"
                        className="w-full bg-transparent outline-none text-[14px] py-2"
                      />
                    </div>
                    <div />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Array.from({ length: quantity }).map((_, idx) => (
                      <div
                        key={idx}
                        className={getFieldWrapperClassName(
                          shouldShowFieldError(!!(errors as any).simNumbers?.[idx], validations?.simOk ?? true)
                        )}
                      >
                        <input
                          {...register(`simNumbers.${idx}` as const, {
                            required: cfg.reqSimNumber,
                          })}
                          placeholder={`Número de SIM ${idx + 1}`}
                          className="w-full bg-transparent outline-none text-[14px] py-2"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className={getFieldWrapperClassName(shouldShowFieldError(!!errors.email, validations?.emailOk ?? true))}>
              <input
                {...register("email", { required: true })}
                placeholder="Ingresa tu Email"
                type="email"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          </div>
        )
      ) : (
        <div className={gridForPairs}>
          <div className={getFieldWrapperClassName(shouldShowFieldError(!!errors.email, validations?.emailOk ?? true))}>
            <input
              {...register("email", { required: true })}
              placeholder="Ingresa tu Email"
              type="email"
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </div>
          {cfg.showTelegram ? (
            <div className={getFieldWrapperClassName(false)}>
              <input
                {...register("telegram")}
                placeholder="ID Telegram (opcional)"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      )}

      {cfg.showSimNumber && !emailFullWidth && (
        quantity <= 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className={getFieldWrapperClassName(shouldShowFieldError(!!errors.simNumber, validations?.simOk ?? true))}>
              <input
                {...register("simNumber", { required: cfg.reqSimNumber })}
                placeholder="Número de SIM"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: quantity }).map((_, idx) => (
              <div
                key={idx}
                className={getFieldWrapperClassName(
                  shouldShowFieldError(!!(errors as any).simNumbers?.[idx], validations?.simOk ?? true)
                )}
              >
                <input
                  {...register(`simNumbers.${idx}` as const, {
                    required: cfg.reqSimNumber,
                  })}
                  placeholder={`Número de SIM ${idx + 1}`}
                  className="w-full bg-transparent outline-none text-[14px]"
                />
              </div>
            ))}
          </div>
        )
      )}


      {cfg.showAddress && (
        <div className={getFieldWrapperClassName(shouldShowFieldError(!!errors.address, validations?.addressOk ?? true))}>
          <input
            {...register("address", { required: cfg.reqAddress })}
            placeholder="Dirección de envío"
            className="w-full bg-transparent outline-none text-[14px]"
          />
        </div>
      )}

      <div className={gridForPairs}>
        {cfg.showFullName && (
          <div className={getFieldWrapperClassName(shouldShowFieldError(!!errors.fullName, validations?.fullNameOk ?? true))}>
            <input
              {...register("fullName", { required: cfg.reqFullName })}
              placeholder="Nombre completo"
              className="w-full bg-transparent outline-none text-[14px]"
            />
          </div>
        )}

        {cfg.showCountry ? (
          <div
            className={getFieldWrapperClassName(
              shouldShowFieldError(
                !!errors.country || (countryValue.length > 0 && countryValue.trim() === ""),
                validations?.countryOk ?? true
              )
            )}
          >
            <input
              {...register("country", {
                required: cfg.reqCountry,
                maxLength: 64,
              })}
              placeholder="País"
              className="w-full bg-transparent outline-none text-[14px]"
              autoComplete="country-name"
              autoCapitalize="words"
            />
          </div>
        ) : (
          <div />
        )}
      </div>

      {(cfg.showPostal || cfg.showPhone) && (
        <div className={gridForPairs}>
          {cfg.showPostal ? (
            <div className={getFieldWrapperClassName(shouldShowFieldError(!!errors.postalCode, validations?.postalOk ?? true))}>
              <input
                {...register("postalCode", { required: cfg.reqPostal })}
                placeholder="Código postal"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          ) : (
            <div />
          )}
          {cfg.showPhone ? (
            <div className={getFieldWrapperClassName(shouldShowFieldError(!!errors.phone, validations?.phoneOk ?? true))}>
              <input
                {...register("phone", { required: cfg.reqPhone })}
                placeholder="Teléfono"
                className="w-full bg-transparent outline-none text-[14px]"
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
    </>
  );
}
