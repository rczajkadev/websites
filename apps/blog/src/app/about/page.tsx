import type { Metadata } from 'next';

import { PageContent } from '../_components';

export const metadata: Metadata = {
  title: 'About | Blog',
  description: ''
};

export default function AboutPage() {
  return (
    <PageContent>
      <section className="space-y-4">
        <h1 className="text-3xl sm:text-4xl">About</h1>
        <p className="text-base leading-relaxed">
          The Boring Blog is a place for practical notes about programming, technology, and other
          stuff. Short posts, concrete examples, and ideas you can actually use.
        </p>
      </section>
    </PageContent>
  );
}
