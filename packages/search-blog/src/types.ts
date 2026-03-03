export type PostSearchDocument = {
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
