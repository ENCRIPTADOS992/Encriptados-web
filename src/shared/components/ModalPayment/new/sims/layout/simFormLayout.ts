// src/shared/components/ModalPayment/new/sims/layout/simFormLayout.ts

export const BASE_FIELD_WRAPPER = `
  h-[42px]
  rounded-[8px]
  bg-[#EBEBEB]
  px-[14px]
  flex
  items-center
  border-2
  border-transparent
`;

export function getFieldWrapperClassName(invalid: boolean): string {
  return `
    ${BASE_FIELD_WRAPPER}
    ${invalid ? "border-red-500" : "border-transparent"}
  `
    .replace(/\s+/g, " ")
    .trim();
}

export const TWO_COL_GRID = `
  grid
  grid-cols-1
  sm:grid-cols-2
  gap-1
`
  .replace(/\s+/g, " ")
  .trim();

export const TWO_COL_GRID_ALWAYS_2 = `
  grid
  grid-cols-2
  gap-1
`
  .replace(/\s+/g, " ")
  .trim();

export const PAYMENT_METHOD_GRID = `
  grid
  grid-cols-1
  sm:grid-cols-2
  gap-2
  ipad:gap-3
`
  .replace(/\s+/g, " ")
  .trim();

export const CARD_SPLIT_WRAPPER = `
  w-full
  h-[42px]
  rounded-[8px]
  bg-[#EBEBEB]
  px-[14px]
  flex
  items-center
`
  .replace(/\s+/g, " ")
  .trim();
