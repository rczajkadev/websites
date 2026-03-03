import 'server-only';

import { getSearchIndex } from '@/infra/search';

import { toDomain } from '../mappings';
import type { PostsByTag } from '../models';

export async function getPostsByTag(slug: string): Promise<PostsByTag | null> {
  if (!slug) return null;

  const { documents } = await getSearchIndex();
  const posts = documents.filter((document) => document.tags.includes(slug)).map(toDomain);

  if (!posts.length) return null;

  return { tag: slug, posts };
}
