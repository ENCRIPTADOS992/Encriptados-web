// src/shared/components/ModalPayment/ModalPaymentController.tsx
"use client";

import React from "react";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import ModalPayment from "./ModalPayment";

import ModalStack from "./atoms/ModalStack";

import ModalNewUser from "./new/ModalNewUser";
import ModalRoning from "./new/ModalRoning";
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
      case "roning_code":
        return <ModalRoning />;
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
        md:rounded-[16px] md:h-auto md:max-h-[90vh] md:p-6
        md:w-[560px]
        lg:w-[696px] lg:rounded-[16px]
        overflow-x-hidden           /* ← solo ocultamos scroll horizontal */
      "
    >
      {/* Contenido scrolleable solo en Y (vertical) */}
      <div
        className="max-h-full overflow-y-auto overflow-x-hidden pb-4 md:pb-6 lg:pb-8"
        style={{ scrollbarGutter: "stable" }} // opcional: evita saltos por aparición de scroll
      >
        <ModalStack className="ipad:w-full lg:w-full md:mx-0">
          {renderByMode()}
        </ModalStack>
      </div>
    </ModalPayment>
  );
};

export default ModalPaymentController;
