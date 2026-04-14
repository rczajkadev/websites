'use client';

import type { PostCategory } from '@/domain/posts/models';
import { useSearchDialog } from '@/domain/search/hooks';
import { SearchDialog } from '@/domain/search/ui';
import { cn } from '@/utils/cn';

import { DesktopHeader, MobileHeader } from './internal';

type SiteHeaderProps = {
  categories: PostCategory[];
  className?: string;
};

export function Header({ categories, className }: SiteHeaderProps) {
  const { open, setOpen, openDialog, query, setQuery } = useSearchDialog();

  return (
    <header
      className={cn(
        'w-full supports-backdrop-filter:bg-background/90 supports-backdrop-filter:backdrop-blur',
        className
      )}
    >
      <div className="block w-full sm:hidden">
        <MobileHeader categories={categories} onOpenSearch={openDialog} />
      </div>
      <div className="hidden w-full sm:block">
        <DesktopHeader categories={categories} onOpenSearch={openDialog} />
      </div>
      <SearchDialog open={open} onOpenChange={setOpen} query={query} onQueryChange={setQuery} />
    </header>
  );
}
