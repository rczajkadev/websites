'use client';

import { useCallback, useEffect, useEffectEvent, useState } from 'react';

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
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return;
      if (isEditableTarget(event.target)) return;

      event.preventDefault();
      setOpen((prev) => !prev);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  return {
    open,
    setOpen,
    openDialog,
    query,
    setQuery
  };
}
