'use client';

import { cn } from '@/utils/cn';

type SearchResultProps = {
  title: string;
  excerpt?: string;
  className?: string;
};

export function SearchResult({ title, excerpt, className }: SearchResultProps) {
  return (
    <div className={cn('w-full p-2', className)}>
      <span className="line-clamp-2 text-sm font-medium">{title}</span>
      {!!excerpt && <span className="line-clamp-2 text-xs text-muted-foreground">{excerpt}</span>}
    </div>
  );
}
