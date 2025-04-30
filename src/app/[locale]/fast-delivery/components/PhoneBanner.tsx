import Button from "@/shared/components/Button";
import Image from "next/image";
import React from "react";
import Renati from "../../../../../public/images/fastdeliverypage/renati.png";
import CellRenati from "../../../../../public/images/fastdeliverypage/cellrenati.png";

const PhoneBanner = () => {
  return (
    <div className="flex mt-16 mb-16 justify-center">
      <div className="bg-red-black-gradient w-full h-[450px] md:h-[350px] rounded-2xl flex flex-col md:flex-row-reverse md:justify-around items-center overflow-hidden relative p-6">
        <div className="flex flex-col gap-y-3 text-center   md:justify-normal lg:justify-normal">
          <div className="w-full flex justify-center md:justify-normal lg:justify-normal ">
            <Image
              width={55}
              height={55}
              quality={100}
              title="Image"
              src={Renati}
              alt="Image"
            />
          </div>
          <h1 className="text-white font-bold text-3xl">
            Celular Encriptado Renati
          </h1>
          <div className="flex gap-x-2 justify-center md:justify-normal lg:justify-normal">
            <h1 className="text-white text-xl">$650.00</h1>
            <h1 className="text-red-500 text-xl line-through">$750.00</h1>
          </div>
          <div className="w-full flex justify-center md:justify-normal lg:justify-normal ">
            <Button
              rounded="full"
              customStyles="bg-black"
              size="medium"
              intent="solid"
            >
              Comprar Ahora
            </Button>
          </div>
        </div>
        <Image
          width={340}
          quality={100}
          title="Image"
          src={CellRenati}
          alt="Image"
          className="mt-4 md:mt-0 lg:translate-y-[70px]"
        />
      </div>
    </div>
  );
};

export default PhoneBanner;
