import { SearchIndexEngine } from '@websites/search-core';

import type { PostSearchDocument } from './types';

const searchEngine = new SearchIndexEngine<PostSearchDocument>({
  miniSearchOptions: {
    fields: ['title', 'excerpt', 'category', 'tags']
  },
  searchOptions: {
    prefix: true,
    fuzzy: 0.2
  }
});

export type BlogSearchIndex = ReturnType<typeof searchEngine.createIndex>;

export const buildSearchIndex = (documents: PostSearchDocument[]) =>
  searchEngine.buildIndex(documents);

export const loadSearchIndexFromJson = (indexJson: unknown): BlogSearchIndex => {
  if (!indexJson) {
    return searchEngine.createIndex();
  }

  try {
    return searchEngine.loadFromJson(indexJson);
  } catch {
    return searchEngine.createIndex();
  }
};

export const searchDocuments = (
  index: BlogSearchIndex,
  documents: PostSearchDocument[],
  query: string
) => searchEngine.search(index, documents, query);
