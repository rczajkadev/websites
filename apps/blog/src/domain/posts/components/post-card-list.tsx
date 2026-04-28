import { cn } from '@/utils/cn';

import { PostCard, type PostCardProps } from './post-card';

type PostCardListProps = {
  posts: PostCardProps[];
  className?: string;
};

export function PostCardList({ posts, className }: PostCardListProps) {
  return (
    <section className={cn('w-full space-y-16 sm:space-y-24', className)}>
      {posts.map((post, index) => (
        <PostCard
          key={post.href}
          preloadCoverImage={index === 0}
          className={cn('w-full', post.className)}
          {...post}
        />
      ))}
    </section>
  );
}
