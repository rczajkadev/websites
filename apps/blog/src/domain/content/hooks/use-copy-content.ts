'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type UseCopyContentOptions = {
  resetDelayMs?: number;
};

export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function useCopyContent({ resetDelayMs = 1500 }: UseCopyContentOptions = {}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  const copy = useCallback(
    async (text: string) => {
      const success = await copyToClipboard(text);

      if (!success) {
        setCopied(false);
        return false;
      }

      setCopied(true);

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => setCopied(false), resetDelayMs);
      return true;
    },
    [resetDelayMs]
  );

  return { copied, copy };
}
