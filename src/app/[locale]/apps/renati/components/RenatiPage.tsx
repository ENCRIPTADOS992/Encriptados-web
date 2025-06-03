"use client";
import RenatiHero from "./RenatiHero";
import RenatiProduct from "./RenatiProduct";
import RenatiBenefits from "./RenatiBenefits";
import RenatiFeatures from "./RenatiFeatures";
import RenatiSystemFeatures from "./RenatiSystemFeatures";
import RenatiVideo from "./RenatiVideo";
import RenatiSims from "./RenatiSims";
import RenatiFaq from "./RenatiFaq";

const RenatiPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <RenatiHero />
      <RenatiProduct />
      <RenatiBenefits />
      <RenatiFeatures />
      <RenatiSystemFeatures />
      <RenatiVideo />
      <RenatiSims />
      <RenatiFaq />
    </main>
  );
};

export default RenatiPage;