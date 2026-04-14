import type { Metadata } from 'next';

import { PageContent } from '@/app/(site)/_components';
import { getPosts } from '@/domain/posts/services';
import { EmptyState, PostCardList } from '@/domain/posts/ui';

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
