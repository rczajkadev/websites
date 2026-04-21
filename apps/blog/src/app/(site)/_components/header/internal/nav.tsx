import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import type { PostCategory } from '@/domain/posts/models';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/ui/navigation-menu';
import { SheetClose } from '@/ui/sheet';
import { cn } from '@/utils/cn';

import { HeaderSheetButton, HeaderTextButton } from './header-button';

type DesktopNavProps = {
  categories: PostCategory[];
  className?: string;
};

export function DesktopNav({ categories, className }: DesktopNavProps) {
  if (categories.length === 0) return null;

  return (
    <nav className={cn('flex items-center', className)} aria-label="Categories">
      <NavigationMenu>
        <NavigationMenuList className="justify-start">
          <NavigationMenuItem>
            <HeaderTextButton asChild>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            </HeaderTextButton>
            <NavigationMenuContent>
              <ul className="min-w-48 flex flex-col gap-1 py-1">
                {categories.map((category) => (
                  <li key={category.id}>
                    <NavigationMenuLink asChild>
                      <Link href={`/categories/${category.slug}`}>{category.title}</Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

type MobileNavProps = {
  categories: PostCategory[];
  className?: string;
};

export function MobileNav({ categories, className }: MobileNavProps) {
  if (categories.length === 0) return null;

  return (
    <nav className={className} aria-label="Categories">
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <SheetClose asChild>
              <HeaderSheetButton asChild>
                <Link href={`/categories/${category.slug}`}>
                  {category.title}
                  <ArrowRightIcon className="size-4" />
                </Link>
              </HeaderSheetButton>
            </SheetClose>
          </li>
        ))}
      </ul>
    </nav>
  );
}
