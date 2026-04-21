import { Button, type ButtonProps } from '@/ui/button';
import { cn } from '@/utils/cn';

export function HeaderTextButton({ className, ...props }: ButtonProps) {
  return <Button variant="ghost" size="sm" className={cn('h-10', className)} {...props} />;
}

export function HeaderIconButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('size-10 cursor-pointer', className)}
      {...props}
    />
  );
}

export function HeaderOutlineButton({ className, ...props }: ButtonProps) {
  return <Button variant="outline" className={cn('h-10', className)} {...props} />;
}

export function HeaderSheetButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      className={cn('h-11 w-full justify-between', className)}
      {...props}
    />
  );
}
