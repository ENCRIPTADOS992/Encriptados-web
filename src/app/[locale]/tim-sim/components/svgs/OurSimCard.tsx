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
    <div
      className={`${bgColor} ${textColor} ${classCard} p-8 rounded-3xl w-[260px] min-h-[360px]`}
    >
      <div className="flex flex-col justify-between h-full max-w-[228px]">
        <Image src={icon} alt="icon" width={50} height={50} className="mb-10" />
        <h2 className="font-bold text-[26px] leading-[26px]">{title}</h2>
        <p className="text-[12px] mt-4 mb-10 break-words">
          {description}
        </p>
      </div>
    </div>
  );
};

export default OurSimCard;
