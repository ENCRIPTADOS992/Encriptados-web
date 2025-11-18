import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  centered?: boolean;
  bgIconCard?: string;        // ahora será fondo del ícono (imagen por defecto)
  bgColorCard?: string;       // fondo de la tarjeta
  titleColor?: string;        // color del título
  descriptionColor?: string;  // color del texto
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  centered = false,
  bgIconCard,
  bgColorCard = "#FFFFFF",
  titleColor = "#010101",
  descriptionColor = "#6E6E6E",
}) => {
  const iconBackground =
    bgIconCard ?? "/images/encrypted-sim/icons/Rectangle%205790.png";

  return (
    <article
      className={`
        flex flex-col gap-4 rounded-2xl shadow-sm
        p-6
        w-full max-w-[275px] min-h-[326px]
        ${centered ? "items-center text-center" : ""}
      `}
      style={{ backgroundColor: bgColorCard }}
    >
      <div
        className="
          w-[44px] h-[44px] rounded-xl
          flex items-center justify-center
          bg-no-repeat bg-center bg-cover
        "
        style={{ backgroundImage: `url('${iconBackground}')` }}
      >
        <div className="w-6 h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
          {icon}
        </div>
      </div>

      <h3
        className={`
          font-bold
          text-[18px] leading-[22px]
          max-w-[235px]
          ${centered ? "mx-auto text-center" : ""}
        `}
        style={{ color: titleColor }}
      >
        {title}
      </h3>

      <p
        className={`
          text-[17px] leading-[21px] font-normal
          max-w-[235px]
          ${centered ? "mx-auto text-center" : ""}
        `}
        style={{ color: descriptionColor }}
      >
        {description}
      </p>
    </article>
  );
};

export default Card;
