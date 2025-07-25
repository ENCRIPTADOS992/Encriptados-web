"use client";
import SecureCryptHero from "./SecureCryptHero";
import SecureCryptProduct from "./SecureCryptProduct";
import SecureCryptBenefits from "./SecureCryptBenefits";
import SecureCryptFeatures from "./SecureCryptFeatures";
import SecureCryptFunctions from "./SecureCryptFunctions";
import SecureCryptVideo from "./SecureCryptVideo";
import SimCardGroup from "../../shared/SimCardGroup";
import SecureCryptFaq from "./SecureCryptFaq";

const SecureCryptPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <SecureCryptHero />
      <SecureCryptProduct />
      <SecureCryptBenefits />
      <SecureCryptFeatures />
      <SecureCryptFunctions/>
      <SecureCryptVideo/>
      <SimCardGroup />
      <SecureCryptFaq/>
    </main>
  );
};

export default SecureCryptPage;