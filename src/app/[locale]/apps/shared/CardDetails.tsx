import ShieldIcon from '@/shared/svgs/ShieldIcon';
import React from 'react';

interface CardDetailsProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const CardDetails = ({
  title,
  description,
  icon = <ShieldIcon />
}: CardDetailsProps) => {
  return (
    <li
      className={`leading-tight flex bg-[#101010] text-white p-6 rounded-xl gap-3 ${
        description ? 'h-[274px] flex-col' : 'flex-row items-center'
      }`}
    >
      <div className='w-fit flex items-center justify-center p-2 bg-[#323232] rounded-lg'>
        {icon}
      </div>
      <p
        className={`font-semibold ${
          description ? 'text-[18px]' : 'text-[14px]'
        }`}
      >
        {title}
      </p>
      <p className='text-[14px] opacity-60'>{description}</p>
    </li>
  );
};

export default CardDetails;
