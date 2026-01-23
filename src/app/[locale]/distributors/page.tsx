import React from "react";
import DistributorsPage from "./components/DistributorsPage";
import GlobalFloatingMenu from "@/shared/components/GlobalFloatingMenu";

const Page = () => {
  return (
    <>
      <GlobalFloatingMenu />
      <DistributorsPage />
    </>
  );
};

export default Page;
