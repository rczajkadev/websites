import type { PostCategory } from '@/domain/posts/models';
import { cn } from '@/utils/cn';

import { Brand } from './brand';
import { DesktopHeaderActions } from './header-actions';
import { DesktopNav } from './nav';

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
      <DesktopHeaderActions onOpenSearch={onOpenSearch} />
    </div>
  );
}
