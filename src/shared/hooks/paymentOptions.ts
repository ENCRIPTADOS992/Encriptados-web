import CardMethodIcon from "../components/ModalPayment/icons/CardMethodIcon";
import CryptoIcon from "../components/ModalPayment/icons/CryptoIcon";

export const PAYMENTS_METHODS = {
  CREDIT_CARD: "creditCard",
  CRYPTO: "crypto",
};

export const paymentOptions = [
  {
    label: "Paga con tarjeta de crédito",
    icon: CardMethodIcon,
    value: PAYMENTS_METHODS.CREDIT_CARD,
  },
  {
    label: "Pagar con criptomonedas",
    icon: CryptoIcon,
    value: PAYMENTS_METHODS.CRYPTO,
  },
];
