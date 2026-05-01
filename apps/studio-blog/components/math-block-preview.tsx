import katex from 'katex';
import { useMemo } from 'react';
import type { PreviewProps } from 'sanity';
import styled from 'styled-components';

import { getPreviewString } from '../lib/preview';
import { PreviewEmpty, PreviewHeader, PreviewSeparator } from './styled';

const Content = styled.div<{ $displayMode: boolean }>`
  margin: 0;
  padding: ${({ $displayMode }) => ($displayMode ? '0' : '6px 12px')};
  overflow-x: auto;
`;

export const MathBlockPreview = (props: PreviewProps) => {
  const { subtitle, description, renderDefault } = props;

  const mode = getPreviewString(description) === 'inline' ? 'inline' : 'block';
  const latex = getPreviewString(subtitle);
  const displayMode = mode === 'block';

  const renderedLatex = useMemo(() => {
    if (!latex) return null;

    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false
    });
  }, [displayMode, latex]);

  const header = (
    <PreviewHeader>
      <span>Math Formula</span>
      <PreviewSeparator>|</PreviewSeparator>
      <span>{mode === 'block' ? 'Block' : 'Inline'}</span>
    </PreviewHeader>
  );

  const content = renderedLatex ? (
    <Content $displayMode={displayMode} dangerouslySetInnerHTML={{ __html: renderedLatex }} />
  ) : (
    <PreviewEmpty>No formula</PreviewEmpty>
  );

  return renderDefault({
    ...props,
    title: header,
    subtitle: undefined,
    description: undefined,
    children: content
  });
};
