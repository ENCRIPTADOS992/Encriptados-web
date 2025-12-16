import Image, { StaticImageData } from "next/image";

interface OurSimCardProps {
  bgColor: string;
  textColor: string;
  icon: string | StaticImageData;
  title: string;
  description: string;
  classCard: string;
}

const OurSimCard: React.FC<OurSimCardProps> = ({
  bgColor,
  textColor,
  icon,
  title,
  description,
  classCard,
}) => {
  return (
    <article
      className={`${bgColor} ${textColor} ${classCard} p-8 rounded-3xl w-[260px] min-h-[360px]`}
    >
      <div className="flex flex-col justify-between h-full max-w-[228px]">
        <Image src={icon} alt="" width={50} height={50} className="mb-10" aria-hidden="true" />
        <h3 className="font-bold text-[22px] leading-[1.5]">{title}</h3>
        <p className="text-sm leading-relaxed mt-4 mb-10 break-words">
          {description}
        </p>
      </div>
    </article>
  );
};

export default OurSimCard;
