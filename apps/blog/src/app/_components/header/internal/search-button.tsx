'use client';

import { Search } from 'lucide-react';

import { Button } from '@/ui/button';
import { cn } from '@/utils/cn';

type SearchButtonProps = {
  className?: string;
  onClick: () => void;
};

export function SearchButton({ className, onClick }: SearchButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Search"
      className={cn('cursor-pointer', className)}
      onClick={onClick}
    >
      <Search className="size-4" />
    </Button>
  );
}
