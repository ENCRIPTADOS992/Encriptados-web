"use client";
import React from "react";
import BannerDeliveries from "./BannerDeliveries";
import DeliveriesMap from "./DeliveriesMap";
import HowItWorksDeliveries from "./HowItWorksDeliveries";
import FeaturedProductsDeliveries from "./FeaturedProductsDeliveries";
import ModalJoinUsDeliveries from "./ModalJoinUsDeliveries";
import FAQDeliveries from "./FAQDeliveries";
import { JoinUsModalProvider } from "../context/JoinUsModalContext";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import LogoCarousel from "./LogoCarousel";
import RenatiEncryptedCellphone from "./RenatiEncryptedCellphone";
import DownloadAppBanner from "./DownloadAppBanner";

const DeliveriesPage = () => {
  return (
    <>
      <BasicFormProvider>
        <JoinUsModalProvider>
          <ModalJoinUsDeliveries />
          <BannerDeliveries />
          <DeliveriesMap />
          <HowItWorksDeliveries />
          <RenatiEncryptedCellphone />
          <FeaturedProductsDeliveries />
          <LogoCarousel />
          <DownloadAppBanner/>
          <FAQDeliveries />
        </JoinUsModalProvider>
      </BasicFormProvider>
    </>
  );
};

export default DeliveriesPage;
