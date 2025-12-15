import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const typographyVariants = cva('', {
  variants: {
    variant: {
      'promo': 'text-promo',
      'h1': 'text-h1',
      'h2': 'text-h2',
      'h3': 'text-h3',
      'h4': 'text-h4',
      'h5': 'text-h5',
      'body-lg': 'text-lg leading-relaxed font-normal',
      'body': 'text-base leading-relaxed font-normal',
    },
    color: {
      'primary': 'text-primary',
      'secondary': 'text-secondary',
      'text-primary': 'text-text-primary',
      'text-secondary': 'text-text-secondary',
      'black': 'text-text-black',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'text-primary',
  },
});

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  color,
  children,
  as: Component = 'p',
  className = '',
}) => {
  return (
    <Component className={`${typographyVariants({ variant, color })} ${className}`}>
      {children}
    </Component>
  );
};

export default Typography;
