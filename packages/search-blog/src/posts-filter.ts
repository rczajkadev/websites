import type { ParsedSearchQuery } from './query-parser';
import type { PostSearchDocument } from './types';

const toLower = (value: string) => value.toLowerCase();
const toSlug = (value: string) => value.replace(/\s+/g, '-');

export const filterPostsByQualifiers = (
  posts: PostSearchDocument[],
  { includeTags, excludeTags, includeCategories, excludeCategories }: ParsedSearchQuery
) =>
  posts.filter((post) => {
    const categoryName = toLower(post.category);
    const categorySlug = toLower(post.categorySlug || toSlug(categoryName));
    const tags = post.tags.map(toLower);
    const tagSlugs = new Set(tags.map(toSlug));
    const hasTag = (tag: string) => tags.includes(tag) || tagSlugs.has(tag);
    const matchesCategory = (cat: string) => cat === categoryName || cat === categorySlug;

    if (includeCategories.length && !includeCategories.some(matchesCategory)) {
      return false;
    }

    if (excludeCategories.length && excludeCategories.some(matchesCategory)) {
      return false;
    }

    if (includeTags.length && !includeTags.every(hasTag)) {
      return false;
    }

    if (excludeTags.length && excludeTags.some(hasTag)) {
      return false;
    }

    return true;
  });
