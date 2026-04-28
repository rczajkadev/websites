import { type PortableTextValue } from '@websites/sanity-blog/content';
import { urlForImage } from '@websites/sanity-blog/image';
import NextImage from 'next/image';

type ImageValue = Extract<PortableTextValue[number], { _type: 'image' }>;

export function Image({ value }: { value: ImageValue }) {
  const { alt, dimensions, lqip } = value;

  const { width, height } = dimensions ?? {};

  if (!width || !height) return null;

  const src = urlForImage(value).width(2048).fit('max').url();

  return (
    <figure className="my-6 space-y-2">
      <NextImage
        alt={alt ?? ''}
        className="h-auto w-full"
        height={height}
        src={src}
        width={width}
        sizes="(max-width: 768px) 100vw, 637px"
        quality={85}
        placeholder={lqip ? 'blur' : 'empty'}
        blurDataURL={lqip ?? undefined}
      />
      {alt && (
        <figcaption className="text-center text-sm text-muted-foreground italic">{alt}</figcaption>
      )}
    </figure>
  );
}
