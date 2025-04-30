"use client";

import React, { ReactNode } from "react";
import Welcome from "./Welcome";
import AccountNumber from "./AccountNumber";
import { useFormContext } from "react-hook-form";

const LoginPage = () => {
  type LoginSteps = {
    welcome: ReactNode;
    accountnumber: ReactNode;
  };

  const { watch } = useFormContext();

  const allSteps: LoginSteps = {
    welcome: <Welcome />,
    accountnumber: <AccountNumber />,
  };

  return (
    <div className="bg-[#0E0E0E] md:bg-cyan-black-gradient flex flex-col md:flex-row items-center justify-center min-h-screen w-full">
      {allSteps[watch("currentStep") as keyof LoginSteps]}
    </div>
  );
};

export default LoginPage;

