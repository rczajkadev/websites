import type { PostCategory } from '@/domain/posts/models';
import { cn } from '@/utils/cn';

import { Brand } from './brand';
import { DesktopHomeLink } from './home-link';
import { DesktopNav } from './nav';
import { SearchButton } from './search-button';
import { ThemeToggle } from './theme-toggle';

type DesktopHeaderProps = {
  categories: PostCategory[];
  onOpenSearch: () => void;
  className?: string;
};

export function DesktopHeader({ categories, onOpenSearch, className }: DesktopHeaderProps) {
  return (
    <div className={cn('flex w-full items-center justify-between gap-4', className)}>
      <div className="flex items-center gap-3">
        <Brand />
        <DesktopNav categories={categories} />
      </div>
      <div className={cn('flex items-center gap-3', className)}>
        <SearchButton onClick={onOpenSearch} />
        <ThemeToggle />
        {/* <LanguageButton /> */}
        <DesktopHomeLink />
      </div>
    </div>
  );
}
