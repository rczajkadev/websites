'use client';

import { useDebounce } from '@websites/hooks';
import type { PostSearchDocument } from '@websites/search-blog';
import {
  filterPostsByQualifiers,
  loadSearchIndexFromJson,
  parseSearchQuery,
  searchDocuments
} from '@websites/search-blog';
import { useMemo } from 'react';

const RESULTS_LIMIT = 8;

export function useSearchResults(
  query: string,
  documents: PostSearchDocument[],
  indexJson: unknown | null
) {
  const debouncedQuery = useDebounce(query);

  const loadedIndex = useMemo(() => loadSearchIndexFromJson(indexJson), [indexJson]);

  const results = useMemo(() => {
    if (!documents.length) return [];
    if (!debouncedQuery.trim()) return documents.slice(0, RESULTS_LIMIT);

    const parsedQuery = parseSearchQuery(debouncedQuery);
    const textResults = parsedQuery.text
      ? searchDocuments(loadedIndex, documents, parsedQuery.text)
      : documents;

    return filterPostsByQualifiers(textResults, parsedQuery).slice(0, RESULTS_LIMIT);
  }, [debouncedQuery, documents, loadedIndex]);

  return results;
}
