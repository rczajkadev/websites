import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import type { PostCategory } from '@/domain/posts/models';
import { Button } from '@/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/ui/navigation-menu';
import { Separator } from '@/ui/separator';
import { SheetClose } from '@/ui/sheet';
import { cn } from '@/utils/cn';

type DesktopNavProps = {
  categories: PostCategory[];
  className?: string;
};

export function DesktopNav({ categories, className }: DesktopNavProps) {
  if (categories.length === 0) return null;

  return (
    <nav className={cn('flex items-center', className)} aria-label="Categories">
      <CompactDesktopNav categories={categories} />
      <InlineDesktopNav categories={categories} />
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
              <Button variant="outline" size="lg" className="w-full justify-between" asChild>
                <Link href={`/categories/${category.slug}`}>
                  {category.title}
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
            </SheetClose>
          </li>
        ))}
      </ul>
    </nav>
  );
}

type CategoryNavProps = {
  categories: PostCategory[];
};

function CompactDesktopNav({ categories }: CategoryNavProps) {
  return (
    <NavigationMenu className="md:hidden">
      <NavigationMenuList className="justify-start">
        <NavigationMenuItem>
          <Button variant="ghost" className="px-2.5" asChild>
            <NavigationMenuTrigger className="text-sm font-medium">
              Categories
            </NavigationMenuTrigger>
          </Button>
          <NavigationMenuContent>
            <ul className="min-w-48 flex flex-col gap-1 py-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="rounded-sm border border-transparent px-2.5 py-2 text-sm hover:border-border/70"
                    >
                      {category.title}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function InlineDesktopNav({ categories }: CategoryNavProps) {
  return (
    <div className="hidden items-center md:flex">
      <Separator orientation="vertical" className="mx-1 my-2" />
      {categories.map((category) => (
        <Button key={category.id} variant="ghost" className="px-2.5" asChild>
          <Link href={`/categories/${category.slug}`} className="text-sm font-medium">
            {category.title}
          </Link>
        </Button>
      ))}
    </div>
  );
}
