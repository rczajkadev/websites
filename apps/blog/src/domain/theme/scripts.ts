import { DEFAULT_THEME, THEME_STORAGE_KEY } from './constants';

export const themeInitScript = `
(() => {
  const root = document.documentElement;

  try {
    const theme = localStorage.getItem('${THEME_STORAGE_KEY}');
    const nextTheme = theme === 'light' ? 'light' : '${DEFAULT_THEME}';

    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
  } catch {
    root.dataset.theme = '${DEFAULT_THEME}';
    root.style.colorScheme = '${DEFAULT_THEME}';
  }
})();
`;
