import type { PostBySlugQueryResult } from './types';

export type PortableTextValue = NonNullable<NonNullable<PostBySlugQueryResult>['body']>;
export type PortableTextBlock = Extract<PortableTextValue[number], { _type: 'block' }>;

export type TocItem = {
  id: string;
  label: string;
  level: 2 | 3;
};

export const getBlockText = (value: PortableTextBlock) =>
  value.children
    ?.map((child) => child.text)
    .join(' ')
    .trim() ?? '';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export const getHeadingId = (value: PortableTextBlock, headingIds?: Record<string, string>) => {
  if (!value._key) return undefined;

  if (headingIds?.[value._key]) return headingIds[value._key];

  const text = getBlockText(value);
  return text ? slugify(text) : undefined;
};

export const buildHeadingData = (blocks: PortableTextValue = []) => {
  const toc: TocItem[] = [];
  const headingIds: Record<string, string> = {};
  const counts: Record<string, number> = {};

  blocks.forEach((block) => {
    if (block._type !== 'block' || (block.style !== 'h2' && block.style !== 'h3')) return;

    const text = getBlockText(block);

    if (!text) return;

    const base = slugify(text);
    counts[base] = (counts[base] ?? 0) + 1;
    const id = counts[base] > 1 ? `${base}-${counts[base]}` : base;

    headingIds[block._key] = id;
    toc.push({ id, label: text, level: block.style === 'h2' ? 2 : 3 });
  });

  return { toc, headingIds };
};

export const estimateReadTime = (blocks: PortableTextValue = []) => {
  const wordsPerMinute = 200;
  const imageSeconds = 12;
  const mathSeconds = 20;
  const codeBaseSeconds = 20;
  const codeWordsPerMinute = 100;

  const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

  const text = blocks
    .filter((block) => block._type === 'block')
    .map((block) => getBlockText(block))
    .join(' ');

  const wordCount = countWords(text);

  const imageCount = blocks.filter((block) => block._type === 'image').length;
  const mathBlocks = blocks.filter((block) => block._type === 'mathBlock');
  const codeBlocks = blocks.filter((block) => block._type === 'codeBlock');

  const mathText = mathBlocks
    .map((block) => ('latex' in block ? String(block.latex ?? '') : ''))
    .join(' ');

  const codeText = codeBlocks
    .map((block) => ('code' in block ? String(block.code ?? '') : ''))
    .join(' ');

  const baseSeconds = (wordCount / wordsPerMinute) * 60;
  const imageExtraSeconds = imageCount * imageSeconds;
  const mathExtraSeconds = mathBlocks.length * mathSeconds;
  const codeExtraSeconds = codeBlocks.length * codeBaseSeconds;
  const codeReadSeconds = (countWords(codeText) / codeWordsPerMinute) * 60;
  const mathReadSeconds = Math.min(countWords(mathText) * 0.5, 30);

  const totalSeconds =
    baseSeconds +
    imageExtraSeconds +
    mathExtraSeconds +
    codeExtraSeconds +
    codeReadSeconds +
    mathReadSeconds;

  return Math.max(1, Math.ceil(totalSeconds / 60));
};
