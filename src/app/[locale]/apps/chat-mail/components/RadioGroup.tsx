'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

interface CustomRadioGroupProps {
  options: { label: string; value: string }[];
  initialSelected: string;
  className?: string;
}

export default function CustomRadioGroup({
  initialSelected,
  options,
  className
}: CustomRadioGroupProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selected = searchParams.get('plan') || initialSelected;

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('plan', value);

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className={`flex gap-[18px] items-center ${className}`}>
      {options.map((option) => (
        <label key={option.value} className='flex items-center cursor-pointer'>
          <input
            type='radio'
            name='customRadio'
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleChange(option.value)}
            className='sr-only'
            disabled={isPending}
          />
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors
            ${
              selected === option.value
                ? 'border-[5px] border-blue-600 bg-white'
                : 'border-[1px] border-gray-400'
            }
          `}
          >
            {selected !== option.value && (
              <div className='w-2.5 h-2.5 bg-gray-300 rounded-full' />
            )}
          </div>
          <span
            className={`ml-2 text-base font-medium ${
              selected === option.value
                ? 'text-black font-medium'
                : 'text-black'
            }`}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
