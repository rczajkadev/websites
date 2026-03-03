import 'katex/dist/katex.min.css';
import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { BackToTopButton } from '@/app/_components/actions';
import { Header, HeaderVisibility } from '@/app/_components/header';
import { getCategories } from '@/domain/posts/services';
import { DEFAULT_THEME } from '@/domain/theme/constants';
import { themeInitScript } from '@/domain/theme/scripts';
import { cn } from '@/utils/cn';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Starter blog built with Next.js, Tailwind, TypeScript, and shadcn/ui.'
};

const skipToContentButton = (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm font-medium"
  >
    Skip to content
  </a>
);

const pageContentClassNames = 'mx-auto w-full max-w-5xl px-4 sm:px-6';

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
    >
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        id="top"
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'min-h-screen bg-background text-foreground antialiased'
        )}
      >
        {skipToContentButton}
        <HeaderVisibility>
          <Header categories={categories} className={cn('py-3', pageContentClassNames)} />
        </HeaderVisibility>
        <div className={cn('pb-12 sm:pb-16', pageContentClassNames)}>{children}</div>
        <BackToTopButton />
      </body>
    </html>
  );
}
