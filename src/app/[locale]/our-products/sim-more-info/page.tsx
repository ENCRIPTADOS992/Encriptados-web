import type { Metadata } from "next";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import { defaultProductFilters } from "@/features/products/constants/defaultProductFilters";
import SimMoreInfo from "../components/SimMoreInfo";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SimMoreInfoPage() {
  return (
    <BasicFormProvider defaultValue={defaultProductFilters}>
      <SimMoreInfo />
    </BasicFormProvider>
  );
}
