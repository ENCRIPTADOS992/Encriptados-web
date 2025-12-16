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
    <article className={`${bgColor} p-8 md:p-10 rounded-[2rem] shadow-md`}>
      <div aria-hidden="true">{icon}</div>
      <div className="flex items-center space-x-4">
        <h3
          className={`text-[22px] font-medium leading-[1.5] mt-5 ${textColor}`}
        >
          {title}
        </h3>
      </div>
    </article>
  );
};

export default WhyCallCard;
