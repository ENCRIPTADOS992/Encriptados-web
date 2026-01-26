// src/shared/components/ModalPayment/modalLayout.ts
import type { CategoryKind } from "@/shared/utils/getProductCategoryKind";

type ModalMode = "new_user" | "roning_code" | "recharge" | "sim";

type LayoutParams = {
  mode: ModalMode;
  kind: CategoryKind;
};


export const PANEL_MOBILE = `
  bg-[#F7F9FB]
  rounded-2xl
  p-3
  min-h-0
  w-[354px]
  overflow-x-hidden
`;


export const PANEL_SM_MD = `
  sm:rounded-2xl
  sm:p-6
  sm:w-[628px]
  sm:min-h-0
  md:w-[628px]
`;


export const PANEL_LG = `
  ipad:bg-[#FAFAFA]
  ipad:w-[628px]
  ipad:rounded-2xl
  lg:w-[720px]
  lg:min-h-0
  lg:rounded-2xl
`;

const BASE_PANEL = `
  ${PANEL_MOBILE}
  ${PANEL_SM_MD}
  ${PANEL_LG}
`;

const PANEL_BY_MODE: Record<ModalMode, string> = {
  roning_code: BASE_PANEL,
  recharge: BASE_PANEL,
  sim: BASE_PANEL,
  new_user: BASE_PANEL,
};

function applyKindOverrides(base: string, params: LayoutParams): string {
  const { kind, mode } = params;

  if (kind === "SIM" && mode === "sim") {
    return `
      ${base}
      lg:w-[720px]
    `;
  }

  return base;
}

export function getModalPanelClassName(params: LayoutParams): string {
  const { mode } = params;
  const byMode = PANEL_BY_MODE[mode] ?? BASE_PANEL;
  const withKind = applyKindOverrides(byMode, params);

  return withKind.replace(/\s+/g, " ").trim();
}

export function getModalContentClassName(_params: LayoutParams): string {
  return `
    flex-1
    min-h-0
    w-full
    pb-4 md:pb-6 lg:pb-8
  `
    .replace(/\s+/g, " ")
    .trim();
}
