import NextLink from 'next/link';

type Props = { children: React.ReactNode; value?: { href?: string } };

export function Link({ children, value }: Props) {
  const href = value?.href;

  if (!href) {
    return <span className="text-foreground/90">{children}</span>;
  }

  const isExternal = /^https?:\/\//.test(href);

  const sharedProps = {
    href,
    className: 'text-primary hover:underline underline-offset-2'
  };

  if (!isExternal) {
    return <NextLink {...sharedProps}>{children}</NextLink>;
  }

  return (
    <a {...sharedProps} rel="noreferrer noopener" target="_blank">
      {children}
    </a>
  );
}
