'use client';

import { useEffect, useState } from 'react';

type Options = {
  offset?: number;
};

export const useScrollSpy = (ids: string[], options: Options = {}) => {
  const { offset = 120 } = options;

  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (!ids.length) return;

    let frameId = 0;

    const getActiveHTMLElement = () => {
      const elements = ids
        .map((id) => document.getElementById(id))
        .filter((node): node is HTMLElement => Boolean(node));

      let currentId: string | null = elements[0]?.id ?? null;

      for (const element of elements) {
        if (element.getBoundingClientRect().top - offset > 0) break;
        currentId = element.id;
      }

      setActiveId((prevId) => (prevId === currentId ? prevId : currentId));
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(getActiveHTMLElement);
    };

    getActiveHTMLElement();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [offset, ids]);

  return ids.length ? activeId : null;
};
