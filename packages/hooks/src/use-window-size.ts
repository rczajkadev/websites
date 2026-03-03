'use client';

import { useEffect, useState } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

const getWindowSize = (): WindowSize => ({
  width: window.innerWidth,
  height: window.innerHeight
});

const isWindowDefined = () => typeof window !== 'undefined';

export const useWindowSize = () => {
  const [size, setSize] = useState<WindowSize>(() =>
    isWindowDefined() ? getWindowSize() : { width: 0, height: 0 }
  );

  useEffect(() => {
    if (!isWindowDefined()) return;

    const handleResize = () => setSize(getWindowSize());

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return size;
};
