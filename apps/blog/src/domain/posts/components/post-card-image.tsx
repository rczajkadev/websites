import { cn } from '@/utils/cn';

import type { Post } from '../models';
import { PostImageFrame } from './_parts';

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
      className={cn('w-full rounded-md', className)}
      imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 84vw, 820px"
      preload={preload}
    />
  );
}
