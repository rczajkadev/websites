import Link from 'next/link';

import { cn } from '@/utils/cn';

type PostTagsProps = {
  tags?: string[] | null;
  className?: string;
};

export const Tags = ({ tags, className }: PostTagsProps) => {
  if (!tags?.length) return null;

  return (
    <div className={cn('flex flex-wrap gap-x-3 gap-y-2 text-base', className)}>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
          className="italic text-muted-foreground underline-offset-4 transition-[color] hover:text-foreground"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
};
