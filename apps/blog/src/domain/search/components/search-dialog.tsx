'use client';

import type { PostSearchDocument } from '@websites/search-blog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useSearchResults } from '@/domain/search/hooks';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/ui/command';

import { SearchResult } from './_parts/search-result';

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
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState('');
  const results = useSearchResults(query, documents, indexJson);

  const handleOpenChange = (nextOpen: boolean) => {
    setSelectedValue('');
    onOpenChange(nextOpen);
  };

  const handleQueryChange = (nextQuery: string) => {
    setSelectedValue('');
    onQueryChange(nextQuery);
  };

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
      <CommandGroup className="space-y-2 p-2">
        {results.map((result) => (
          <CommandItem
            key={result.href}
            value={result.href}
            tabIndex={0}
            className="cursor-pointer items-start gap-0 rounded-md p-0! focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            onFocus={() => setSelectedValue(result.href)}
            onSelect={(href) => {
              handleOpenChange(false);
              router.push(href);
            }}
          >
            <SearchResult title={result.title} excerpt={result.excerpt} />
          </CommandItem>
        ))}
      </CommandGroup>
    );
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Search posts"
      showCloseButton={false}
      commandProps={{
        shouldFilter: false,
        value: selectedValue,
        onValueChange: setSelectedValue
      }}
    >
      <CommandInput value={query} onValueChange={handleQueryChange} placeholder="Search posts..." />
      <CommandList>{renderCommandGroup()}</CommandList>
    </CommandDialog>
  );
}
