import 'server-only';

import { getSearchIndex } from '@/infra/search';

import type { SlugParam } from '../models';

export async function getCategorySlugs(): Promise<SlugParam[]> {
  const { documents } = await getSearchIndex();

  const slugs = new Set(
    documents
      .map((document) => document.categorySlug)
      .filter((slug): slug is string => Boolean(slug))
  );

  return Array.from(slugs).map((slug) => ({ slug }));
}
