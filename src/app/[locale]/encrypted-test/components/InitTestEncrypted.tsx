"use client";
import React from "react";

import SpiralLock from "../icons/SpiralLock";
import PhoneSecureEncrypted from "../icons/PhoneSecureEncrypted";
import KeySecureEncrypted from "../icons/KeySecureEncrypted";
import { useRouter } from "next/navigation";

const InitTestEncrypted = () => {
  const router = useRouter();
  return (
    <>
      <div className="bg-black pt-14  pb-14">
        <div className="lg:flex justify-between">
          <PhoneSecureEncrypted />

          <SpiralLock
            onTestInit={() => {
              router.push("encrypted-test/phone");
            }}
          />
        </div>

        <div className="lg:flex  justify-between">
          <KeySecureEncrypted />

          <SpiralLock
            onTestInit={() => {
              router.push("encrypted-test/password");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default InitTestEncrypted;
