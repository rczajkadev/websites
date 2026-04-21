import type { PostCategory } from '@/domain/posts/models';
import { cn } from '@/utils/cn';

import { DesktopHomeLink } from './home-link';
import { MobileNavigationSheet } from './mobile-navigation-sheet';
import { SearchButton } from './search-button';
import { ThemeToggle } from './theme-toggle';

type HeaderActionsProps = {
  onOpenSearch: () => void;
  className?: string;
};

function HeaderActionGroup({
  onOpenSearch,
  children,
  className
}: HeaderActionsProps & { children?: React.ReactNode }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <SearchButton onClick={onOpenSearch} />
      <ThemeToggle />
      {children}
    </div>
  );
}

export function DesktopHeaderActions({ onOpenSearch, className }: HeaderActionsProps) {
  return (
    <HeaderActionGroup onOpenSearch={onOpenSearch} className={className}>
      <DesktopHomeLink />
    </HeaderActionGroup>
  );
}

export function MobileHeaderActions({
  categories,
  onOpenSearch,
  className
}: HeaderActionsProps & { categories: PostCategory[] }) {
  return (
    <HeaderActionGroup onOpenSearch={onOpenSearch} className={className}>
      <MobileNavigationSheet categories={categories} />
    </HeaderActionGroup>
  );
}
