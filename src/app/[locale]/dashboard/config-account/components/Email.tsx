"use client";
import Button from "@/shared/components/Button";
import { InputFormContext } from "@/shared/components/InputFormContext";

import React from "react";

const Email = () => {
  return (
    <div className="mb-4 w-full mt-4 p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center ">
          <div className="w-[250px] ">
            <Button size="small" intent="primary">
              Correo Electrónico (Activo)
            </Button>
          </div>
          <p className="text-[#2372E9] cursor-pointer">Desactivar</p>
        </div>

        <p className="text-[#5D5D5D] mb-4 bg-[#FAFAFA] p-4 rounded-2xl text-left mt-4">
          Puedes habilitar la opción de recibir códigos de acceso, sim’s y demás
          datos de tu SIM. Puedes desactivarla y no conservaremos ninguno de tus
          datos.
        </p>

        <div className="flex flex-col w-7/12 mb-auto">
          <p className="text-black text-base">Ingresa tu correo electrónico</p>
          <InputFormContext rounded="lg" light name={"input2"} />
        </div>
      </div>
      <div className="w-[150px] mt-auto mb-4">
        <Button intent="black">Guardar</Button>
      </div>
    </div>
  );
};

export default Email;
