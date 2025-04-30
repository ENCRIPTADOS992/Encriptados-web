import * as yup from "yup";

// Recibe el traductor `t` como argumento
const schemaLogin = (t: (key: any) => any) =>
  yup.object().shape({
    accountNumber: yup
      .string()
      .length(16, t("inputErrors.moreThanSixteenNumbers")) // Traducción de error
      .required(t("inputErrors.required")), // Asume que tienes una clave 'required' en tu archivo de traducción
  });

// Inferimos el tipo basado en el esquema
type SchemaLoginType = ReturnType<typeof schemaLogin>["__outputType"];

export { schemaLogin };
export type { SchemaLoginType };
