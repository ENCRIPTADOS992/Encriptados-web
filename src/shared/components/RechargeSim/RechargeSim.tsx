import React from "react";

import { BasicFormProvider } from "../BasicFormProvider";
import RechargeNumberInput from "../RechargeNumberInput";
import PayButton from "../PayButtonRecharge";
import { schemaRecharge } from "./schema/schemaRecharge";
import { useTranslations } from "next-intl";

const RechargeSim = () => {
  const points = [
    "Tu recarga se hará inmediatamente",
    "Pago seguro garantizado",
    "No recopilamos la información de compra",
    "Conexión segura y anónima.",
  ];

  const t = useTranslations("RechargeSim");

  const schema = schemaRecharge(t);

  return (
    <BasicFormProvider schema={schema}>
      <div className="w-full flex justify-center items-center mt-10 px-4">
        <div className="shadow-md bg-white w-full md:w-5/12 rounded-2xl p-6">
          <h1 className="font-bold text-center text-lg md:text-xl mb-4">
            Ingresa tu número de SIM para recargar
          </h1>

          <div className="w-full flex justify-center flex-col items-center">
            <div className="w-9/12 mb-4">
              <RechargeNumberInput name="rechargenumbersim" />
            </div>

            <div className="w-9/12">
              <PayButton />
            </div>

            <ul className="mt-4 list-disc w-9/12 pl-5">
              {points.map((point, index) => (
                <li key={index} className="mb-2">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </BasicFormProvider>
  );
};

export default RechargeSim;
