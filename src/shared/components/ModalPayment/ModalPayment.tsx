// // src/components/ModalPayment/ModalPayment.tsx
import React from "react";

type Props = {
  onClose?: () => void;
  visible?: boolean;
  children?: React.ReactNode;
};

const ModalPayment: React.FC<Props> = ({
  onClose = () => {},
  visible = false,
  children,
}) => {
    if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative bg-white rounded-2xl p-4 w-full max-w-md">
        <button onClick={onClose} className="absolute top-2 right-2 text-black">X</button>
        {children}
      </div>
    </div>
  );
};

export default ModalPayment;