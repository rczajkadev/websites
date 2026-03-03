'use client';

import { useEffect, useRef, useState } from 'react';

type UseHeaderVisibilityOptions = {
  scrollDelta?: number;
  topThreshold?: number;
};

const DEFAULT_SCROLL_DELTA = 16;
const DEFAULT_TOP_THRESHOLD = 36;

export function useHeaderVisibility({
  scrollDelta = DEFAULT_SCROLL_DELTA,
  topThreshold = DEFAULT_TOP_THRESHOLD
}: UseHeaderVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollYRef.current;

        if (Math.abs(delta) >= scrollDelta) {
          const isVisible = currentScrollY <= topThreshold ? true : delta < 0;
          setIsVisible(isVisible);
          lastScrollYRef.current = currentScrollY;
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDelta, topThreshold]);

  return isVisible;
}
