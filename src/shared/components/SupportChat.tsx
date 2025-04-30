"use client";

import React, { useState, useEffect } from "react";
import Button from "./Button";
import ChatSupport from "../svgs/ChatSupport";
import Accordion from "./Accordion";
import { useTranslations } from "next-intl";

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Consideramos móvil si el ancho es menor a 1024px
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const SupportGirl = "/images/dashboard/supportgirl.png";

  const t = useTranslations("DashboardPage");

  return (
    <div
      className={`relative ${isMobile ? "fixed bottom-4 right-4 z-50" : ""}`}
    >
      <Button
        iconPosition="left"
        icon={
          <div className="hidden lg:block">
            <ChatSupport />
          </div>
        }
        customStyles="
          w-full md:w-auto flex items-center justify-center gap-2 px-4 py-3 h-14 
          text-[#35CDFB] md:text-white border border-[#35CDFB] md:border-none 
          rounded-md bg-[#00222D] md:bg-transparent 
          hover:bg-opacity-10 md:hover:bg-gray-800
        "
        intent="cyan"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {t("menuDashboard.header.supportChat")}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={toggleDropdown}
          aria-hidden="true"
        />
      )}

      <div
        className={`${
          isMobile
            ? "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md"
            : "absolute mt-2 w-72 lg:w-96 xxl:w-96 md:w-96"
        } bg-white rounded-md shadow-lg overflow-hidden z-50 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <img
              src={SupportGirl}
              alt="Soporte"
              className="w-9 h-9 rounded-full object-cover"
            />
            <h3 className="text-base text-gray-900 mb-2 font-bold">
              Habla con nuestro equipo de soporte y ventas
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Inicia una conversación, selecciona el motivo
          </p>

          <Accordion
            showIcon={false}
            items={[
              {
                title: "Seleccionar un motivo",
                content: (
                  <div className="flex flex-col gap-y-2">
                    <h1 className="bg-white border-gray-400 p-2 rounded-lg cursor-pointer">
                      Problemas con la activación de mi SIM
                    </h1>
                    <h1 className="bg-white border-gray-400 p-2 rounded-lg cursor-pointer">
                      Realicé una compra, no llegó mi código
                    </h1>
                    <h1 className="bg-white border-gray-400 p-2 rounded-lg cursor-pointer">
                      Necesito hablar con soporte
                    </h1>
                  </div>
                ),
              },
            ]}
          />

          <div className="mt-4">
            <Button intent="primary" onClick={() => alert("Iniciando chat...")}>
              Iniciar Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
