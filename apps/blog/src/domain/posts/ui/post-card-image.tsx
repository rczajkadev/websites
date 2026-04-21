import { cn } from '@/utils/cn';

import type { Post } from '../models';
import { PostImageFrame } from './internal/post-image-frame';

type PostCardImageProps = Pick<Post, 'title' | 'coverUrl' | 'coverAlt'> & {
  preload?: boolean;
  className?: string;
};

export function PostCardImage({
  title,
  coverUrl,
  coverAlt,
  preload = false,
  className
}: PostCardImageProps) {
  return (
    <PostImageFrame
      coverUrl={coverUrl}
      coverAlt={coverAlt ?? title}
      className={cn('w-full', className)}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 84vw, 820px"
      preload={preload}
    />
  );
}
