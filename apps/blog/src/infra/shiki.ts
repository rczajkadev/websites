import 'server-only';

import { codeToHtml } from 'shiki';

const DEFAULT_LANGUAGE = 'text';

type Theme = 'github-dark' | 'github-light';

const stripTabIndex = (html: string) => html.replace(/tabindex="0"/g, '');

export const highlightCode = async (code: string, theme: Theme, language?: string) => {
  const lang = language?.trim() || DEFAULT_LANGUAGE;

  try {
    return stripTabIndex(
      await codeToHtml(code, {
        lang,
        theme
      })
    );
  } catch {
    return stripTabIndex(
      await codeToHtml(code, {
        lang: DEFAULT_LANGUAGE,
        theme
      })
    );
  }
};
