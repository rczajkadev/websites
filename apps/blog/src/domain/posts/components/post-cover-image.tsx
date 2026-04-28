import { cn } from '@/utils/cn';

import type { PostDetails } from '../models';
import { PostImageFrame } from './_parts';

type PostCoverImageProps = Pick<PostDetails, 'coverUrl' | 'coverAlt' | 'coverImageLqip'> & {
  className?: string;
};

export function PostCoverImage({
  coverUrl,
  coverAlt,
  coverImageLqip,
  className
}: PostCoverImageProps) {
  return (
    <PostImageFrame
      coverUrl={coverUrl}
      coverAlt={coverAlt}
      coverImageLqip={coverImageLqip}
      className={cn('w-full', className)}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) calc(100vw - 6rem), 720px"
      preload
      hideIfMissing
    />
  );
}
