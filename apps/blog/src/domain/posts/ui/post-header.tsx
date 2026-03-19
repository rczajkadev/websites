import { cn } from '@/utils/cn';

import { PostMeta } from './internal';

type Category = {
  slug?: string | null;
  title?: string | null;
};

type PostHeaderProps = {
  title?: string | null;
  excerpt?: string | null;
  category?: string | Category | null;
  date?: string | null;
  updated?: string | null;
  readTime?: number;
  variant?: 'default' | 'simplified';
  headingLevel?: 'h1' | 'h2';
  titleClassName?: string;
  className?: string;
};

export function PostHeader({
  title,
  excerpt,
  category,
  date,
  updated,
  readTime,
  variant = 'default',
  headingLevel = 'h1',
  titleClassName,
  className
}: PostHeaderProps) {
  const Heading = headingLevel;
  const showExtendedMeta = variant !== 'simplified';
  const isSimplified = variant === 'simplified';

  return (
    <div className={cn('space-y-4 sm:space-y-5', className)}>
      <Heading
        className={cn(
          'tracking-tight',
          isSimplified ? 'line-clamp-2 text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl',
          titleClassName
        )}
      >
        {title ?? 'Untitled'}
      </Heading>
      {excerpt && (
        <p className={cn('leading-relaxed', isSimplified ? 'line-clamp-3 text-base' : 'sm:text-lg')}>
          {excerpt}
        </p>
      )}
      <PostMeta
        category={category}
        date={date}
        updated={showExtendedMeta ? updated : undefined}
        readTime={showExtendedMeta ? readTime : undefined}
        className="pt-1"
      />
    </div>
  );
}
