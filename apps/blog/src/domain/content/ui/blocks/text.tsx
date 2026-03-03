import { getHeadingId, type PortableTextBlock } from '@websites/sanity-blog/content';
import React from 'react';

import { cn } from '@/utils/cn';

type TextProps = {
  children?: React.ReactNode;
};

type HeadingProps = TextProps & {
  value: PortableTextBlock;
  headingIds?: Record<string, string>;
};

export function Heading({ value, headingIds, children }: HeadingProps) {
  const H = value.style as 'h1' | 'h2' | 'h3' | 'h3' | 'h4' | 'h5' | 'h6';

  const sizeMap = {
    h1: 'text-4xl sm:text-5xl',
    h2: 'text-3xl sm:text-4xl',
    h3: 'text-2xl sm:text-3xl',
    h4: 'text-xl sm:text-2xl',
    h5: 'text-lg sm:text-xl',
    h6: 'text-md sm:text-lg'
  };

  return (
    <H
      id={getHeadingId(value, headingIds)}
      className={cn('scroll-mt-24 mt-12 first:mt-0', sizeMap[H])}
    >
      {children}
    </H>
  );
}

export const Text = ({ children }: TextProps) => (
  <p className="leading-loose md:text-lg [&>strong]:text-foreground">{children}</p>
);

export const Code = ({ children }: TextProps) => (
  <code className="text-xs md:text-sm rounded-xs bg-muted text-foreground px-1.5 py-0.5 font-mono font-medium">
    {children}
  </code>
);
