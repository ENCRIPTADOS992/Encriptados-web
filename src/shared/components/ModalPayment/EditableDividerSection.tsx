"use client";

import React, { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

const EditableDividerSection: React.FC<Props> = ({ label, children }) => {
  return (
    <div className="flex items-center justify-between py-1.5 mt-0 border-b border-gray-200">
      <label className="text-xs text-black-700 w-1/3">{label}</label>
      <div className="w-2/3 flex items-center gap-1 mt-0">{children}</div>
    </div>
  );
};

export default EditableDividerSection;
