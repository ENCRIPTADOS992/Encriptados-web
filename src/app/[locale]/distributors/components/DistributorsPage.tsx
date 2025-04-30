"use client";
import React from "react";
import BannerDistributors from "./BannerDistributors";
import BeDistributor from "./BeDistributor";
import EncryptedCommunication from "./EncryptedCommunication";
import BeDistributorEncrypted from "./BeDistributorEncrypted";
import OurProductsDistributors from "./OurProductsDistributors";
import JoinUsBanner from "./JoinUsBanner";
import ModalJoinUs from "./ModalJoinUs";
import { JoinUsModalProvider } from "../context/JoinUsModalContext";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";

const DistributorsPage = () => {
  return (
    <>
      <BasicFormProvider>
        <JoinUsModalProvider>
          <ModalJoinUs />
          <BannerDistributors />
          <BeDistributor />
          <EncryptedCommunication />
          <BeDistributorEncrypted />
          <OurProductsDistributors />
          <JoinUsBanner />
        </JoinUsModalProvider>
      </BasicFormProvider>
    </>
  );
};

export default DistributorsPage;
