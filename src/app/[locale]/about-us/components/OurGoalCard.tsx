import React from "react";
import { cva, VariantProps } from "class-variance-authority";

interface OurGoalCardProps extends VariantProps<typeof cardStyles> {
  title: string;
  description: string;
  icon: JSX.Element;
  bgColor: string;
  borderRadius?: "sm" | "md" | "lg" | "full";
  titleColor?: string;
  descriptionColor?: string;
}

const cardStyles = cva("p-4 text-center", {
  variants: {
    borderRadius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    borderRadius: "md",
  },
});

const OurGoalCard: React.FC<OurGoalCardProps> = ({
  title,
  description,
  icon,
  bgColor,
  borderRadius,
  titleColor = "text-black",
  descriptionColor = "text-gray-700",
}) => {
  return (
    <div className={`${cardStyles({ borderRadius })} ${bgColor}`}>
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h2 className={`text-lg font-bold mb-2 ${titleColor}`}>{title}</h2>
      <p className={`text-sm ${descriptionColor}`}>{description}</p>
    </div>
  );
};

export default OurGoalCard;
