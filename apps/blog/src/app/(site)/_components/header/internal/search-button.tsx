'use client';

import { Search } from 'lucide-react';

import { cn } from '@/utils/cn';

import { HeaderIconButton } from './header-button';

type SearchButtonProps = {
  className?: string;
  onClick: () => void;
};

export function SearchButton({ className, onClick }: SearchButtonProps) {
  return (
    <HeaderIconButton aria-label="Search" className={cn(className)} onClick={onClick}>
      <Search className="size-5" />
    </HeaderIconButton>
  );
}
