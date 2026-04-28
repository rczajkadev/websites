import 'server-only';

import { getCategoryBySlug } from '@websites/sanity-blog/api';

import { getPosts } from './get-posts';

type CategoryPageData = {
  title: string;
  description?: string;
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export async function getCategoryPageData(slug: string): Promise<CategoryPageData | null> {
  const [category, posts] = await Promise.all([
    getCategoryBySlug(slug),
    getPosts({ type: 'category', slug })
  ]);

  if (!category || !posts.length) return null;

  return {
    title: category.title ?? slug,
    description: category.description ?? undefined,
    posts
  };
}
