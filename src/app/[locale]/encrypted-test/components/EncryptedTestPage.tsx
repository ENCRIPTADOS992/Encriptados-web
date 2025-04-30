"use client";
import React, { useState, useEffect } from "react";
import BannerEncryptedTest from "./BannerEncryptedTest";
import OurProductsDistributors from "../../distributors/components/OurProductsDistributors";
import InitTestEncrypted from "./InitTestEncrypted";
import InitTestMobile from "./InitTestMobile";

const EncryptedTestPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth >= 768); // Establece el límite de 768px para dispositivos móviles
    };

    handleResize(); // Verificar el tamaño al cargar el componente
    window.addEventListener("resize", handleResize); // Escuchar los cambios de tamaño

    return () => {
      window.removeEventListener("resize", handleResize); // Limpiar el evento cuando se desmonte el componente
    };
  }, []);

  return (
    <>
      <BannerEncryptedTest />
      {!isMobile ? <InitTestMobile /> : <InitTestEncrypted />}{" "}
      {/* Mostrar solo en móviles */}
      <OurProductsDistributors />
    </>
  );
};

export default EncryptedTestPage;
