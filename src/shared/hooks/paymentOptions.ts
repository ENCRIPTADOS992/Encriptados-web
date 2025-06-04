import CardMethodIcon from "@/shared/components/ModalPayment/icons/CardMethodIcon";
import ATMIcon from "@/shared/components/ModalPayment/icons/ATMIcon";
import BancolombiaMethodIcon from "@/shared/components/ModalPayment/icons/BancolombiaMethodIcon";
import CryptoIcon from "@/shared/components/ModalPayment/icons/CryptoIcon";

import { FC, SVGProps } from "react";

export const PAYMENTS_METHODS = {
  CREDIT_CARD: "pay_credit_card",
  ATM: "pay_atm",
  BANCOLOMBIA_PAY: "pay_bancolombia",
  CRYPTO: "pay_crypto",
};

export interface PaymentOptionItem {
  /** 
   * Clave de traducción, p. ej. "modalPayment.methods.creditCard" 
   * para pasar al hook de i18n en el label.
   */
  label: string;

  /**
   * Un componente de ícono SVG; recibirá props tipo SVGProps<SVGSVGElement>.
   */
  icon: FC<SVGProps<SVGSVGElement>>;

  /**
   * El valor debe coincidir con una de las llaves de PAYMENTS_METHODS.
   */
  value: string;
}

export const paymentOptions: PaymentOptionItem[] = [
  {
    label: "modalPayment.methods.creditCard",
    icon: CardMethodIcon,
    value: PAYMENTS_METHODS.CREDIT_CARD,
  },
  {
    label: "modalPayment.methods.atm",
    icon: ATMIcon,
    value: PAYMENTS_METHODS.ATM,
  },
  {
    label: "modalPayment.methods.bancolombia",
    icon: BancolombiaMethodIcon,
    value: PAYMENTS_METHODS.BANCOLOMBIA_PAY,
  },
  {
    label: "modalPayment.methods.crypto",
    icon: CryptoIcon,
    value: PAYMENTS_METHODS.CRYPTO,
  },
];