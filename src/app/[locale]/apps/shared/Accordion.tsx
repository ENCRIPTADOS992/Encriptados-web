'use client';
import ArrowDown from '@/shared/svgs/ArrowDown';
import ArrowUp from '@/shared/svgs/ArrowUp';
import { useState } from 'react';

interface AccordionProps {
  title: string;
  content?: string;
}

const Accordion = ({ title, content }: AccordionProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className='w-full flex items-center gap-12 bg-[#F9F9F9] border-[1px] border-[#f1f1f1] rounded-[14px] p-[10px] md:text-2xl md:px-7 md:py-8 text-left'
      >
        <p className='w-full'>{title}</p>
        <div onClick={() => setOpen(false)} className='w-6 md:hidden'>
          {open ? (
            <ArrowUp color='#2B4005' width={12} height={10} />
          ) : (
            <ArrowDown color='#2B4005' width={12} height={10} />
          )}
        </div>
        <div className='w-8 hidden md:block'>
          {open ? (
            <ArrowUp color='#2B4005' width={12} height={10} />
          ) : (
            <ArrowDown color='#2B4005' width={12} height={10} />
          )}
        </div>
      </button>
      {open && (
        <div className='px-5 mt-2'>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
