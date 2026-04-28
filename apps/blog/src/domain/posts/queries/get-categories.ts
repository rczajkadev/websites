import 'server-only';

import { getSearchIndex } from '@/infra/search';

import type { PostCategory } from '../models';

export async function getCategories(): Promise<PostCategory[]> {
  const { documents } = await getSearchIndex();

  return Array.from(
    documents
      .reduce((acc, document) => {
        const { categorySlug, category } = document;

        if (!categorySlug || !category) return acc;
        if (acc.has(categorySlug)) return acc;

        acc.set(categorySlug, {
          id: categorySlug,
          slug: categorySlug,
          title: category
        });

        return acc;
      }, new Map<string, PostCategory>())
      .values()
  ).sort((a, b) => a.title.localeCompare(b.title));
}
