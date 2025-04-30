import React, { ReactNode } from "react";

interface CenterWrapperProps {
  children: ReactNode;
}

const CenterWrapper: React.FC<CenterWrapperProps> = ({ children }) => {
  return <div className="flex justify-center">{children}</div>;
};

export default CenterWrapper;
