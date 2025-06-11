'use client';

import { useEffect,useState } from 'react';

interface CustomRadioGroupProps {
  options: { label: string; value: string }[];
  defaultValue?: string;
  value?: string; 
  onChange?: (value: string) => void;
  flexDirection?: 'row' | 'column';
  className?: string;
}

export default function CustomRadioGroup({
  options,
  defaultValue,
  value,
  onChange,
  className,
  flexDirection = 'row'
}: CustomRadioGroupProps) {
  const [selected, setSelected] = useState(defaultValue ?? options[0].value);

   useEffect(() => {
    // sincronizar con value externo si cambia
    if (value !== undefined && value !== selected) {
      setSelected(value);
    }
  }, [value]);

  const handleChange = (newValue: string) => {
    setSelected(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={`flex gap-[18px] ${
        flexDirection === 'column'
          ? 'flex-col items-start'
          : 'flex-row items-center'
      } ${className}`}
    >
      {options.map((option) => (
        <label key={option.value} className='flex items-center cursor-pointer'>
          <input
            type='radio'
            name='customRadio'
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleChange(option.value)}
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
