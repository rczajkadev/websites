'use client';

import type { PostSearchDocument } from '@websites/search-blog';
import { useCallback, useRef, useState } from 'react';

type SearchIndexPayload = {
  documents?: PostSearchDocument[];
  index?: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isSearchIndexPayload = (value: unknown): value is SearchIndexPayload =>
  isRecord(value) && (value.documents === undefined || Array.isArray(value.documents));

export function useSearchIndex() {
  const [documents, setDocuments] = useState<PostSearchDocument[]>([]);
  const [indexJson, setIndexJson] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadedRef = useRef(false);
  const loadPromiseRef = useRef<Promise<void> | null>(null);

  const load = useCallback(async () => {
    if (loadedRef.current) return;
    if (loadPromiseRef.current) return loadPromiseRef.current;

    setIsLoading(true);
    setError(null);

    const loadPromise = (async () => {
      try {
        const response = await fetch('/search-index.json');

        if (!response.ok) throw new Error('Failed to fetch search index.');

        const payload: unknown = await response.json();

        if (!isSearchIndexPayload(payload)) throw new Error('Invalid search index payload.');

        setDocuments(payload.documents ?? []);
        setIndexJson(payload.index ?? null);
        loadedRef.current = true;
      } catch {
        setDocuments([]);
        setIndexJson(null);
        setError('Could not load search index.');
      } finally {
        setIsLoading(false);
        loadPromiseRef.current = null;
      }
    })();

    loadPromiseRef.current = loadPromise;

    return loadPromise;
  }, []);

  return {
    documents,
    indexJson,
    isLoading,
    error,
    load
  };
}
