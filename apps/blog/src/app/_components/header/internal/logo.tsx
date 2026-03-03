import { House } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/utils/cn';

import { NavButton } from './nav-button';

type LogoProps = {
  className?: string;
};

/**
 * For now it's more like a placeholder for a logo.
 * It's just a home icon (link) but can be updated later.
 */
export const Logo = ({ className }: LogoProps) => (
  <NavButton variant="ghost" asChild>
    <Link href="/" aria-label="Blog home" className={cn('text-sm', className)}>
      <House className="size-4" />
      <span className="sm:hidden">Blog</span>
    </Link>
  </NavButton>
);
