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
    <div className='my-6 flex flex-col gap-3 text-[#101010] md:w-1/4'>
      <div
        className={`h-[290px] bg-${background} flex ${
          imageCenter ? 'items-center' : 'items-baseline'
        } justify-center mb-3 rounded-2xl`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
        />
      </div>
      <b className='text-lg'>{title}</b>
      <p className='text-sm font-light'>{description}</p>
    </div>
  );
};

export default DetailsElement;
