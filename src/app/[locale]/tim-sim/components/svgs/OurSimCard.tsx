import Image from "next/image";

interface OurSimCardProps {
  bgColor: string;
  textColor: string;
  icon: string;
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
      className={`${bgColor} ${textColor} ${classCard} p-10 rounded-3xl h-[300px]`}
    >
      <div className="space-y-2 h-full flex flex-col justify-between">
        <Image src={icon} alt="icon" width={50} height={50} className="mb-10" />
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="text-sm mb-10">{description}</p>
      </div>
    </div>
  );
};

export default OurSimCard;
