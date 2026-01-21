// src/shared/components/ModalPayment/new/sims/config/simFormConfig.ts
import type { FormType } from "../types/simFormTypes";

export type SimFormConfig = {
  emailFullWidth: boolean;
  showTelegram: boolean;
  showFullName: boolean;
  reqFullName: boolean;
  showAddress: boolean;
  reqAddress: boolean;
  showCountry: boolean;
  reqCountry: boolean;
  showPostal: boolean;
  reqPostal: boolean;
  showPhone: boolean;
  reqPhone: boolean;
  showSimNumber: boolean;
  reqSimNumber: boolean;
};

export function buildSimFormConfig(
  formType: FormType,
  hideSimField: boolean
): SimFormConfig {
  switch (formType) {
    case "tim_physical":
      return {
        emailFullWidth: false,
        showTelegram: true,
        showFullName: true,
        reqFullName: true,
        showAddress: true,
        reqAddress: true,
        showCountry: true,
        reqCountry: true,
        showPostal: true,
        reqPostal: true,
        showPhone: true,
        reqPhone: true,
        showSimNumber: false,
        reqSimNumber: false,
      };

    case "tim_esim":
      return {
        emailFullWidth: true,
        showTelegram: false,
        showFullName: false,
        reqFullName: false,
        showAddress: false,
        reqAddress: false,
        showCountry: false,
        reqCountry: false,
        showPostal: false,
        reqPostal: false,
        showPhone: false,
        reqPhone: false,
        showSimNumber: false,
        reqSimNumber: false,
      };

    case "encrypted_physical":
      return {
        emailFullWidth: false,
        showTelegram: true,
        showFullName: true,
        reqFullName: true,
        showAddress: true,
        reqAddress: true,
        showCountry: true,
        reqCountry: true,
        showPostal: true,
        reqPostal: true,
        showPhone: true,
        reqPhone: true,
        showSimNumber: false,
        reqSimNumber: false,
      };

    case "encrypted_esim":
      return {
        emailFullWidth: true,
        showTelegram: false,
        showFullName: false,
        reqFullName: false,
        showAddress: false,
        reqAddress: false,
        showCountry: false,
        reqCountry: false,
        showPostal: false,
        reqPostal: false,
        showPhone: false,
        reqPhone: false,
        showSimNumber: false,
        reqSimNumber: false,
      };

    case "encrypted_data": {
      const showSimNumber = !hideSimField;
      return {
        emailFullWidth: true,
        showTelegram: false,
        showFullName: false,
        reqFullName: false,
        showAddress: false,
        reqAddress: false,
        showCountry: false,
        reqCountry: false,
        showPostal: false,
        reqPostal: false,
        showPhone: false,
        reqPhone: false,
        showSimNumber,
        reqSimNumber: showSimNumber,
      };
    }

    case "encrypted_minutes":
      return {
        emailFullWidth: true,
        showTelegram: false,
        showFullName: false,
        reqFullName: false,
        showAddress: false,
        reqAddress: false,
        showCountry: false,
        reqCountry: false,
        showPostal: false,
        reqPostal: false,
        showPhone: false,
        reqPhone: false,
        showSimNumber: true,
        reqSimNumber: true,
      };

    case "encrypted_esimData":
      return {
        emailFullWidth: true,
        showTelegram: false,
        showFullName: false,
        reqFullName: false,
        showAddress: false,
        reqAddress: false,
        showCountry: false,
        reqCountry: false,
        showPostal: false,
        reqPostal: false,
        showPhone: false,
        reqPhone: false,
        showSimNumber: false,
        reqSimNumber: false,
      };

    case "tim_data":
    case "tim_minutes":
      return {
        emailFullWidth: true,
        showTelegram: false,
        showFullName: false,
        reqFullName: false,
        showAddress: false,
        reqAddress: false,
        showCountry: false,
        reqCountry: false,
        showPostal: false,
        reqPostal: false,
        showPhone: false,
        reqPhone: false,
        showSimNumber: true,
        reqSimNumber: true,
      };

    case "encrypted_generic":
    default:
      return {
        emailFullWidth: false,
        showTelegram: true,
        showFullName: true,
        reqFullName: true,
        showAddress: true,
        reqAddress: true,
        showCountry: true,
        reqCountry: true,
        showPostal: true,
        reqPostal: true,
        showPhone: true,
        reqPhone: true,
        showSimNumber: false,
        reqSimNumber: false,
      };
  }
}
