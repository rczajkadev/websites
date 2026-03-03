import { Separator } from '@/ui/separator';
import { cn } from '@/utils/cn';

export const HeaderSeparator = ({ className }: { className?: string }) => (
  <Separator orientation="vertical" className={cn('my-2', className)} />
);
