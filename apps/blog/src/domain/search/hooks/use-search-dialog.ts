'use client';

import { useCallback, useEffect, useState } from 'react';

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

type UseSearchDialogOptions = {
  onOpen?: () => void | Promise<void>;
};

export function useSearchDialog({ onOpen }: UseSearchDialogOptions = {}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const closeDialog = useCallback(() => {
    setQuery('');
    setOpen(false);
  }, []);

  const openDialog = useCallback(() => {
    void onOpen?.();
    setOpen(true);
  }, [onOpen]);

  const setDialogOpen = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        closeDialog();
        return;
      }

      void onOpen?.();
      setOpen(true);
    },
    [closeDialog, onOpen]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return;
      if (isEditableTarget(event.target)) return;

      event.preventDefault();

      if (open) {
        closeDialog();
        return;
      }

      void onOpen?.();
      setOpen(true);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeDialog, onOpen, open]);

  return {
    open,
    setOpen: setDialogOpen,
    openDialog,
    query,
    setQuery
  };
}
