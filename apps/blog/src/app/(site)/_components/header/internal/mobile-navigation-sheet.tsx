'use client';

import { Menu, X } from 'lucide-react';

import type { PostCategory } from '@/domain/posts/models';
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

import { HeaderIconButton } from './header-button';
import { MobileHomeLink } from './home-link';
import { MobileNav } from './nav';

type MobileNavigationSheetProps = {
  categories: PostCategory[];
  className?: string;
};

export function MobileNavigationSheet({ categories, className }: MobileNavigationSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HeaderIconButton className={cn(className)} aria-label="Toggle navigation menu">
          <Menu className="size-5" />
        </HeaderIconButton>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-none border-l-0 p-4 sm:p-5">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation menu</SheetTitle>
          <SheetDescription>Site navigation and search</SheetDescription>
        </SheetHeader>
        <SheetClose asChild>
          <HeaderIconButton className="self-end" aria-label="Close menu">
            <X className="size-5" />
          </HeaderIconButton>
        </SheetClose>
        <div className="space-y-6">
          <MobileNav categories={categories} className="mt-4" />
          <Separator />
          <SheetClose asChild>
            <MobileHomeLink />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
