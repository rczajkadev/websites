'use client';

import Link from 'next/link';

import { cn } from '@/utils/cn';

type SearchResultProps = {
  href: string;
  title: string;
  excerpt?: string;
  onNavigate?: () => void;
  className?: string;
};

export function SearchResult({ href, title, excerpt, onNavigate, className }: SearchResultProps) {
  return (
    <Link
      href={href}
      className={cn('w-full p-2 space-y-1', className)}
      onClick={(event) => {
        event.stopPropagation();
        onNavigate?.();
      }}
    >
      <span className="line-clamp-2 text-sm font-medium">{title}</span>
      {!!excerpt && <span className="line-clamp-2 text-xs text-muted-foreground">{excerpt}</span>}
    </Link>
  );
}
