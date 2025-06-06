// // src/shared/components/ModalPayment/ModalPaymentController.tsx
"use client";

import React from "react";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import ModalPayment from "./ModalPayment";
import ModalPaymentView from "./ModalPaymentView";

const ModalPaymentController = () => {
  const { isModalOpen, closeModal, params } = useModalPayment();
    console.log("isModalOpen:", isModalOpen);

  return (
    <ModalPayment visible={isModalOpen} onClose={closeModal}>
      <ModalPaymentView />
    </ModalPayment>
  );
};

export default ModalPaymentController;
