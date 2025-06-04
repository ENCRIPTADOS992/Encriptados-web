// src/shared/components/ModalPayment/DividerSection.tsx
"use client";

import React from "react";

interface Props {
  label: string;
  value: string;
}

const DividerSection: React.FC<Props> = ({ label, value }) => {
  return (
    <div className="flex justify-between border-b border-gray-700 py-2">
      <p className="text-sm text-gray-300">{label}</p>
      <p className="text-sm text-white">{value}</p>
    </div>
  );
};

export default DividerSection;
