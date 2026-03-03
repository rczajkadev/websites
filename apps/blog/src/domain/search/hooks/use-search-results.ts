'use client';

import { useDebounce } from '@websites/hooks';
import type { PostSearchDocument } from '@websites/search-blog';
import {
  filterPostsByQualifiers,
  loadSearchIndexFromJson,
  parseSearchQuery,
  searchDocuments
} from '@websites/search-blog';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const RESULTS_LIMIT = 8;

type SearchIndexPayload = {
  documents?: PostSearchDocument[];
  index?: unknown;
};

export function useSearchResults(query: string, enabled: boolean) {
  const [documents, setDocuments] = useState<PostSearchDocument[]>([]);
  const [indexJson, setIndexJson] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadedRef = useRef(false);
  const debouncedQuery = useDebounce(query);

  const loadIndex = useCallback(async () => {
    if (loadedRef.current || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/search-index.json');

      if (!response.ok) throw new Error('Failed to fetch search index.');

      const payload = (await response.json()) as SearchIndexPayload;

      setDocuments(payload.documents ?? []);
      setIndexJson(payload.index ?? null);
      loadedRef.current = true;
    } catch {
      setDocuments([]);
      setIndexJson(null);
      setError('Could not load search index.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!enabled) return;
    void loadIndex();
  }, [enabled, loadIndex]);

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

  return {
    results,
    isLoading,
    error
  };
}
