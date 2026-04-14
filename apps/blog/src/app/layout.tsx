import 'katex/dist/katex.min.css';
import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

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

const BLOG_TITLE = 'Blog';
const BLOG_DESCRIPTION =
  "A personal blog about programming, AI, physics, and other things I'm learning and exploring.";
const BLOG_URL = 'https://blog.rczajka.me';

export const metadata: Metadata = {
  metadataBase: new URL(BLOG_URL),
  title: {
    default: BLOG_TITLE,
    template: `%s | ${BLOG_TITLE}`
  },
  description: BLOG_DESCRIPTION
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {children}
      </body>
    </html>
  );
}
