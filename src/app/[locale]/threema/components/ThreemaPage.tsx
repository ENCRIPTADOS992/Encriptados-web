"use client";
import ThreemaHero from "./ThreemaHero";
import ThreemaProduct from "./ThreemaProduct";
import ThreemaFeatures from "./ThreemaFeatures";
import ThreemaSecurityStandards from "./ThreemaSecurityStandards";
import ThreemaVideoSection from "./ThreemaVideoSection";
import ThreemaSimOptions from "./ThreemaSimOptions";
import ThreemaFAQ from "./ThreemaFAQ";
import ThreemaDownloadApp from "./ThreemaDownloadApp";

 
const ThreemaPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <ThreemaHero />
      <ThreemaProduct />
      <ThreemaFeatures />
      <ThreemaSecurityStandards />
      <ThreemaVideoSection />
      <ThreemaSimOptions />
      <ThreemaFAQ />
      <ThreemaDownloadApp />
    </main>
  );
};

export default ThreemaPage;
