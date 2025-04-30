import React from "react";
import Credentials from "./Credentials";
import Email from "./Email";

const ConfigAccountPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 ">
      <div className="bg-white w-full md:w-6/12 flex justify-center rounded-2xl h-[500px] shadow-md">
        <Credentials />
      </div>
      <div className="bg-white w-full md:w-6/12 rounded-2xl h-[500px] shadow-md">
        <Email />
      </div>
    </div>
  );
};

export default ConfigAccountPage;
