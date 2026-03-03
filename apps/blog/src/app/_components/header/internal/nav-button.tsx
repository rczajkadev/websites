import { Button, ButtonProps } from '@/ui/button';
import { cn } from '@/utils/cn';

export const NavButton = ({ className, ...props }: ButtonProps) => (
  <Button className={cn('px-2.5', className)} {...props} />
);
