import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageContent } from '@/app/_components';
import { PortableTextRenderer } from '@/domain/content/ui';
import { getPost } from '@/domain/posts/services/get-post';
import { getPostSlugs } from '@/domain/posts/services/get-post-slugs';
import { PostHeader, PostImage, Tags } from '@/domain/posts/ui';
import { formatDateLong } from '@/utils/dates';

export const dynamicParams = false;

export const generateStaticParams = () => getPostSlugs();

const getCachedPost = cache(getPost);

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCachedPost(slug);

  if (!post) notFound();

  return {
    title: post.title ?? 'Untitled',
    description: post.excerpt?.replace(/\s+/g, ' ').trim()
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getCachedPost(slug);

  if (!post) notFound();

  const {
    headingIds,
    bodyBlocks,
    title,
    excerpt,
    category,
    publishedAt,
    updatedAt,
    readTime,
    tags,
    coverUrl,
    coverAlt,
    coverImageLqip
  } = post;

  const dateLabel = formatDateLong(publishedAt);
  const updatedLabel = formatDateLong(updatedAt);
  const lastUpdatedLabel = updatedLabel && updatedLabel !== dateLabel ? updatedLabel : null;

  return (
    <PageContent contentClassName="space-y-10 sm:space-y-14">
      <header className="space-y-6">
        <PostHeader
          title={title}
          excerpt={excerpt}
          category={category}
          date={dateLabel}
          updated={lastUpdatedLabel}
          readTime={readTime}
        />
        <PostImage
          coverUrl={coverUrl}
          coverAlt={coverAlt}
          coverImageLqip={coverImageLqip}
          preload
          hideIfMissing
        />
        <Tags tags={tags} />
      </header>
      <article className="space-y-6">
        <PortableTextRenderer value={bodyBlocks} headingIds={headingIds} />
      </article>
    </PageContent>
  );
}
