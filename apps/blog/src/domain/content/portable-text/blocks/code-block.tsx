import { highlightCode } from '@/infra/shiki';
import { cn } from '@/utils/cn';

import { CopyContentButton } from '../../components';

type CodeBlockValue = {
  language?: string;
  code?: string;
};

type CodeBlockContentProps = {
  code: string;
  className?: string;
};

const CodeBlockContent = ({ code, className }: CodeBlockContentProps) => (
  <div
    className={cn('[&>pre]:overflow-x-auto [&>pre]:p-4 [&>pre]:text-sm', className)}
    dangerouslySetInnerHTML={{ __html: code }}
  />
);

export async function CodeBlock({ value }: { value: CodeBlockValue }) {
  const { code: codeString, language } = value;

  if (!codeString) return null;

  const lightThemeHtml = await highlightCode(codeString, 'github-light', language);
  const darkThemeHtml = await highlightCode(codeString, 'github-dark', language);

  return (
    <div className="relative group my-6 overflow-hidden border rounded-md">
      <CopyContentButton className="absolute right-1 top-1" content={codeString} />
      <CodeBlockContent className="theme-light" code={lightThemeHtml} />
      <CodeBlockContent className="theme-dark" code={darkThemeHtml} />
    </div>
  );
}
