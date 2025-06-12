import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import { defaultProductFilters } from "@/features/products/constants/defaultProductFilters";
import SimMoreInfo from "../components/SimMoreInfo";

export default function SimMoreInfoPage() {
  return (
    <BasicFormProvider defaultValue={defaultProductFilters}>
      <SimMoreInfo />
    </BasicFormProvider>
  );
}
