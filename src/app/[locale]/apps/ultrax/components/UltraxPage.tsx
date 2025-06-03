"use client";
import UltraxHero from "./UltraxHero";
import UltraxProduct from "./UltraxProduct";
import UltraxBenefits from "./UltraxBenefits";
import UltraxFeatures from "./UltraxFeatures";
import UltraxSystemFeatures from "./UltraxSystemFeatures";
import UltraxVideo from "./UltraxVideo";
import UltraxSims from "./UltraxSims";
import UltraxFaq from "./UltraxFaq";

const UltraxPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <UltraxHero />
      <UltraxProduct />
      <UltraxBenefits />
      <UltraxFeatures />
      <UltraxSystemFeatures />
      <UltraxVideo />
      <UltraxSims />
      <UltraxFaq />
    </main>
  );
};

export default UltraxPage;