import React from "react";
import ConfigAccountPage from "./components/ConfigAccountPage";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";

const page = () => {
  return (
    <BasicFormProvider>
      <ConfigAccountPage />;
    </BasicFormProvider>
  );
};

export default page;
