import Image from 'next/image';
import React from 'react';

interface SimpleCardProps {
  imageSrc: string;
  title: string;
  type?: 'primary' | 'secondary';
}

const SimpleCard = ({ imageSrc, title, type = 'primary' }: SimpleCardProps) => {
  const backgroundColor = type === 'primary' ? 'bg-[#032742]' : 'bg-[#127BCA]';
  return (
    <div className='flex flex-col justify-center gap-4 mb-8 w-[48%] md:w-[32%] lg:w-[15%]'>
      <div
        className={`p-9 flex justify-center items-center rounded-3xl ${backgroundColor}`}
      >
        <Image alt={title} src={imageSrc} height={100} width={100} />
      </div>
      <p className='font-semibold'>{title}</p>
    </div>
  );
};

export default SimpleCard;
