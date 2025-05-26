import Image from 'next/image';

interface DetailsElementProps {
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
  description: string | JSX.Element;
  imageCenter?: boolean;
  background?: string;
  className?: string;
}

const DetailsElement = ({
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  title,
  description,
  imageCenter = false,
  background = '[#101010]'
}: DetailsElementProps) => {
  return (
    <div
      className={`my-6 flex flex-col gap-3 text-[#101010] md:w-full md:relative`}
    >
      <div
        className={`h-[217px] bg-${background} flex ${
          imageCenter ? 'items-center' : 'items-baseline'
        } justify-center mb-3 rounded-2xl md:bg-transparent relative md:h-auto md:w-full `}
      >
        <div
          className={`hidden absolute bottom-0 bg-${background} left-0 right-0 w-full h-2/3 md:block`}
        ></div>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className='z-10 md:h-[495px] md:w-auto md:max-h-[495px] md:mb-12'
        />
      </div>
      <b className='text-lg lg:text-[24px] leading-7'>{title}</b>
      <p className='text-sm font-light whitespace-pre-line text-justify lg:text-xl lg:w-[90%]'>
        {description}
      </p>
    </div>
  );
};

export default DetailsElement;
