import type { PreviewProps } from 'sanity';
import styled from 'styled-components';

import { asString } from '../lib/utils';
import { PreviewEmpty, PreviewHeader } from './styled';

const Pre = styled.pre`
  margin: 0;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 1.6;
  overflow-x: auto;
`;

export const CodeBlockPreview = (props: PreviewProps) => {
  const { title, description, renderDefault } = props;

  const language = asString(title);
  const code = asString(description);

  const header = (
    <PreviewHeader>
      <span>{language ?? 'No language'}</span>
    </PreviewHeader>
  );

  const content = code ? (
    <Pre>
      <code>{code}</code>
    </Pre>
  ) : (
    <PreviewEmpty>No code</PreviewEmpty>
  );

  return renderDefault({
    ...props,
    title: header,
    subtitle: undefined,
    description: undefined,
    children: content
  });
};
