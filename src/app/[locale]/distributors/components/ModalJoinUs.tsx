"use client";
import React from "react";
import { useJoinUsModal } from "../context/JoinUsModalContext";
import DistributorForm from "./DistributorsForm";

const ModalJoinUs = () => {
  const { isModalOpen, closeModal } = useJoinUsModal();
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Fondo oscuro semitransparente con desenfoque */}
          <div
            className="fixed inset-0 bg-black opacity-50 backdrop-blur-3xl"
            onClick={closeModal}
          ></div>

          {/* Contenido del modal */}
          <div className="w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-4xl shadow-lg z-10 rounded-xl p-6 overflow-y-auto max-h-[90vh]">
            <DistributorForm />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalJoinUs;
