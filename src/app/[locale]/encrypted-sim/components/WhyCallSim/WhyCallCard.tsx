import React from "react";

interface WhyCallCardProps {
  title: string;
  icon: JSX.Element;
  bgColor: string;
  textColor: string;
}

const WhyCallCard: React.FC<WhyCallCardProps> = ({
  title,
  icon,
  bgColor,
  textColor,
}) => {
  return (
    <div className={`${bgColor} p-10 rounded-lg shadow-md`}>
      <div>{icon}</div>
      <div className="flex items-center space-x-4">
        <div
          className={`text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold mt-4 ${textColor}`}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default WhyCallCard;
