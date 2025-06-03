"use client";
import SecureMdmHero from "./SecureMdmHero";
import SecureMdmProduct from "./SecureMdmProduct";
import SeccureMdmBenefits from "./SeccureMdmBenefits";
import SecureMdmSetup from "./SecureMdmSetup";
import SecureMdmVideo from "./SecureMdmVideo";
import SecureMdmSims from "./SecureMdmSims";
import SecureMdmFaq from "./SecureMdmFaq";

const SecureMdmPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <SecureMdmHero />
      <SecureMdmProduct />
      <SeccureMdmBenefits />
      <SecureMdmSetup />
      <SecureMdmVideo />
      <SecureMdmSims />
      <SecureMdmFaq />
    </main>
  );
};

export default SecureMdmPage;