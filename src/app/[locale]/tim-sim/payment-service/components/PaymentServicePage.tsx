"use client";
import { ChevronLeft, Info } from "lucide-react";
import React from "react";
import Image from "next/image";
import WorldSvg from "@/shared/svgs/WorldSvg";
import Button from "@/shared/components/Button";
import ShoppingCart from "@/shared/svgs/ShoppingCart";
import SupportContact from "@/shared/svgs/SupportContact";
import PhySimSvg from "@/shared/svgs/PhySimSvg";
import ListOfGBSMonths from "../../../../../shared/components/ListOfGBSMonths";

import { useRouter } from "next/navigation";
import ThreeCountries from "@/app/[locale]/ira-sim/svgs/ThreeCountries";
import { useFormContext } from "react-hook-form";

const PaymentServicePage = () => {
  const { watch } = useFormContext();

  console.log(watch());
  const AllWorld = "/images/maya-data/payment-service/allworld.png";

  const benefits = [
    "Conexiones anónimas",
    "Cobertura regional",
    "Planes que se ajustan a tus necesidades",
    "Fácil instalación y uso",
    "Tarifas más bajas de roaming",
  ];

  const gigabyteOptions = [
    { label: "1GB", value: "1gb" },
    { label: "10GB", value: "10gb" },
    { label: "15GB", value: "15gb" },
  ];

  const planOptions = [
    { label: "1 Mes", value: "1month" },
    { label: "3 Meses", value: "3month" },
    { label: "6 Meses", value: "6month" },
  ];

  const router = useRouter();

  return (
    <div className="w-full max-w-7xl mx-auto rounded-lg overflow-hidden xl:flex items-center gap-x-2">
      <div className="w-full p-4">
        <div
          onClick={() => {
            router.push("/bne-sim#use-your-sim");
          }}
          className="flex items-center mb-4 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
          <span className="ml-2 text-black font-bold">Atrás</span>
        </div>
        <div className="flex items-center mb-4">
          <div className="bg-[#C7EDFA] p-3 rounded-lg">
            <PhySimSvg color="#35CDFB" />
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-black">
              eSIM con datos móviles
            </h2>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <WorldSvg height={40} width={40} />
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-black">EUROPA</h2>
          </div>
        </div>
        <p className="mb-2 text-sm">Beneficios para ti</p>
        <ul className="text-sm text-black mb-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center font-bold">
              <span className="mr-2">✓</span> {benefit}
            </li>
          ))}
        </ul>
        <div className="mb-4">
          <div className="flex items-center justify-center border rounded-lg p-2 bg-white border-[#183368]">
            <div className="flex justify-center items-center gap-x-2 py-2">
              <ThreeCountries />
              <p className="text-[#183368] font-bold">Lista de países (40)</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm text-black mb-2 font-semibold">
            Elige tus Gigabytes{" "}
            <Info className="inline w-4 h-4 text-[#35CDFB]" />
          </p>
          <div className="flex space-x-2">
            <ListOfGBSMonths
              name="currentgbselected"
              options={gigabyteOptions}
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-black mb-2 font-semibold">
            Elige tu tiempo de plan{" "}
            <Info className="inline w-4 h-4 text-[#35CDFB]" />
          </p>
          <div className="flex">
            <ListOfGBSMonths
              name="currentmonthselected"
              options={planOptions}
            />
          </div>
        </div>
        <div className="text-2xl font-bold mb-4 text-black">$50.000 COP</div>
        <div className="flex items-center justify-between">
          <div className="">
            <Button
              icon={<ShoppingCart color="white" />}
              rounded="full"
              iconPosition="right"
              customStyles="w-[250px]"
              intent="black"
            >
              Comprar ahora
            </Button>
          </div>

          <div className="flex justify-center gap-x-2">
            <h1 className="text-[#00516B] font-bold">Chat soporte</h1>
            <SupportContact color="#00516B" />
          </div>
        </div>
      </div>

      {/* Imagen a la derecha */}
      <div className="w-full flex justify-center items-center ">
        <Image
          width={1000}
          height={1000}
          src={AllWorld}
          objectFit="cover"
          alt="European landmarks"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default PaymentServicePage;
