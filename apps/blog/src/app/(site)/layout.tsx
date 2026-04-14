import { BackToTopButton } from '@/app/(site)/_components/actions';
import { Header, HeaderVisibility } from '@/app/(site)/_components/header';
import { getCategories } from '@/domain/posts/services';
import { cn } from '@/utils/cn';

const skipToContentButton = (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm font-medium"
  >
    Skip to content
  </a>
);

const pageContentClassNames = 'mx-auto w-full max-w-5xl px-4 sm:px-6';

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <>
      {skipToContentButton}
      <HeaderVisibility>
        <Header categories={categories} className={cn('py-3', pageContentClassNames)} />
      </HeaderVisibility>
      <div className={cn('pb-12 sm:pb-16', pageContentClassNames)}>{children}</div>
      <BackToTopButton />
    </>
  );
}
