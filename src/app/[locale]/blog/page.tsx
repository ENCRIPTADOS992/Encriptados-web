import React from "react";
import BlogPage from "./components/BlogPage";
import GlobalFloatingMenu from "@/shared/components/GlobalFloatingMenu";

const Page = () => {
  return (
    <>
      <GlobalFloatingMenu />
      <BlogPage />
    </>
  );
};

export default Page;
