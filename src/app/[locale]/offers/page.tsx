import React from "react";
import OffersBanner from "./components/OffersBanner";
import ListOfOffers from "./components/ListOfOffers";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import CardSection from "./components/CardSection";

const OffersPage = () => {
  return (
    <>
      <BasicFormProvider defaultValue={{ currentoffer: "sims" }}>
        <OffersBanner />
        <div className="w-full bg-gradient-to-b from-[#00372B] via-black to-[#022530] flex justify-center items-center py-10 md:py-16 px-4">
          <div>
            <ListOfOffers />

            <CardSection />
          </div>
        </div>
      </BasicFormProvider>
    </>
  );
};

export default OffersPage;
