import katex from 'katex';
import { useMemo } from 'react';
import type { PreviewProps } from 'sanity';
import styled from 'styled-components';

import { asString } from '../lib/utils';
import { PreviewEmpty, PreviewHeader } from './styled';

const Content = styled.div<{ fancy: boolean }>`
  margin: 0;
  padding: ${({ fancy }) => (fancy ? '0' : '6px 12px')};
  overflow-x: auto;
`;

export const MathBlockPreview = (props: PreviewProps) => {
  const { title, subtitle, renderDefault } = props;

  const displayMode = asString(title) === 'true';
  const latex = asString(subtitle);

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
      <span style={{ opacity: '0.2' }}>|</span>
      <span>{displayMode ? 'Block' : 'Inline'}</span>
    </PreviewHeader>
  );

  const content = renderedLatex ? (
    <Content fancy={displayMode} dangerouslySetInnerHTML={{ __html: renderedLatex }} />
  ) : (
    <PreviewEmpty>No formula</PreviewEmpty>
  );

  return renderDefault({
    ...props,
    title: header,
    subtitle: undefined,
    children: content
  });
};
