'use client';

import { cn } from '@/utils/cn';

import { useHeaderVisibility } from './hooks/use-header-visibility';

type HeaderVisibilityProps = {
  children: React.ReactNode;
  className?: string;
};

export function HeaderVisibility({ children, className }: HeaderVisibilityProps) {
  const isVisible = useHeaderVisibility();

  return (
    <div
      className={cn(
        'sticky top-0 z-40 w-full transition-transform duration-300 ease-out will-change-transform',
        isVisible ? 'translate-y-0' : '-translate-y-full',
        className
      )}
    >
      {children}
    </div>
  );
}
