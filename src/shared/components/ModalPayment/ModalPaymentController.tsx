// src/shared/components/ModalPayment/ModalPaymentController.tsx
"use client";

import React from "react";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import ModalPayment from "./ModalPayment";

import ModalStack from "./atoms/ModalStack";

import ModalNewUser from "./new/ModalNewUser";
// import ModalRoning from "./new/ModalRoning";
import ModalRecharge from "./new/ModalRecharge";

type Mode = "new_user" | "roning_code" | "recharge";

const ModalPaymentController = () => {
  const { isModalOpen, closeModal, params } = useModalPayment();
  const { theme = "light", mode = "new_user" } = (params || {}) as {
    theme?: "light" | "dark";
    mode?: Mode;
  };

  const renderByMode = () => {
    switch (mode) {
      case "recharge":
        return <ModalRecharge />;
      // case "roning_code": return <ModalRoning />;
      case "new_user":
      default:
        return <ModalNewUser />;
    }
  };

  return (
    <ModalPayment
      visible={isModalOpen}
      onClose={closeModal}
      theme={theme}
      panelClassName="
  bg-[#F7F9FB]
  rounded-none p-3
  w-full h-full max-h-screen
  ipad:w-[560px] ipad:h-auto ipad:max-h-[90vh] ipad:rounded-[16px] ipad:overflow-hidden
  lg:w-[628px]  lg:h-[800px] lg:rounded-[16px] lg:overflow-hidden
"
    >
      {/* 👇 todos los contenidos respetan 472px + gap 16px */}
      <div className="max-h-full overflow-auto">
        <ModalStack>{renderByMode()}</ModalStack>
      </div>
    </ModalPayment>
  );
};

export default ModalPaymentController;
