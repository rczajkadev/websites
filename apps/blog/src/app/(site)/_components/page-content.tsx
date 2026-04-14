import { cn } from '@/utils/cn';

type PageContentProps = {
  children: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  asideClassName?: string;
};

export function PageContent({
  children,
  aside,
  className,
  contentClassName,
  asideClassName
}: PageContentProps) {
  const hasAside = !!aside;

  return (
    <main id="main-content" className={cn('w-full mt-10 sm:mt-16 md:mt-20', className)}>
      <div
        className={cn(
          hasAside
            ? 'flex flex-col-reverse gap-16 md:grid md:grid-cols-12 md:gap-10'
            : 'sm:grid sm:grid-cols-12 sm:gap-10'
        )}
      >
        <div
          className={cn(
            hasAside ? 'md:col-span-8' : 'sm:col-start-3 sm:col-span-8',
            contentClassName
          )}
        >
          {children}
        </div>
        {hasAside && (
          <aside className={cn('md:col-start-9 md:col-end-13', asideClassName)}>{aside}</aside>
        )}
      </div>
    </main>
  );
}
