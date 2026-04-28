import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageContent, TaxonomyAside } from '@/app/(site)/_components';
import { PostCardList } from '@/domain/posts/components';
import { getCategoryPageData, getCategorySlugs } from '@/domain/posts/queries';

export const dynamicParams = false;

export const generateStaticParams = () => getCategorySlugs();

const getCachedCategoryPageData = cache(getCategoryPageData);

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getCachedCategoryPageData(slug);

  if (!pageData) notFound();

  return {
    title: pageData.title,
    description:
      pageData.description?.replace(/\s+/g, ' ').trim() || `Articles in ${pageData.title}.`,
    alternates: {
      canonical: `/categories/${slug}`
    }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageData = await getCachedCategoryPageData(slug);

  if (!pageData) notFound();

  return (
    <PageContent
      className="space-y-12"
      aside={<TaxonomyAside title={pageData.title} description={pageData.description} />}
    >
      {!!pageData.posts.length && <PostCardList posts={pageData.posts} />}
    </PageContent>
  );
}
