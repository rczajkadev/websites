import 'server-only';

import { getSearchIndex } from '@/infra/search';

import type { SlugParam } from '../models';

export async function getTagSlugs(): Promise<SlugParam[]> {
  const { documents } = await getSearchIndex();

  const slugs = new Set(
    documents.flatMap((document) => document.tags).filter((slug): slug is string => Boolean(slug))
  );

  return Array.from(slugs).map((slug) => ({ slug }));
}
