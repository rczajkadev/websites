import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageContent } from '@/app/(site)/_components';
import { PortableTextRenderer } from '@/domain/content/ui';
import { getPostDetails, getPostSlugs } from '@/domain/posts/services';
import { PostCoverImage, PostHeader, Tags } from '@/domain/posts/ui';
import { formatDateLong } from '@/utils/dates';

export const dynamicParams = false;

export const generateStaticParams = () => getPostSlugs();

const getCachedPostDetails = cache(getPostDetails);

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCachedPostDetails(slug);

  if (!post) notFound();

  return {
    title: post.title ?? 'Untitled',
    description: post.excerpt?.replace(/\s+/g, ' ').trim(),
    alternates: {
      canonical: `/posts/${slug}`
    }
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getCachedPostDetails(slug);

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
        <PostCoverImage
          coverUrl={coverUrl}
          coverAlt={coverAlt}
          coverImageLqip={coverImageLqip}
          className="sm:w-[calc(100%+3rem)] sm:-mx-6"
        />
        <Tags tags={tags} />
      </header>
      <article className="space-y-6">
        <PortableTextRenderer value={bodyBlocks} headingIds={headingIds} />
      </article>
    </PageContent>
  );
}
