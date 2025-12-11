import React from "react";

interface ButtonGradientClasicProps {
  title: string;
}

const ButtonGradientClasic: React.FC<ButtonGradientClasicProps> = ({
  title,
}) => {
  return (
    <button
      className="inline-block px-6 py-2 rounded-full leading-none"
      style={{
        background:
          "linear-gradient(#0E0E0E,#0E0E0E) padding-box, linear-gradient(90deg,#00FFB2 0%, #35CDFB 100%) border-box",
        border: "2px solid transparent",
      }}
    >
      <span
        className="font-sans text-sm font-medium"
        style={{
          background: "linear-gradient(90deg,#00FFB2 0%, #35CDFB 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {title}
      </span>
    </button>
  );
};

export default ButtonGradientClasic;
