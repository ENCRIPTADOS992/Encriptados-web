// src/shared/components/ModalPayment/new/sims/components/SimTypeAlertSection.tsx
"use client";

import React from "react";
import type { FormType } from "../types/simFormTypes";

type Props = {
  formType: FormType;
};

export function SimTypeAlertSection({ formType }: Props) {
  const isEsim = formType === "encrypted_esim";
  const isPhysical = formType === "encrypted_physical";

  if (!isEsim && !isPhysical) return null;

  return (
    <div className="mt-2 flex items-center gap-[6px] rounded-[8px] bg-[#FFF7E4] px-[8px] py-[15px]">
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#C98A00] text-[14px] font-bold text-[#C98A00]">
        !
      </span>
      <span className="text-[14px] leading-[20px] text-[#C98A00]">
        Este producto no contiene un número de teléfono por seguridad.
      </span>
    </div>
  );
}
