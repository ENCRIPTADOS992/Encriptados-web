"use client";

import React from "react";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import LoginPage from "./components/LoginPage";
import { schemaLogin } from "./schema/schemaLogin";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("LoginPage"); 
  const loginSchema = schemaLogin(t); 

  return (
    <BasicFormProvider
      schema={loginSchema}
      values={{
        currentStep: "welcome", 
        currentNumber: "", 
        currentGeneratedNumber: "", 
        generatedCurrentNumberSeparated: "", 
      }}
    >
      <LoginPage />
    </BasicFormProvider>
  );
};

export default Page;
