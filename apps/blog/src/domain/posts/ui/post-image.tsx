import Image from 'next/image';

import { cn } from '@/utils/cn';

type PostImageProps = {
  coverUrl?: string;
  coverAlt?: string | null;
  coverImageLqip?: string | null;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  preload?: boolean;
  hideIfMissing?: boolean;
};

export function PostImage({
  coverUrl,
  coverAlt,
  coverImageLqip,
  className,
  imageClassName,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 84vw, 820px',
  preload = false,
  hideIfMissing = false
}: PostImageProps) {
  if (!coverUrl && hideIfMissing) return null;

  return (
    <div className={cn('relative aspect-video w-full overflow-hidden', className)}>
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={coverAlt ?? ''}
          fill
          className={cn('object-cover', imageClassName)}
          sizes={sizes}
          quality={85}
          preload={preload}
          placeholder={coverImageLqip ? 'blur' : 'empty'}
          blurDataURL={coverImageLqip ?? undefined}
        />
      ) : (
        <div className="h-full w-full bg-card" />
      )}
    </div>
  );
}
