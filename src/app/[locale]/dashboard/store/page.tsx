import React from "react";
import StorePage from "./components/StorePage";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";

const Page = () => {
  return (
    <>
      <BasicFormProvider defaultValue={{ currentmenu: "mobiledata" }}>
        <StorePage />
      </BasicFormProvider>
    </>
  );
};

export default Page;
