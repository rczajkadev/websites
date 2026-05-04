import { ArrowRightIcon } from 'lucide-react';

import { cn } from '@/utils/cn';

import { HeaderOutlineButton, HeaderSheetButton } from './header-button';

const ROOT_SITE_URL = 'https://rczajka.me';
const DOMAIN = 'rczajka.me';

type HomeLinkProps = {
  className?: string;
};

export function DesktopHomeLink({ className }: HomeLinkProps) {
  return (
    <HeaderOutlineButton className={cn('rounded-full', className)} asChild>
      <a href={ROOT_SITE_URL}>
        <span>{DOMAIN}</span>
        <ArrowRightIcon className="size-4" />
      </a>
    </HeaderOutlineButton>
  );
}

export function MobileHomeLink({ className }: HomeLinkProps) {
  return (
    <HeaderSheetButton className={cn('w-full', className)} asChild>
      <a href={ROOT_SITE_URL}>
        <span>{DOMAIN}</span>
        <ArrowRightIcon className="size-4" />
      </a>
    </HeaderSheetButton>
  );
}
