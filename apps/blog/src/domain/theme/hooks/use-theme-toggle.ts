'use client';

import { useCallback } from 'react';

import { DEFAULT_THEME, Theme, THEME_STORAGE_KEY } from '../config';

function applyThemeToRoot(theme: Theme, root: HTMLElement = document.documentElement) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function getCurrentTheme(root: HTMLElement = document.documentElement): Theme {
  return root.dataset.theme === 'light' ? 'light' : DEFAULT_THEME;
}

function getToggledTheme(current: Theme): Theme {
  return current === 'light' ? 'dark' : 'light';
}

function persistTheme(theme: Theme, storageKey: string = THEME_STORAGE_KEY) {
  window.localStorage.setItem(storageKey, theme);
}

export function useThemeToggle() {
  const toggleTheme = useCallback(() => {
    const currentTheme = getCurrentTheme();
    const nextTheme = getToggledTheme(currentTheme);

    applyThemeToRoot(nextTheme);
    persistTheme(nextTheme);
  }, []);

  return toggleTheme;
}
