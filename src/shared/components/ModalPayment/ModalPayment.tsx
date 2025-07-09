import React from "react";

type Props = {
  onClose?: () => void;
  visible?: boolean;
  children?: React.ReactNode;
};

const ModalPayment: React.FC<Props> = ({
  onClose = () => { },
  visible = false,
  children,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full h-full flex items-center justify-center px-2 sm:px-4">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalPayment;
