'use client';

import { Menu, X } from 'lucide-react';

import type { PostCategory } from '@/domain/posts/models';
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
        <Button
          variant="ghost"
          size="icon"
          className={cn('cursor-pointer', className)}
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
