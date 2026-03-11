import type { Metadata } from 'next';

import { getAboutInfo } from '@/domain/about/services';
import { AboutContent } from '@/domain/about/ui';

import { PageContent } from '../_components';

export function generateMetadata(): Metadata {
  const aboutInfo = getAboutInfo();
  const description = aboutInfo.paragraphs[0]?.replace(/\s+/g, ' ').trim();

  return {
    title: 'About',
    description
  };
}

export default function AboutPage() {
  const aboutInfo = getAboutInfo();

  return (
    <PageContent>
      <AboutContent aboutInfo={aboutInfo} />
    </PageContent>
  );
}
