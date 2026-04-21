import { Footer } from '@/app/(site)/_components';
import { BackToTopButton } from '@/app/(site)/_components/actions';
import { Header, HeaderVisibility } from '@/app/(site)/_components/header';
import { getCategories } from '@/domain/posts/services';

const skipToContentButton = (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm font-medium"
  >
    Skip to content
  </a>
);

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <>
      {skipToContentButton}
      <div className="flex min-h-screen flex-col">
        <HeaderVisibility>
          <Header categories={categories} className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6" />
        </HeaderVisibility>
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-6 sm:px-6">
          {children}
          <Footer className="mt-auto pt-16 sm:pt-20" />
        </div>
      </div>
      <BackToTopButton />
    </>
  );
}
