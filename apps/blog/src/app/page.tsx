import type { Metadata } from 'next';

import { getPosts } from '@/domain/posts/services';
import { EmptyState, PostCardList } from '@/domain/posts/ui';

import { PageContent } from './_components';

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
