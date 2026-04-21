import Link from 'next/link';

import { HeaderTextButton } from './header-button';

type BrandProps = {
  className?: string;
};

export const Brand = ({ className }: BrandProps) => (
  <HeaderTextButton className={className} asChild>
    <Link href="/" aria-label="Blog home">
      <span>Blog</span>
    </Link>
  </HeaderTextButton>
);
