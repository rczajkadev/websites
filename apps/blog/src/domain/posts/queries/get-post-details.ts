import 'server-only';

import { getPostBySlug } from '@websites/sanity-blog/api';
import {
  buildHeadingData,
  estimateReadTime,
  type PortableTextValue
} from '@websites/sanity-blog/content';
import { urlForImage } from '@websites/sanity-blog/image';

import type { PostDetails } from '../models';

export async function getPostDetails(slug: string): Promise<PostDetails | null> {
  if (!slug) return null;

  const post = await getPostBySlug(slug);

  if (!post) return null;

  const { coverImage, body, ...rest } = post;

  const bodyBlocks = (body ?? []) as PortableTextValue;
  const { toc, headingIds } = buildHeadingData(bodyBlocks);
  const readTime = estimateReadTime(bodyBlocks);

  const coverUrl = coverImage
    ? urlForImage(coverImage).width(2048).height(1152).fit('max').url()
    : undefined;

  return {
    ...rest,
    coverUrl,
    coverAlt: coverImage?.alt,
    readTime,
    bodyBlocks,
    headingIds,
    toc
  };
}
