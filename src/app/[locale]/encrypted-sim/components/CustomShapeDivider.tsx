import React from "react";

const CustomShapeDivider: React.FC = () => {
  return (
    <div className="custom-shape-divider-bottom relative ">
      <svg
        className="relative
         bottom-0 w-full h-[200px] sm:h-[240px] md:h-[300px] transform rotate-180"
        viewBox="0 0 1200 250"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
          className="fill-current text-[#f4f8fa]"
        />
      </svg>
    </div>
  );
};

export default CustomShapeDivider;
