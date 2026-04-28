import katex from 'katex';

type MathBlockValue = {
  latex?: string;
  displayMode?: boolean;
};

export function MathBlock({ value }: { value: MathBlockValue }) {
  const { latex, displayMode } = value;

  if (!latex) return null;

  const html = katex.renderToString(latex, {
    displayMode: displayMode ?? true,
    throwOnError: false
  });

  return <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />;
}
