"use client";
import RouterHero from "./RouterHero";
import RouterProduct from "./RouterProduct";
import RouterDescription from "./RouterDescription";
import RouterBenefits from "./RouterBenefits";
import RouterFeatures from "./RouterFeatures";
import RouterSystemFeatures from "./RouterSystemFeatures";
import RouterVideo from "./RouterVideo";
import RouterSims from "./RouterSims";
import RouterFaq from "./RouterFaq";

const RouterPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <RouterHero />
      <RouterProduct />
      <RouterDescription/>
      <RouterBenefits />
      <RouterFeatures />
      <RouterSystemFeatures />
      <RouterVideo />
      <RouterSims />
      <RouterFaq />
    </main>
  );
};

export default RouterPage;