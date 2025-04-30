"use client";
import React from "react";
import PaymentServicePage from "./components/PaymentServicePage";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";

const Page = () => {
  return (
    <BasicFormProvider
      defaultValue={{
        currentmonthselected: "3month",
        currentgbselected: "1gb",
      }}
    >
      <div id="buy-section" className="py-16 bg-[#EBF5FA] ">
        <PaymentServicePage />;
      </div>
    </BasicFormProvider>
  );
};

export default Page;
