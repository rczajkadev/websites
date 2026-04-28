import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageLayout } from '@/app/(site)/_shared/layout';
import type { SlugPageProps } from '@/app/(site)/_shared/routing';
import { createPageMetadata } from '@/app/metadata';
import { PortableTextRenderer } from '@/domain/content/portable-text';
import { PostCoverImage, PostHeader, Tags } from '@/domain/posts/components';
import type { PostDetails } from '@/domain/posts/models';
import { getPostDetails, getPostSlugs } from '@/domain/posts/queries';
import { formatDateLong } from '@/utils/dates';

export const dynamicParams = false;

const getCachedPostDetails = cache(getPostDetails);

function getPostDateLabels({
  publishedAt,
  updatedAt
}: Pick<PostDetails, 'publishedAt' | 'updatedAt'>) {
  const publishedLabel = formatDateLong(publishedAt);
  const updatedLabel = formatDateLong(updatedAt);

  return {
    publishedLabel,
    updatedLabel: updatedLabel && updatedLabel !== publishedLabel ? updatedLabel : null
  };
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCachedPostDetails(slug);

  if (!post) notFound();

  const { title, excerpt } = post;

  return createPageMetadata({
    title: title ?? 'Untitled',
    description: excerpt,
    canonical: `/posts/${slug}`
  });
}

export async function generateStaticParams() {
  return getPostSlugs();
}

export default async function PostPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const post = await getCachedPostDetails(slug);

  if (!post) notFound();

  const {
    title,
    excerpt,
    category,
    readTime,
    tags,
    coverUrl,
    coverAlt,
    coverImageLqip,
    bodyBlocks,
    headingIds
  } = post;

  const { publishedLabel, updatedLabel } = getPostDateLabels(post);

  return (
    <PageLayout contentClassName="space-y-10 sm:space-y-14">
      <header className="space-y-6">
        <PostHeader
          title={title}
          excerpt={excerpt}
          category={category}
          date={publishedLabel}
          updated={updatedLabel}
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
    </PageLayout>
  );
}
