import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageContent, TaxonomyAside } from '@/app/(site)/_components';
import { PostCardList } from '@/domain/posts/components';
import { getTagPageData, getTagSlugs } from '@/domain/posts/queries';

export const dynamicParams = false;

export const generateStaticParams = async () => getTagSlugs();

const getCachedTagPageData = cache(getTagPageData);

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getCachedTagPageData(slug);

  if (!pageData) notFound();

  return {
    title: pageData.title,
    description: `Articles tagged with ${slug}.`,
    alternates: {
      canonical: `/tags/${slug}`
    }
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageData = await getCachedTagPageData(slug);

  if (!pageData) notFound();

  return (
    <PageContent
      className="space-y-10 sm:space-y-16"
      aside={<TaxonomyAside title={pageData.title} relatedTags={pageData.relatedTags} />}
    >
      {pageData.posts.length > 0 && <PostCardList posts={pageData.posts} />}
    </PageContent>
  );
}
