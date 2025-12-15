import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const paragraphVariants = cva('', {
  variants: {
    variant: {
      'lead': 'text-lg leading-relaxed max-w-2xl font-normal',
      'body': 'text-base leading-relaxed max-w-prose font-normal',
      'caption': 'text-sm leading-normal max-w-lg font-normal',
      'small': 'text-xs leading-tight max-w-md font-normal',
    },
    color: {
      'primary': 'text-text-primary',
      'secondary': 'text-text-secondary',
      'tertiary': 'text-[#787878]',
      'black': 'text-text-black',
    },
    spacing: {
      'tight': 'mb-2',
      'normal': 'mb-4',
      'relaxed': 'mb-6',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'secondary',
    spacing: 'normal',
  },
});

interface ParagraphProps extends VariantProps<typeof paragraphVariants> {
  children: React.ReactNode;
  className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  variant,
  color,
  spacing,
  children,
  className = '',
}) => {
  return (
    <p className={`${paragraphVariants({ variant, color, spacing })} ${className}`}>
      {children}
    </p>
  );
};

export default Paragraph;
