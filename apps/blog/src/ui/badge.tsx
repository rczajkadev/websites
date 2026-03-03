import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils/cn';

export const badgeVariants = cva(
  'inline-flex h-fit items-center rounded-full border border-transparent font-medium leading-none w-fit whitespace-nowrap transition-[color,background-color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-primary/12 text-primary [a&]:hover:bg-primary/20',
        secondary: 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        outline: 'border-border border [a&]:hover:bg-accent'
      },
      size: {
        sm: 'h-5 px-2 text-xs',
        md: 'h-6 px-2.5 text-xs',
        lg: 'h-7 px-3 text-sm',
        xl: 'h-8 px-3.5 text-sm'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm'
    }
  }
);

export function Badge({
  className,
  variant = 'default',
  size = 'sm',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}
