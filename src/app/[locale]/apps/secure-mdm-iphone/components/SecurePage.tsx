"use client";
import SecureHero from "./SecureHero";
import SecureProduct from "./SecureProduct";
import SecureBenefits from "./SecureBenefits";
// import SecureFeatures from "./SecureFeatures";

const SecurePage = () => {
  return (
    <main className="bg-white min-h-screen">
      <SecureHero />
      <SecureProduct />
      <SecureBenefits />
      {/* <SecureFeatures /> */}
    </main>
  );
};

export default SecurePage;