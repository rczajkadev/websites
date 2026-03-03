'use client';

import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { cn } from '@/utils/cn';

import { useActiveToc } from '../hooks';

type TocItem = {
  id: string;
  label: string;
  level: number;
};

type PostTocProps = {
  toc: TocItem[];
};

export const Toc = ({ toc }: PostTocProps) => {
  const { ids, activeId } = useActiveToc(toc);

  if (!ids.length) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-xl">Table of Contents</h2>
      <Separator className="opacity-60" />
      <nav aria-label="Table of contents">
        <ul className="space-y-1">
          {toc.map(({ id, label, level }) => (
            <li key={id}>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  'w-full h-auto justify-start rounded-none border-l-2 border-transparent text-sm text-muted-foreground whitespace-normal',
                  level === 3 && 'pl-6',
                  activeId === id && 'border-l-primary text-foreground'
                )}
              >
                <a href={`#${id}`} aria-current={activeId === id ? 'true' : undefined}>
                  {label}
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
