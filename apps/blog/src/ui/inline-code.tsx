import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

type InlineCodeProps = ComponentPropsWithoutRef<'code'> & {
  size?: 'sm' | 'md';
};

export function InlineCode({ size = 'md', className, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        'rounded-xs bg-muted py-0.5 font-mono text-foreground',
        size === 'sm' ? 'px-1 text-[0.7rem]' : 'px-1.5 text-xs font-medium md:text-sm',
        className
      )}
      {...props}
    />
  );
}
