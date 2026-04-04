'use client';

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
};

export function SearchDialog({
  open,
  onOpenChange,
  query,
  onQueryChange
}: SearchDialogProps) {
  const { results, isLoading, error } = useSearchResults(query, open);

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
