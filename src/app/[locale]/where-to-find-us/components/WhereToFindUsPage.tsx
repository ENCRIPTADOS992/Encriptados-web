"use client";
import React from "react";
import WhereToFindUsBanner from "./WhereToFindUsBanner";
import DownloadAppBanner from "../../our-products/components/DownloadAppBanner";
import WhereListOfCards from "./WhereListOfCards";
import FormWhereToFind from "./FormWhereToFind";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import HowToBuy from "./HowToBuy";

const WhereToFindUsPage = () => {
  return (
    <>
      <WhereToFindUsBanner />

      <WhereListOfCards />

      <BasicFormProvider values={{ country: "Colombia" }}>
        <FormWhereToFind />
      </BasicFormProvider>

      <HowToBuy />

      <DownloadAppBanner />
    </>
  );
};

export default WhereToFindUsPage;
