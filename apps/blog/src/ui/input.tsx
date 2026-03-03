import * as React from 'react';

import { cn } from '@/utils/cn';

export function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-9 rounded-md bg-input/50 px-4 py-1',
        'placeholder:text-muted-foreground border text-base transition-[color,box-shadow] outline-none',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}
