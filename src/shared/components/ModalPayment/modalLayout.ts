// src/shared/components/ModalPayment/modalLayout.ts
import type { CategoryKind } from "@/shared/utils/getProductCategoryKind";

type ModalMode = "new_user" | "roning_code" | "recharge" | "sim";

type LayoutParams = {
  mode: ModalMode;
  kind: CategoryKind;
};


export const PANEL_MOBILE = `
  bg-[#F7F9FB]
  rounded-none
  p-3
  h-[1160px]
  w-[354px]
  overflow-x-hidden
`;


export const PANEL_SM_MD = `
  sm:rounded-[16px]
  sm:p-6
  sm:w-[628px]
  sm:h-[1088px]
  md:w-[628px]
`;


export const PANEL_LG = `
  ipad:bg-[#FAFAFA]
  ipad:w-[628px]
  ipad:rounded-[21px]
  lg:w-[720px]
  lg:h-[1059px]
  lg:rounded-[21px]
  lg:max-h-[88vh]
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
    overflow-y-auto
    overflow-x-hidden
    overscroll-contain
    pb-4 md:pb-6 lg:pb-8
    no-scrollbar-lg
  `
    .replace(/\s+/g, " ")
    .trim();
}
