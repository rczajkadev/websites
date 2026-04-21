import type { PostCategory } from '@/domain/posts/models';
import { cn } from '@/utils/cn';

import { Brand } from './brand';
import { MobileHeaderActions } from './header-actions';

type MobileHeaderProps = {
  categories: PostCategory[];
  onOpenSearch: () => void;
  className?: string;
};

export function MobileHeader({ categories, onOpenSearch, className }: MobileHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <Brand />
      <MobileHeaderActions categories={categories} onOpenSearch={onOpenSearch} />
    </div>
  );
}
