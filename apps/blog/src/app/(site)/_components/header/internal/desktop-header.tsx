import type { PostCategory } from '@/domain/posts/models';
import { ThemeToggle } from '@/domain/theme/ui';
import { cn } from '@/utils/cn';

import { Brand } from './brand';
import { DesktopHomeLink } from './home-link';
import { DesktopNav } from './nav';
import { SearchButton } from './search-button';

type DesktopHeaderProps = {
  categories: PostCategory[];
  onOpenSearch: () => void;
  className?: string;
};

export function DesktopHeader({ categories, onOpenSearch, className }: DesktopHeaderProps) {
  return (
    <div className={cn('flex w-full items-center justify-between gap-3', className)}>
      <div className="flex items-center gap-1">
        <Brand />
        <DesktopNav categories={categories} />
      </div>
      <div className="flex items-center gap-3">
        <SearchButton onClick={onOpenSearch} />
        <ThemeToggle />
        <DesktopHomeLink />
      </div>
    </div>
  );
}
