import React from "react";
import CheckTest from "../icons/CheckTest"; // Importa el ícono que quieras usar

type CheckFinishTestProps = {
  options: string[]; // Array de opciones que recibirás
};

const CheckFinishTest = ({ options }: CheckFinishTestProps) => {
  return (
    <div>
      {options.map((option, index) => (
        <div
          key={index}
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <CheckTest /> {/* El ícono que quieres usar */}
          <span style={{ marginLeft: 10 }}>{option}</span>{" "}
          {/* El texto correspondiente */}
        </div>
      ))}
    </div>
  );
};

export default CheckFinishTest;
