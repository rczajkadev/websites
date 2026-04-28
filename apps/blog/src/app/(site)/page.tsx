import type { Metadata } from 'next';

import { PageContent } from '@/app/(site)/_components';
import { EmptyState, PostCardList } from '@/domain/posts/components';
import { getPosts } from '@/domain/posts/queries';

export const metadata: Metadata = {
  alternates: {
    canonical: '/'
  }
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <PageContent>{posts.length ? <PostCardList posts={posts} /> : <EmptyState />}</PageContent>
  );
}
