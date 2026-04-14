import type { PostCategory } from '@/domain/posts/models';
import { ThemeToggle } from '@/domain/theme/ui';
import { cn } from '@/utils/cn';

import { Brand } from './brand';
import { MobileNavigationSheet } from './mobile-navigation-sheet';
import { SearchButton } from './search-button';

type MobileHeaderProps = {
  categories: PostCategory[];
  onOpenSearch: () => void;
  className?: string;
};

export function MobileHeader({ categories, onOpenSearch, className }: MobileHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      <Brand />
      <div className="flex items-center gap-3">
        <SearchButton onClick={onOpenSearch} />
        <ThemeToggle />
        <MobileNavigationSheet categories={categories} />
      </div>
    </div>
  );
}
