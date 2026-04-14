'use client';

import { ArrowUp } from 'lucide-react';

import { Button } from '@/ui/button';
import { cn } from '@/utils/cn';

import { useBackToTopVisibility } from './hooks';

export function BackToTopButton() {
  const isVisible = useBackToTopVisibility();

  return (
    <Button
      className={cn(
        'fixed bottom-6 right-6 rounded-full transition-all duration-300',
        isVisible ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      )}
      size="icon"
      variant="outline"
      aria-label="Back to top"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      asChild
    >
      <a href="#top">
        <ArrowUp className="size-5" />
      </a>
    </Button>
  );
}
