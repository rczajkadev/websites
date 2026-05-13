import type { PostCategory } from '@/domain/posts/models';
import { cn } from '@/utils/cn';

import { Brand } from './brand';
import { MobileNavigationSheet } from './mobile-navigation-sheet';
import { SearchButton } from './search-button';
import { ThemeToggle } from './theme-toggle';

type MobileHeaderProps = {
  categories: PostCategory[];
  onOpenSearch: () => void;
  className?: string;
};

export function MobileHeader({ categories, onOpenSearch, className }: MobileHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <Brand />
      <div className={cn('flex items-center gap-3', className)}>
        <SearchButton onClick={onOpenSearch} />
        <ThemeToggle />
        {/* <LanguageButton /> */}
        <MobileNavigationSheet categories={categories} />
      </div>
    </div>
  );
}
