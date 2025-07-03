"use client";
import CryptcomHero from "./CryptcomHero";
import CryptcomProduct from "./CryptcomProduct";
import CryptcomBenefits from "./CryptcomBenefits";
import CryptcomFeatures from "./CryptcomFeatures";
import CryptcomSystemFeatures from "./CryptcomSystemFeatures";
import CryptcomVideo from "./CryptcomVideo";
import CryptcomSims from "./CryptcomSims";
import CryptcomFaq from "./CryptcomFaq";

const CryptcomPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <CryptcomHero />
      <CryptcomProduct />
      <CryptcomBenefits />
      <CryptcomFeatures />
      <CryptcomSystemFeatures />
      <CryptcomVideo />
      <CryptcomSims />
      <CryptcomFaq />
    </main>
  );
};

export default CryptcomPage;