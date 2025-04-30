"use client";
import React from "react";
import ActivityCard from "./components/ActivityCard";

const Page = () => {
  const Product = "/images/dashboard/product-test.png";
  return (
    <>
      <div className=" flex flex-col gap-y-4">
        <h1 className="font-bold text-black">Mis Actividades</h1>
        <p className="text-[#5D5D5D]">Recientes</p>

        <ActivityCard
          productName={"SecureCrypt"}
          licenseDuration={"6 MESES"}
          expirationDate={"22 OCT 2024"}
          id={"CRF899"}
          activationKey={"Spalroqtk"}
          timeRemaining={"23:59 hs"}
          productImageUrl={Product}
        />

        <ActivityCard
          productName={"SecureCrypt"}
          licenseDuration={"6 MESES"}
          expirationDate={"22 OCT 2024"}
          id={"CRF899"}
          activationKey={"Spalroqtk"}
          timeRemaining={"23:59 hs"}
          productImageUrl={Product}
        />
        <ActivityCard
          productName={"SecureCrypt"}
          licenseDuration={"6 MESES"}
          expirationDate={"22 OCT 2024"}
          id={"CRF899"}
          activationKey={"Spalroqtk"}
          timeRemaining={"23:59 hs"}
          productImageUrl={Product}
        />
        <ActivityCard
          productName={"SecureCrypt"}
          licenseDuration={"6 MESES"}
          expirationDate={"22 OCT 2024"}
          id={"CRF899"}
          activationKey={"Spalroqtk"}
          timeRemaining={"23:59 hs"}
          productImageUrl={Product}
        />
        <ActivityCard
          productName={"SecureCrypt"}
          licenseDuration={"6 MESES"}
          expirationDate={"22 OCT 2024"}
          id={"CRF899"}
          activationKey={"Spalroqtk"}
          timeRemaining={"23:59 hs"}
          productImageUrl={Product}
        />
        <ActivityCard
          productName={"SecureCrypt"}
          licenseDuration={"6 MESES"}
          expirationDate={"22 OCT 2024"}
          id={"CRF899"}
          activationKey={"Spalroqtk"}
          timeRemaining={"23:59 hs"}
          productImageUrl={Product}
        />
      </div>
    </>
  );
};

export default Page;
