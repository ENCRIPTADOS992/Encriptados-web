"use client";
import React from "react";
import BannerDeliveries from "./BannerDeliveries";
import BannerDeliveriesIpad from "./BannerDeliveriesIpad";
import BannerDeliveriesMobile from "./BannerDeliveriesMobile";
import DeliveriesMap from "./DeliveriesMap";
import HowItWorksDeliveries from "./HowItWorksDeliveries";
import HowItWorksDeliveriesTablet from "./HowItWorksDeliveriesTablet";
import HowItWorksDeliveriesMobile from "./HowItWorksDeliveriesMobile";
import FeaturedProductsDeliveries from "./FeaturedProductsDeliveries";
import ModalJoinUsDeliveries from "./ModalJoinUsDeliveries";
import FAQDeliveries from "./FAQDeliveries";
import { JoinUsModalProvider } from "../context/JoinUsModalContext";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import LogoCarousel from "./LogoCarousel";
import RenatiEncryptedCellphone from "./RenatiEncryptedCellphone";
import RenatiEncryptedCellphoneIpad from "./RenatiEncryptedCellphoneIpad";
import RenatiEncryptedCellphoneMobil from "./RenatiEncryptedCellphoneMobil";
import ProductCarouselTablet from "./ProductCarouselTablet";
import ProductCarouselMobile from "./ProductCarouselMobile";
import DownloadAppBanner from "./DownloadAppBanner";

const DeliveriesPage = () => {
  return (
    <>
      <BasicFormProvider>
        <JoinUsModalProvider>
          <ModalJoinUsDeliveries />
          <BannerDeliveries />
          <BannerDeliveriesIpad/>
          <BannerDeliveriesMobile/>
          <DeliveriesMap />
          <HowItWorksDeliveries />
          <HowItWorksDeliveriesTablet />
          <HowItWorksDeliveriesMobile />
          <RenatiEncryptedCellphone />
          <RenatiEncryptedCellphoneIpad/>
          <RenatiEncryptedCellphoneMobil />
          <FeaturedProductsDeliveries />
          <ProductCarouselTablet/>
          <ProductCarouselMobile/>
          <LogoCarousel />
          {/* <DownloadAppBanner/> */}
          <FAQDeliveries />
        </JoinUsModalProvider>
      </BasicFormProvider>
    </>
  );
};

export default DeliveriesPage;
