import React from "react";
import Button from "./Button";
import { useFormContext } from "react-hook-form";
import { useRechargeNumber } from "@/features/recharge/mutations/useRechargeNumber";
import { useToast } from "../context/ToastContext";

const PayButtonRecharge = () => {
  const { handleSubmit } = useFormContext();

  const { success, error } = useToast();

  const { recharge } = useRechargeNumber({
    onError: () => {
      error("No se pudo hacer recarga");
    },
    onSuccess: () => {
      success("Se hizo la recarga exitosamente");
    },
  });
  return (
    <Button
      onClick={handleSubmit((data) => {
        recharge({ number: data?.rechargenumbersim });
      })}
      intent="black"
      rounded="full"
      size="medium"
    >
      Pagar ahora
    </Button>
  );
};

export default PayButtonRecharge;
