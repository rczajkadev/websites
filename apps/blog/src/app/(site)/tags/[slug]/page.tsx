import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageContent } from '@/app/(site)/_components';
import { getPosts, getTagSlugs } from '@/domain/posts/services';
import { PostCardList, Tags } from '@/domain/posts/ui';

export const dynamicParams = false;

export const generateStaticParams = async () => getTagSlugs();

const getCachedTaggedPosts = cache((slug: string) => getPosts({ type: 'tag', slug }));

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getCachedTaggedPosts(slug);

  if (!posts.length) notFound();

  return {
    title: `#${slug}`,
    description: `Articles tagged with ${slug}.`,
    alternates: {
      canonical: `/tags/${slug}`
    }
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [posts, tagParams] = await Promise.all([getCachedTaggedPosts(slug), getTagSlugs()]);

  if (!posts.length) notFound();

  const currentTagSlug = slug.toLowerCase();
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
            <h1 className="text-2xl tracking-tight">#{slug}</h1>
            <p className="text-sm text-muted-foreground">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
          {!!relatedTags.length && (
            <Tags tags={relatedTags} className="border-t border-border pt-4" />
          )}
        </section>
      }
    >
      {!!posts.length && <PostCardList posts={posts} />}
    </PageContent>
  );
}
