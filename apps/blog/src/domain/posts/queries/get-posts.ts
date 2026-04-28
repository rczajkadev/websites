import 'server-only';

import { getSearchIndex } from '@/infra/search';

import { toDomain } from '../mappings';
import type { Post } from '../models';

type PostsFilter = {
  type: 'category' | 'tag';
  slug: string;
};

function filterDocuments(
  documents: Awaited<ReturnType<typeof getSearchIndex>>['documents'],
  filter?: PostsFilter
) {
  switch (filter?.type) {
    case 'category':
      return documents.filter((document) => document.categorySlug === filter.slug);
    case 'tag':
      return documents.filter((document) => document.tags.includes(filter.slug));
    default:
      return documents;
  }
}

export async function getPosts(filter?: PostsFilter): Promise<Post[]> {
  const { documents } = await getSearchIndex();
  return filterDocuments(documents, filter).map(toDomain);
}
