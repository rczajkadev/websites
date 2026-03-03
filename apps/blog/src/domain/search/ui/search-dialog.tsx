'use client';

import { useSearchDialog, useSearchResults } from '@/domain/search/hooks';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/ui/command';

import { SearchResult } from './internal/search-result';

export function SearchDialog() {
  const { open, setOpen, query, setQuery } = useSearchDialog();
  const { results, isLoading, error } = useSearchResults(query, open);

  console.log(results);

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
              onNavigate={() => setOpen(false)}
            />
          </CommandItem>
        ))}
      </CommandGroup>
    );
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Search posts" showCloseButton={false}>
      <Command>
        <CommandInput value={query} onValueChange={setQuery} placeholder="Search posts..." />
        <CommandList>{renderCommandGroup()}</CommandList>
      </Command>
    </CommandDialog>
  );
}
