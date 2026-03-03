import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { PostCategory } from '@/domain/posts/models';
import { Button } from '@/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from '@/ui/navigation-menu';
import { SheetClose } from '@/ui/sheet';

import { HeaderSeparator } from './header-separator';
import { NavButton } from './nav-button';

type NavProps = {
  categories: PostCategory[];
  variant?: 'menu' | 'inline';
  className?: string;
};

export function Nav({ categories, variant = 'inline', className }: NavProps) {
  if (variant === 'menu') {
    return (
      <nav className={className} aria-label="Navigation">
        <ul className="space-y-2">
          <li>
            <SheetClose asChild>
              <Button variant="outline" size="lg" className="w-full justify-between" asChild>
                <Link href="/about">
                  About
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
            </SheetClose>
          </li>
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

  const navigationMenu = (
    <NavigationMenuItem className="md:hidden">
      <NavButton variant="ghost" asChild>
        <NavigationMenuTrigger className="text-sm font-medium">Categories</NavigationMenuTrigger>
      </NavButton>
      <NavigationMenuContent>
        <ul className="flex flex-col min-w-48 gap-1 py-1">
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
  );

  const navigation = (
    <>
      <HeaderSeparator className="mx-1 hidden md:block" />
      {categories.length > 0 &&
        categories.map((category) => (
          <NavigationMenuItem key={category.id} className="hidden md:flex">
            <NavButton variant="ghost" asChild>
              <Link href={`/categories/${category.slug}`} className="text-sm font-medium">
                {category.title}
              </Link>
            </NavButton>
          </NavigationMenuItem>
        ))}
    </>
  );

  return (
    <NavigationMenu>
      <NavigationMenuList className="justify-start">
        <NavigationMenuItem>
          <NavButton variant="ghost" asChild>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
          </NavButton>
        </NavigationMenuItem>
        {navigationMenu}
        {navigation}
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
}
