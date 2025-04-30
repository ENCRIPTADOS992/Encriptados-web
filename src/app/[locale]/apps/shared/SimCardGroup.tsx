import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  theme: 'light' | 'dark';
  linkText?: string;
}

const Card = ({
  title,
  description,
  buttonText,
  linkText,
  imageAlt,
  imageSrc,
  imageWidth,
  imageHeight,
  theme
}: CardProps) => (
  <div
    className={`rounded-3xl px-[18px] h-[216px] flex items-center md:w-full md:h-[306px] md:pl-10 ${
      theme === 'dark'
        ? 'text-[#F4F8FA] bg-gradient-to-r from-[#000000] from-40% to-[#004A60]'
        : 'text-[#010C0F] bg-gradient-to-r from-[#35CDFB] to-[#A8EBFF]'
    }`}
  >
    <div className='flex flex-col md:w-[50%]'>
      <b className='md:text-xl'>{title}</b>
      <p className='text-sm font-light my-2'>{description}</p>
      <Button
        type='alternative'
        className='py-[11px] w-2/3 min-w-36 justify-center text-xs font-medium my-3 md:w-fit md:text-base md:my-8 md:py-3'
      >
        <p>{buttonText}</p>
      </Button>
      {linkText && (
        <Link href='#' className='text-xs mx-8 hover:underline md:mx-0'>
          {linkText}
        </Link>
      )}
    </div>
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={imageWidth}
      height={imageHeight}
    />
  </div>
);

interface cardDataType {
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  linkText?: string;
  theme: 'dark' | 'light';
}

const cardData: cardDataType[] = [
  {
    title: 'SIM Card encriptada',
    description:
      'Protégete de los ciberdelincuentes y mantén tu información personal segura',
    buttonText: 'Comprar',
    imageSrc: '/images/apps/silent-circle/encrypted-sim.png',
    imageWidth: 274,
    imageHeight: 240,
    linkText: 'Descubre más',
    theme: 'dark'
  },
  {
    title: 'E-SIM Encriptada Planes datos o minuto',
    description: 'Lorem Ipsum Dolor met',
    buttonText: 'Ver más',
    imageSrc: '/images/apps/silent-circle/encrypted-e-sim.png',
    imageWidth: 252,
    imageHeight: 250,
    theme: 'light'
  }
];

const SimCardGroup = () => {
  return (
    <div className='flex flex-col gap-[15px] mt-3 mx-5 md:flex-row md:gap-4 md:mx-0 lg:mx-24 lg:gap-6'>
      {cardData.map((card, index) => (
        <Card
          title={card.title}
          description={card.description}
          buttonText={card.buttonText}
          imageAlt={card.title}
          imageSrc={card.imageSrc}
          imageWidth={card.imageWidth}
          imageHeight={card.imageHeight}
          key={index}
          linkText={card.linkText}
          theme={card.theme}
        />
      ))}
    </div>
  );
};

export default SimCardGroup;
