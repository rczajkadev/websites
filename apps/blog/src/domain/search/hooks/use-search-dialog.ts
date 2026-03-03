'use client';

import { useEffect, useEffectEvent, useState } from 'react';

import { listenOpenSearchEvent } from '@/domain/search/events';

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;

  const tagName = target.tagName;

  return (
    target.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'TEXTAREA' ||
    tagName === 'SELECT'
  );
};

export function useSearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const clearQuery = useEffectEvent(() => {
    setQuery('');
  });

  useEffect(() => {
    if (!open) clearQuery();
  }, [open]);

  useEffect(() => {
    return listenOpenSearchEvent(() => setOpen(true));
  }, [setOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return;
      if (isEditableTarget(event.target)) return;

      event.preventDefault();
      setOpen((prev) => !prev);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return {
    open,
    setOpen,
    query,
    setQuery
  };
}
