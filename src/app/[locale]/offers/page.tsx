import React from "react";
import OffersBanner from "./components/OffersBanner";
import ListOfOffers from "./components/ListOfOffers";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import CardSection from "./components/CardSection";
import GlobalFloatingMenu from "@/shared/components/GlobalFloatingMenu";

const OffersPage = () => {
  return (
    <>
      <GlobalFloatingMenu />
      <BasicFormProvider defaultValue={{ currentoffer: "sims" }}>
        <OffersBanner />
        <div className="w-full bg-black relative overflow-hidden py-12 md:py-16 lg:py-20 px-4">
          <div
            className="absolute pointer-events-none z-0 w-[450px] h-[450px] lg:h-[550px]"
            style={{
              left: "12%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "#01FFC2",
              opacity: 0.5,
              filter: "blur(140px)",
              borderRadius: "50%",
            }}
          />
          <div
            className="absolute pointer-events-none z-0 w-[450px] h-[450px] lg:h-[550px]"
            style={{
              left: "88%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "#10B4E7",
              opacity: 0.6,
              filter: "blur(140px)",
              borderRadius: "50%",
            }}
          />
          <div className="relative z-10">
            <ListOfOffers />
          </div>
        </div>

        <div className="w-full bg-black relative overflow-hidden py-16 md:py-20 lg:py-24">
          <div
            className="absolute pointer-events-none z-0"
            style={{
              width: 380,
              height: 260,
              left: "12%",
              top: "55%",
              transform: "translate(-50%, -50%)",
              background: "#01FFC2",
              opacity: 0.4,
              filter: "blur(140px)",
              borderRadius: "50%",
            }}
          />
          <div
            className="absolute pointer-events-none z-0"
            style={{
              width: 380,
              height: 260,
              left: "88%",
              top: "55%",
              transform: "translate(-50%, -50%)",
              background: "#10B4E7",
              opacity: 0.5,
              filter: "blur(140px)",
              borderRadius: "50%",
            }}
          />
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 relative z-10">
            <CardSection />
          </div>
        </div>
      </BasicFormProvider>
    </>
  );
};

export default OffersPage;
