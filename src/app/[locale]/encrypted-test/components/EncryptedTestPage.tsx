"use client";
import React, { useState, useEffect } from "react";
import BannerEncryptedTest from "./BannerEncryptedTest";
import ProductosEncriptados from "./ProductosEncriptados";
import InitTestEncrypted from "./InitTestEncrypted";
import InitTestMobile from "./InitTestMobile";

const EncryptedTestPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <BannerEncryptedTest />
      {!isMobile ? <InitTestMobile /> : <InitTestEncrypted />}{" "}
      {/* Mostrar solo en móviles */}
      <ProductosEncriptados />
    </>
  );
};

export default EncryptedTestPage;
