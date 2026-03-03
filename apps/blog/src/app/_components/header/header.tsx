import { ArrowUpRightIcon, Menu, Rss, X } from 'lucide-react';

import type { PostCategory } from '@/domain/posts/models';
import { SearchDialog } from '@/domain/search/ui';
import { ThemeToggle } from '@/domain/theme/ui';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/ui/sheet';
import { cn } from '@/utils/cn';

import { HeaderSeparator, Logo, Nav, SearchButton } from './internal';

type SiteHeaderProps = {
  categories: PostCategory[];
  className?: string;
};

const rssButton = (
  <Button variant="ghost" size="icon" aria-label="RSS feed unavailable" disabled>
    <Rss className="size-4" />
  </Button>
);

const externalHomeLink = (
  <Button variant="outline" className="text-sm" asChild>
    <a href="https://rczajka.me" target="_blank" rel="noreferrer noopener">
      rczajka.me
      <ArrowUpRightIcon className="size-4" />
    </a>
  </Button>
);

export function Header({ categories, className }: SiteHeaderProps) {
  const mobileHeaderContent = (
    <div className="flex items-center justify-between gap-3">
      <Logo />
      <div className="flex items-center gap-3">
        <SearchButton />
        <ThemeToggle />
        <HeaderSeparator />
        {rssButton}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-none border-l-0 p-4 sm:p-5">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation menu</SheetTitle>
              <SheetDescription>Site navigation and search</SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer self-end"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </Button>
            </SheetClose>
            <div className="space-y-6">
              <Nav categories={categories} variant="menu" className="mt-4" />
              <Separator />
              <SheetClose asChild>
                <Button variant="outline" size="lg" className="w-full justify-between" asChild>
                  <a href="https://rczajka.me" target="_blank" rel="noreferrer noopener">
                    <span>rczajka.me</span>
                    <ArrowUpRightIcon className="size-4" />
                  </a>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );

  const desktopHeaderContent = (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="flex items-center gap-1">
        <Logo />
        <Nav categories={categories} />
      </div>
      <div className="flex items-center gap-3">
        <SearchButton />
        <ThemeToggle />
        <HeaderSeparator />
        {rssButton}
        {externalHomeLink}
      </div>
    </div>
  );

  return (
    <header
      className={cn(
        'w-full supports-backdrop-filter:bg-background/90 supports-backdrop-filter:backdrop-blur',
        className
      )}
    >
      <div className="block sm:hidden w-full">{mobileHeaderContent}</div>
      <div className="hidden sm:block w-full">{desktopHeaderContent}</div>
      <SearchDialog />
    </header>
  );
}
