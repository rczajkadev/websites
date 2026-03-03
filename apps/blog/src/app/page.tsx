import { EmptyState, PostCardList } from '@/domain/posts/ui';
import { getSearchIndex } from '@/infra/search';

import { PageContent } from './_components';

export default async function Home() {
  const { documents } = await getSearchIndex();

  return (
    <PageContent>
      {documents.length ? <PostCardList posts={documents} /> : <EmptyState />}
    </PageContent>
  );
}
