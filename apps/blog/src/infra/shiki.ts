import 'server-only';

import { codeToHtml } from 'shiki';

const DEFAULT_LANGUAGE = 'text';

type Theme = 'github-dark' | 'github-light';

export const highlightCode = async (code: string, theme: Theme, language?: string) => {
  const lang = language?.trim() || DEFAULT_LANGUAGE;
  let html: string = '';

  try {
    html = await codeToHtml(code, {
      lang,
      theme
    });
  } catch {
    html = await codeToHtml(code, {
      lang: DEFAULT_LANGUAGE,
      theme
    });
  }

  return html.replace(/tabindex="0"/g, '');
};
