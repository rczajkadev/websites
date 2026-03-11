import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageContent } from '@/app/_components';
import { getPostsByTag, getTagSlugs } from '@/domain/posts/services';
import { PostCardList, Tags } from '@/domain/posts/ui';

export const dynamicParams = false;

export const generateStaticParams = async () => getTagSlugs();

const getCachedPostsByTag = cache(getPostsByTag);

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getCachedPostsByTag(slug);

  if (!pageData) notFound();

  return {
    title: `#${pageData.tag}`,
    description: `Articles tagged with ${pageData.tag}.`
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [pageData, tagParams] = await Promise.all([getCachedPostsByTag(slug), getTagSlugs()]);

  if (!pageData) notFound();

  const currentTagSlug = pageData.tag.toLowerCase();
  const relatedTags = tagParams
    .map(({ slug: tag }) => tag)
    .filter((tag) => tag.toLowerCase() !== currentTagSlug)
    .sort((a, b) => a.localeCompare(b));

  return (
    <PageContent
      className="space-y-10 sm:space-y-16"
      aside={
        <section className="space-y-5 rounded-md border border-border bg-card p-5 md:sticky md:top-20">
          <div className="space-y-2">
            <h1 className="text-2xl tracking-tight">#{pageData.tag}</h1>
            <p className="text-sm text-muted-foreground">
              {pageData.posts.length} {pageData.posts.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
          {!!relatedTags.length && (
            <Tags tags={relatedTags} className="border-t border-border pt-4" />
          )}
        </section>
      }
    >
      {!!pageData.posts.length && <PostCardList posts={pageData.posts} />}
    </PageContent>
  );
}
