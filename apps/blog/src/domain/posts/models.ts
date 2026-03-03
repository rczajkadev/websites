import type { PortableTextValue, TocItem } from '@websites/sanity-blog/content';

export type SlugParam = {
  slug: string;
};

export type PostCategory = {
  id: string;
  slug: string;
  title: string;
};

export type PostDetails = {
  title?: string | null;
  excerpt?: string | null;
  coverUrl?: string;
  coverAlt?: string | null;
  coverImageLqip?: string | null;
  category?: {
    slug?: string | null;
    title?: string | null;
  } | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  readTime: number;
  tags?: string[] | null;
  bodyBlocks: PortableTextValue;
  headingIds: Record<string, string>;
  toc: TocItem[];
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  tags: string[];
  href: string;
  date: string;
  coverUrl?: string;
  coverAlt?: string | null;
};

export type PostsByCategory = {
  categoryTitle: string;
  categoryDescription?: string;
  posts: Post[];
};

export type PostsByTag = {
  tag: string;
  posts: Post[];
};
