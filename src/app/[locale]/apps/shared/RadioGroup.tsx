'use client';

import { useState } from 'react';

interface CustomRadioGroupProps {
  options: { label: string; value: string }[];
  className?: string;
}

export default function CustomRadioGroup({
  options,
  className
}: CustomRadioGroupProps) {
  const [selected, setSelected] = useState(options[0].value);

  return (
    <div className={`flex gap-[18px] items-center ${className}`}>
      {options.map((option) => (
        <label key={option.value} className='flex items-center cursor-pointer'>
          <input
            type='radio'
            name='customRadio'
            value={option.value}
            checked={selected === option.value}
            onChange={() => setSelected(option.value)}
            className='sr-only'
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
