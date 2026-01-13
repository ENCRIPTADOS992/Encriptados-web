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
    <article className={`${bgColor} px-6 py-8 sm:px-8 sm:py-10 rounded-[2rem] shadow-md h-[280px] flex flex-col`}>
      <div aria-hidden="true" className="flex-shrink-0">{icon}</div>
      <div className="flex-1 flex items-center">
        <h3
          className={`text-[20px] sm:text-[22px] font-medium leading-[1.4] ${textColor}`}
        >
          {title}
        </h3>
      </div>
    </article>
  );
};

export default WhyCallCard;
