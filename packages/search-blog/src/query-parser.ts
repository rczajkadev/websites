import { parseQuery } from '@websites/search-core';

export type ParsedSearchQuery = {
  text: string;
  includeTags: string[];
  excludeTags: string[];
  includeCategories: string[];
  excludeCategories: string[];
};

const searchQueryParserConfig = {
  qualifiers: {
    tag: 'tags',
    cat: 'categories'
  }
} as const;

export const parseSearchQuery = (query: string): ParsedSearchQuery => {
  const { text, include, exclude } = parseQuery(query, searchQueryParserConfig);

  return {
    text,
    includeTags: include.tags,
    excludeTags: exclude.tags,
    includeCategories: include.categories,
    excludeCategories: exclude.categories
  };
};
