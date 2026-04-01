"use client";
import React from "react";
import BannerDistributors from "./BannerDistributors";
import BeDistributor from "./BeDistributor";
import EncryptedCommunication from "./EncryptedCommunication";
import BeDistributorEncrypted from "./BeDistributorEncrypted";
import ProductosEncriptados from "../../encrypted-test/components/ProductosEncriptados";
import JoinUsBanner from "./JoinUsBanner";
import ModalJoinUs from "./ModalJoinUs";
import { JoinUsModalProvider } from "../context/JoinUsModalContext";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import BeDistributorEncryptedMobile from "./BeDistributorEncryptedMobile";

const DistributorsPage = () => {
  return (
    <>
      <BasicFormProvider>
        <JoinUsModalProvider>
          <ModalJoinUs />
          <BannerDistributors />
          <BeDistributor />
          <EncryptedCommunication />
          <div className="block sm:hidden">
            <BeDistributorEncryptedMobile />
          </div>
          <div className="hidden md:block">
            <BeDistributorEncrypted />
          </div>
          <ProductosEncriptados />
          <JoinUsBanner />
        </JoinUsModalProvider>
      </BasicFormProvider>
    </>
  );
};

export default DistributorsPage;
