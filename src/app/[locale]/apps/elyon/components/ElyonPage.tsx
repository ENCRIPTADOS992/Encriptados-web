"use client";
import ElyonHero from "./ElyonHero";
import ElyonProduct from "./ElyonProduct";
import ElyonFeatures from "./ElyonFeatures";
import ElyonSecurityStandards from "./ElyonSecurityStandards";
import ElyonVideoSection from "./ElyonVideoSection";
import ElyonSimOptions from "./ElyonSimOptions";
import ElyonFAQ from "./ElyonFAQ";
import ElyonDownloadApp from "./ElyonDownloadApp";

const ElyonPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <ElyonHero />
      <ElyonProduct />
      <ElyonFeatures />
      <ElyonSecurityStandards />
      <ElyonVideoSection />
      <ElyonSimOptions />
      <ElyonFAQ />
      <ElyonDownloadApp />
    </main>
  );
};

export default ElyonPage;