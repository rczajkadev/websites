import Image from 'next/image';

import { cn } from '@/utils/cn';

type PostImageFrameProps = {
  coverUrl?: string;
  coverAlt?: string | null;
  coverImageLqip?: string | null;
  className?: string;
  imageClassName?: string;
  sizes: string;
  preload?: boolean;
  hideIfMissing?: boolean;
};

export function PostImageFrame({
  coverUrl,
  coverAlt,
  coverImageLqip,
  className,
  imageClassName,
  sizes,
  preload = false,
  hideIfMissing = false
}: PostImageFrameProps) {
  if (!coverUrl && hideIfMissing) return null;

  return (
    <div className={cn('relative aspect-video overflow-hidden', className)}>
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={coverAlt ?? ''}
          fill
          className={cn('object-cover', imageClassName)}
          sizes={sizes}
          quality={85}
          preload={preload}
          loading={preload ? 'eager' : 'lazy'}
          placeholder={coverImageLqip ? 'blur' : 'empty'}
          blurDataURL={coverImageLqip ?? undefined}
        />
      ) : (
        <div className="h-full w-full bg-card" />
      )}
    </div>
  );
}
