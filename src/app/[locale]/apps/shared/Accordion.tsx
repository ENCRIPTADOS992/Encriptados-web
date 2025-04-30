import ArrowDown from '@/shared/svgs/ArrowDown';

interface AccordionProps {
  title: string;
}

const Accordion = ({ title }: AccordionProps) => {
  return (
    <div className='flex items-center gap-12 bg-[#F9F9F9] border-[1px] border-[#f9f9f9] rounded-[14px] p-[10px] md:text-2xl md:px-7 md:py-8'>
      <p className='w-full'>{title}</p>
      <div className='w-6 md:hidden'>
        <ArrowDown color='#2B4005' width={12} height={10} />
      </div>
      <div className='w-8 hidden md:block'>
        <ArrowDown color='#2B4005' width={16} height={12} />
      </div>
    </div>
  );
};

export default Accordion;
