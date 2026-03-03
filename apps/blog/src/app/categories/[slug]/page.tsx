import { notFound } from 'next/navigation';

import { PageContent } from '@/app/_components';
import { getCategorySlugs, getPostsByCategory } from '@/domain/posts/services';
import { PostCardList } from '@/domain/posts/ui';

export const dynamicParams = false;

export const generateStaticParams = () => getCategorySlugs();

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageData = await getPostsByCategory(slug);

  if (!pageData) notFound();

  return (
    <PageContent
      className="space-y-12"
      aside={
        <section className="space-y-4 rounded-md border border-border bg-card p-5 md:sticky md:top-20">
          <h1 className="text-2xl tracking-tight">{pageData.categoryTitle}</h1>
          {!!pageData.categoryDescription && (
            <p className="text-sm leading-relaxed">{pageData.categoryDescription}</p>
          )}
          <p className="text-sm text-muted-foreground">
            {pageData.posts.length} {pageData.posts.length === 1 ? 'article' : 'articles'}
          </p>
        </section>
      }
    >
      {!!pageData.posts.length && <PostCardList posts={pageData.posts} />}
    </PageContent>
  );
}
