import type { PostSearchDocument } from '@websites/search-blog';

import type { Post } from './models';

export const toDomain = (document: PostSearchDocument): Post => ({
  id: document.id,
  title: document.title,
  slug: document.slug,
  excerpt: document.excerpt,
  category: document.category,
  categorySlug: document.categorySlug,
  tags: document.tags,
  href: document.href,
  date: document.date,
  coverUrl: document.coverUrl,
  coverAlt: document.coverAlt
});
