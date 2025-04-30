import React from 'react';

const CustomShapeDivider: React.FC = () => {
  return (
    <div className="custom-shape-divider-bottom ">
      <svg
        className=" bottom-0 w-full h-[400px] transform rotate-180" 
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V7.23C-180,85.52,68.63,112.77,750,112.7S1200,65.52,1200,7.23V0Z"
          className="fill-current text-[#52D8FF] "
        />
      </svg>
    </div>
  );
};

export default CustomShapeDivider;
