import 'server-only';

import { parseSearchIndex } from '@websites/search-blog';

import { readPublicFile } from '@/infra/files';

export async function getSearchIndex() {
  const raw = await readPublicFile('search-index.json');
  return parseSearchIndex(raw);
}
