'use client';

import { useScrollSpy, useWindowSize } from '@websites/hooks';
import { useMemo } from 'react';

import type { TocItem } from '../models';

export function useActiveToc(toc: TocItem[]) {
  const ids = useMemo(() => toc.map((item) => item.id), [toc]);
  const { height } = useWindowSize();
  const activeId = useScrollSpy(ids, { offset: height / 2 });

  return {
    ids,
    activeId
  };
}
