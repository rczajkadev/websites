import { parseSearchIndexPayload } from '@websites/search-core';

import type { PostSearchDocument } from './types';

export const parseSearchIndex = (rawIndex?: string | null) =>
  parseSearchIndexPayload<PostSearchDocument>(rawIndex);
