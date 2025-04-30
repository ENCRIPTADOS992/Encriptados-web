import * as yup from "yup";

const schemaRecharge = (t: any) =>
  yup.object().shape({
    rechargenumbersim: yup.string().matches(/^\d{6,}$/, t("errorInput")), // Asegura que tenga solo dígitos y al menos 6 caracteres
  });

type SchemaRechargeType = ReturnType<typeof schemaRecharge>["__outputType"];

export { schemaRecharge };
export type { SchemaRechargeType };
