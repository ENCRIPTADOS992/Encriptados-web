import React from "react";
import AboutUsPage from "./components/AboutUsPage";
import GlobalFloatingMenu from "@/shared/components/GlobalFloatingMenu";

const Page = () => {
  return (
    <>
      <GlobalFloatingMenu />
      <AboutUsPage />
    </>
  );
};

export default Page;
