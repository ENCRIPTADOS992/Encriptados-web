// src/shared/components/ModalPayment/EditableDividerSection.tsx
"use client";

import React, { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

const EditableDividerSection: React.FC<Props> = ({ label, children }) => {
  return (
    <div className="mb-3">
      <p className="mb-1 text-sm text-gray-300">{label}</p>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
};

export default EditableDividerSection;
