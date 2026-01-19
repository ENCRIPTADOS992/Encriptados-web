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

type Props = {
  formType: FormType;
  cfg: SimFormConfig;
  register: UseFormRegister<SimFormValues>;
  errors: FieldErrors<SimFormValues>;
  countryValue: string;
  quantity?: number;
};

export function BuyerFieldsSection({
  formType,
  cfg,
  register,
  errors,
  countryValue,
  quantity = 1,
}: Props) {
  const { emailFullWidth } = cfg;

  const gridForPairs =
    cfg.showAddress
      ? TWO_COL_GRID_ALWAYS_2   
      : TWO_COL_GRID; 


  return (
    <>
      {emailFullWidth ? (
        cfg.showSimNumber ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={getFieldWrapperClassName(!!errors.email)}>
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
                <div className={getFieldWrapperClassName(!!errors.simNumber)}>
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
                      !!(errors as any).simNumbers?.[idx]
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className={getFieldWrapperClassName(!!errors.email)}>
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
          <div className={getFieldWrapperClassName(!!errors.email)}>
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
            <div className={getFieldWrapperClassName(!!errors.simNumber)}>
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
                  !!(errors as any).simNumbers?.[idx]
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
        <div className={getFieldWrapperClassName(!!errors.address)}>
          <input
            {...register("address", { required: cfg.reqAddress })}
            placeholder="Dirección de envío"
            className="w-full bg-transparent outline-none text-[14px]"
          />
        </div>
      )}

      <div className={gridForPairs}>
        {cfg.showFullName && (
          <div className={getFieldWrapperClassName(!!errors.fullName)}>
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
              !!errors.country ||
                (countryValue.length > 0 && countryValue.trim() === "")
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
            <div className={getFieldWrapperClassName(!!errors.postalCode)}>
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
            <div className={getFieldWrapperClassName(!!errors.phone)}>
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
