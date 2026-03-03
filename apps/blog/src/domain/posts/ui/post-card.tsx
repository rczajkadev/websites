import Link from 'next/link';

import { cn } from '@/utils/cn';

import type { Post } from '../models';
import { PostHeader } from './post-header';
import { PostImage } from './post-image';

export type PostCardProps = Post & {
  updated?: string;
  readTime?: number;
  className?: string;
};

export function PostCard({
  title,
  href,
  category,
  excerpt,
  date,
  updated,
  readTime,
  coverUrl,
  coverAlt,
  className
}: PostCardProps) {
  return (
    <article className={cn('rounded-md', className)}>
      <Link href={href} className="group block space-y-4 rounded-md sm:space-y-5">
        <PostImage coverUrl={coverUrl} coverAlt={coverAlt ?? title} />
        <PostHeader
          variant="simplified"
          headingLevel="h2"
          titleClassName="underline-offset-4 decoration-1 decoration-transparent transition-[text-decoration-color] duration-300 group-hover:underline group-hover:decoration-current"
          title={title}
          excerpt={excerpt}
          category={category}
          date={date}
          updated={updated}
          readTime={readTime}
        />
      </Link>
    </article>
  );
}
