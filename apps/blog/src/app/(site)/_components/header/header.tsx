'use client';

import type { PostCategory } from '@/domain/posts/models';
import { SearchDialog } from '@/domain/search/components';
import { useSearchDialog, useSearchIndex } from '@/domain/search/hooks';
import { cn } from '@/utils/cn';

import { DesktopHeader, MobileHeader } from './internal';

type SiteHeaderProps = {
  categories: PostCategory[];
  className?: string;
};

export function Header({ categories, className }: SiteHeaderProps) {
  const { documents, indexJson, isLoading, error, load } = useSearchIndex();
  const { open, setOpen, openDialog, query, setQuery } = useSearchDialog({ onOpen: load });

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
      <SearchDialog
        open={open}
        onOpenChange={setOpen}
        query={query}
        onQueryChange={setQuery}
        documents={documents}
        indexJson={indexJson}
        isLoading={isLoading}
        error={error}
      />
    </header>
  );
}
