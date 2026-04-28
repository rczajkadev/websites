import {
  PortableText,
  PortableTextComponentProps,
  type PortableTextComponents
} from '@portabletext/react';
import { type PortableTextBlock, type PortableTextValue } from '@websites/sanity-blog/content';

import {
  BulletList,
  Code,
  CodeBlock,
  Heading,
  Image,
  Link,
  ListItem,
  MathBlock,
  NumberList,
  Text
} from './blocks';

const buildHeadingProps = (
  { children, value }: PortableTextComponentProps<object>,
  headingIds?: Record<string, string>
) => ({
  children,
  headingIds,
  value: value as PortableTextBlock
});

const buildPortableTextComponents = (headingIds?: Record<string, string>) =>
  ({
    block: {
      h1: (props) => <Heading {...buildHeadingProps(props, headingIds)} />,
      h2: (props) => <Heading {...buildHeadingProps(props, headingIds)} />,
      h3: (props) => <Heading {...buildHeadingProps(props, headingIds)} />,
      h4: (props) => <Heading {...buildHeadingProps(props, headingIds)} />,
      h5: (props) => <Heading {...buildHeadingProps(props, headingIds)} />,
      h6: (props) => <Heading {...buildHeadingProps(props, headingIds)} />,
      normal: (props) => <Text {...props} />
    },
    list: {
      bullet: (props) => <BulletList {...props} />,
      number: (props) => <NumberList {...props} />
    },
    listItem: {
      bullet: (props) => <ListItem {...props} />,
      number: (props) => <ListItem {...props} />
    },
    marks: {
      code: Code,
      link: Link
    },
    types: {
      image: Image,
      mathBlock: MathBlock,
      codeBlock: CodeBlock
    }
  }) satisfies PortableTextComponents;

export const PortableTextRenderer = ({
  value,
  headingIds
}: {
  value: PortableTextValue;
  headingIds?: Record<string, string>;
}) => <PortableText value={value} components={buildPortableTextComponents(headingIds)} />;
