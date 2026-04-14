import { ArrowRightIcon } from 'lucide-react';

import { Button } from '@/ui/button';
import { cn } from '@/utils/cn';

const ROOT_SITE_URL = 'https://rczajka.me';
const DOMAIN = 'rczajka.me';

type HomeLinkProps = {
  className?: string;
};

export function DesktopHomeLink({ className }: HomeLinkProps) {
  return (
    <Button variant="outline" className={cn('text-sm', className)} asChild>
      <a href={ROOT_SITE_URL}>
        <span>{DOMAIN}</span>
        <ArrowRightIcon className="size-4" />
      </a>
    </Button>
  );
}

export function MobileHomeLink({ className }: HomeLinkProps) {
  return (
    <Button variant="outline" size="lg" className={cn('w-full justify-between', className)} asChild>
      <a href={ROOT_SITE_URL}>
        <span>{DOMAIN}</span>
        <ArrowRightIcon className="size-4" />
      </a>
    </Button>
  );
}
