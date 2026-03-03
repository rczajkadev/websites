import { cn } from '@/utils/cn';

type EmptyStateProps = {
  message?: string;
  className?: string;
};

export function EmptyState({ message = 'No posts found', className }: EmptyStateProps) {
  return <p className={cn('text-sm text-center', className)}>{message}</p>;
}
