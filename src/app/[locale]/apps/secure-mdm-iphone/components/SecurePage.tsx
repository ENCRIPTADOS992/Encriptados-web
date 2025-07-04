"use client";
import SecureHero from "./SecureHero";
import SecureProduct from "./SecureProduct";
import SecureBenefits from "./SecureBenefits";
import SecureFeatures from "./SecureFeatures";
import SecureVideo from "./SecureVideo";
import SecureSims from "./SecureSims";
import SecureFaq from "./SecureFaq";

const SecurePage = () => {
  return (
    <main className="bg-white min-h-screen">
      <SecureHero />
      <SecureProduct />
      <SecureBenefits />
      <SecureFeatures />
      <SecureVideo/>
      <SecureSims/>
      <SecureFaq/>
    </main>
  );
};

export default SecurePage;