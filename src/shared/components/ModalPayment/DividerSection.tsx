"use client";

import React from "react";

interface Props {
  label: string;
  value: string;
}

const DividerSection: React.FC<Props> = ({ label, value }) => {
  return (
    <div className="flex justify-between border-b border-gray-200 py-1.5">
      <p className="text-xs text-black-500">{label}</p>
      <p className="text-xs font-semibold text-gray-900">{value}</p>
    </div>
  );
};

export default DividerSection;
