import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/ui/button';

import { PageContent } from './_components';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for could not be found.'
};

export default function NotFound() {
  return (
    <PageContent
      className="min-h-[60vh]"
      contentClassName="flex min-h-[60vh] flex-col items-center justify-center gap-10 text-center"
    >
      <div className="space-y-2">
        <p className="text-9xl font-semibold">404</p>
        <h1 className="text-2xl">Page not found</h1>
      </div>
      <Button size="lg" variant="solid" asChild>
        <Link href="/">Back to homepage</Link>
      </Button>
    </PageContent>
  );
}
