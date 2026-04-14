import { House } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/ui/button';
import { cn } from '@/utils/cn';

type BrandProps = {
  className?: string;
};

export const Brand = ({ className }: BrandProps) => (
  <Button variant="ghost" className={cn('px-2.5', className)} asChild>
    <Link href="/" aria-label="Blog home" className="text-sm">
      <House className="sm:hidden size-4" />
      <span>Blog</span>
    </Link>
  </Button>
);
