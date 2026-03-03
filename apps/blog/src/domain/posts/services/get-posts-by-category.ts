import 'server-only';

import { getCategoryBySlug } from '@websites/sanity-blog/api';

import { getSearchIndex } from '@/infra/search';

import { toDomain } from '../mappings';
import type { PostsByCategory } from '../models';

export async function getPostsByCategory(slug: string): Promise<PostsByCategory | null> {
  if (!slug) return null;

  const [category, { documents }] = await Promise.all([getCategoryBySlug(slug), getSearchIndex()]);

  if (!category) return null;

  const posts = documents.filter((document) => document.categorySlug === slug).map(toDomain);

  if (!posts.length) return null;

  return {
    categoryTitle: category.title ?? slug,
    categoryDescription: category.description ?? undefined,
    posts
  };
}
