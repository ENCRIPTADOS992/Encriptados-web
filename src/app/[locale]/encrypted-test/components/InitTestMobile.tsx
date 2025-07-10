"use client";
import React from "react";
import PhoneSecureEncrypted from "../icons/PhoneSecureEncrypted";
import KeySecureEncrypted from "../icons/KeySecureEncrypted";
import { useRouter } from "next/navigation";
import SectionWrapper from "@/shared/components/SectionWrapper";

const InitTestMobile = () => {
  const router = useRouter();

  return (
    <div className="bg-black py-8">
      <SectionWrapper>
        <div className="flex flex-col">
          {/* Card Teléfono */}
          <div
            className="flex flex-row items-center justify-between bg-black rounded-2xl px-4 py-2 "
          >
            <PhoneSecureEncrypted
              onTestInit={() => {
                router.push("encrypted-test/phone");
              }}
            />
          </div>
          {/* Card Contraseña */}
          <div
            className="flex flex-row items-center justify-between bg-black rounded-2xl px-4 py-2"
          >
            <KeySecureEncrypted
              onTestInit={() => {
                router.push("encrypted-test/phone");
              }}
            />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default InitTestMobile;
