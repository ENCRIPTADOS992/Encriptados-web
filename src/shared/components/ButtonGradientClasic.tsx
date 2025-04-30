import React from "react";

interface ButtonGradientClasicProps {
  title: string;
}

const ButtonGradientClasic: React.FC<ButtonGradientClasicProps> = ({
  title,
}) => {
  return (
    <div className="relative inline-block">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFFF] to-[#0080FF] opacity-75 blur-sm rounded-full" />
      <button className="relative px-6 py-2 bg-[#0E0E0E] rounded-full leading-none border border-transparent bg-clip-padding">
        <span className="bg-gradient-to-r from-[#00FFFF] to-[#0080FF] bg-clip-text text-transparent font-sans text-sm font-medium">
          {title}
        </span>
      </button>
    </div>
  );
};

export default ButtonGradientClasic;
