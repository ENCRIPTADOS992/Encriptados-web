import React from "react";
import DataUsagePage from "./components/DataUsagePage";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";

const Page = () => {
  return (
    <BasicFormProvider defaultValue={{ currentmenu: "mobiledata" }}>
      <DataUsagePage />
    </BasicFormProvider>
  );
};

export default Page;
