'use client';

import { Search } from 'lucide-react';

import { dispatchOpenSearchEvent } from '@/domain/search/events';
import { Button } from '@/ui/button';

type SearchButtonProps = {
  className?: string;
};

export function SearchButton({ className }: SearchButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Search"
      className={className}
      onClick={dispatchOpenSearchEvent}
    >
      <Search className="size-4" />
    </Button>
  );
}
