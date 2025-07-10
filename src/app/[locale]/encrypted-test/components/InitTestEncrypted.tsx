"use client";
import React from "react";

import PhoneSecureEncrypted from "../icons/PhoneSecureEncrypted";
import KeySecureEncrypted from "../icons/KeySecureEncrypted";
import { useRouter } from "next/navigation";
import SectionWrapper from "@/shared/components/SectionWrapper";

const InitTestEncrypted = () => {
  const router = useRouter();
  return (
    <>
      <div className="bg-black pt-14 pb-14">
        <SectionWrapper>
          <div className="flex flex-col gap-10">
            <PhoneSecureEncrypted
              onTestInit={() => router.push("encrypted-test/phone")}
            />
            <KeySecureEncrypted
              onTestInit={() => router.push("encrypted-test/password")}
            />
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default InitTestEncrypted;
