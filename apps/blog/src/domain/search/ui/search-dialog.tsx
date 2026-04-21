'use client';

import type { PostSearchDocument } from '@websites/search-blog';

import { useSearchResults } from '@/domain/search/hooks';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/ui/command';

import { SearchResult } from './internal/search-result';

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: string;
  onQueryChange: (query: string) => void;
  documents: PostSearchDocument[];
  indexJson: unknown | null;
  isLoading: boolean;
  error: string | null;
};

export function SearchDialog({
  open,
  onOpenChange,
  query,
  onQueryChange,
  documents,
  indexJson,
  isLoading,
  error
}: SearchDialogProps) {
  const results = useSearchResults(query, documents, indexJson);

  const renderCommandGroup = () => {
    if (isLoading)
      return (
        <CommandGroup>
          <CommandItem disabled>Loading...</CommandItem>
        </CommandGroup>
      );

    if (error)
      return (
        <CommandGroup>
          <CommandItem disabled>{error}</CommandItem>
        </CommandGroup>
      );

    if (results.length === 0) return <CommandEmpty>No posts found.</CommandEmpty>;

    return (
      <CommandGroup className="space-y-2">
        {results.map((result) => (
          <CommandItem
            key={result.href}
            value={`${result.title} ${result.excerpt ?? ''} ${result.category} ${result.tags.join(' ')}`}
            className="p-0!"
          >
            <SearchResult
              href={result.href}
              title={result.title}
              excerpt={result.excerpt}
              onNavigate={() => onOpenChange(false)}
            />
          </CommandItem>
        ))}
      </CommandGroup>
    );
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search posts"
      showCloseButton={false}
    >
      <CommandInput value={query} onValueChange={onQueryChange} placeholder="Search posts..." />
      <CommandList>{renderCommandGroup()}</CommandList>
    </CommandDialog>
  );
}
