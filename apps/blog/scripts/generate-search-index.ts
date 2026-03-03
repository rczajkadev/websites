import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildSearchIndex, type PostSearchDocument } from '@websites/search-blog';
import dotenv from 'dotenv';

import { formatDateLong } from '@/utils/dates';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectDir = path.resolve(__dirname, '..');
const publicDir = path.join(projectDir, 'public');
const outputPath = path.join(publicDir, 'search-index.json');

const run = async () => {
  dotenv.config({ path: path.join(projectDir, '.env') });
  dotenv.config({ path: path.join(projectDir, '.env.local'), override: true });

  const { getPosts } = await import('@websites/sanity-blog/api');
  const { urlForImage } = await import('@websites/sanity-blog/image');

  const posts = await getPosts();

  const searchablePosts: PostSearchDocument[] = posts
    .filter((post) => Boolean(post.slug))
    .map((post, index) => ({
      id: post.slug ? `/posts/${post.slug}` : (post._id ?? `post-${index}`),
      title: post.title ?? 'Untitled',
      slug: post.slug ?? '',
      href: post.slug ? `/posts/${post.slug}` : '#',
      category: post.category?.title ?? 'Uncategorized',
      categorySlug: post.category?.slug ?? '',
      excerpt: post.excerpt ?? '',
      tags: post.tags ?? [],
      date: formatDateLong(post.publishedAt),
      coverUrl: post.coverImage
        ? urlForImage(post.coverImage).width(1200).height(675).fit('crop').auto('format').url()
        : undefined,
      coverAlt: post.coverImage?.alt ?? post.title ?? null
    }));

  const { index, documents } = buildSearchIndex(searchablePosts);

  await writeFile(
    outputPath,
    JSON.stringify({ index: index.toJSON(), documents }, null, 2),
    'utf-8'
  );

  console.log(`Generated search index at ${outputPath}`);
};

run().catch((error) => {
  console.error('Failed to generate search index.', error);
  process.exitCode = 1;
});
