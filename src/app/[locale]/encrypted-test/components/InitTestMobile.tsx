"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { SecurityTestCard } from "./SecurityTestCard";

const InitTestMobile = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-6 py-8 md:py-12 px-4">
      {/* Phone Security Test Card */}
      <SecurityTestCard
        icon="/images/encrypted-test/icons/add_to_home_screen.svg"
        title="Prueba qué tan seguro es tu celular"
        description="Fortalece tu seguridad digital como nunca antes."
        backgroundImage="/images/encrypted-test/images/fondo-prueba-celular-seguro.webp"
        onStartTest={() => router.push("encrypted-test/phone")}
      />

      {/* Password Security Test Card */}
      <SecurityTestCard
        icon="/images/encrypted-test/icons/key_vertical.svg"
        title="Prueba qué tan segura es tu contraseña"
        description="Ingresa una contraseña y descubre su nivel de seguridad"
        backgroundImage="/images/encrypted-test/images/fondo-seguridad-contraseña.webp"
        onStartTest={() => router.push("encrypted-test/password")}
      />
    </div>
  );
};

export default InitTestMobile;
