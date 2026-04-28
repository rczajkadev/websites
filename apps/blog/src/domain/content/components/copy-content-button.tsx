'use client';

import { Check, Copy } from 'lucide-react';

import { Button } from '@/ui/button';
import { cn } from '@/utils/cn';

import { useCopyContent } from '../hooks';

type CopyContentButtonProps = {
  content: string;
  className?: string;
};

export const CopyContentButton = ({ content, className }: CopyContentButtonProps) => {
  const { copied, copy } = useCopyContent();

  return (
    <Button
      className={cn(
        'cursor-pointer text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100',
        className
      )}
      onClick={() => void copy(content)}
      size="icon"
      type="button"
      variant="ghost"
      aria-label={copied ? 'Copied content' : 'Copy content'}
    >
      {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
    </Button>
  );
};
