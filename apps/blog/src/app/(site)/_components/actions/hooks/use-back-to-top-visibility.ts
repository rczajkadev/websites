'use client';

import { useEffect, useState } from 'react';

type UseBackToTopVisibilityOptions = {
  threshold?: number;
};

export function useBackToTopVisibility({ threshold = 200 }: UseBackToTopVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return isVisible;
}
