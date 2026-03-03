export type ParsedQuery<TKey extends string = string> = {
  text: string;
  include: Record<TKey, string[]>;
  exclude: Record<TKey, string[]>;
};

export type QueryParserConfig<TKey extends string = string> = {
  qualifiers: Record<string, TKey>;
  negationPrefix?: string;
  separator?: string;
  normalize?: (value: string) => string;
};

type ParserRuntimeConfig<TKey extends string> = {
  qualifiers: Record<string, TKey>;
  negationPrefix: string;
  separator: string;
  normalize: (value: string) => string;
};

type ParsedToken<TKey extends string> = {
  field: TKey;
  value: string;
  negative: boolean;
};

const normalize = (value: string) => value.trim().toLowerCase();

const createQualifiersBucket = <TKey extends string>(keys: TKey[]): Record<TKey, string[]> =>
  keys.reduce(
    (acc, key) => {
      acc[key] = [];
      return acc;
    },
    {} as Record<TKey, string[]>
  );

const createRuntimeConfig = <TKey extends string>(config: QueryParserConfig<TKey>) => ({
  qualifiers: config.qualifiers,
  negationPrefix: config.negationPrefix ?? '-',
  separator: config.separator ?? ':',
  normalize: config.normalize ?? normalize
});

const tokenize = (query: string): string[] =>
  query
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

const parseQualifiedToken = <TKey extends string>(
  token: string,
  runtimeConfig: ParserRuntimeConfig<TKey>
): ParsedToken<TKey> | null => {
  const negative = token.startsWith(runtimeConfig.negationPrefix);
  const rawToken = negative ? token.slice(runtimeConfig.negationPrefix.length) : token;
  const separatorIndex = rawToken.indexOf(runtimeConfig.separator);

  if (separatorIndex <= 0) return null;

  const qualifier = rawToken.slice(0, separatorIndex);
  const field = runtimeConfig.qualifiers[qualifier];

  if (!field) return null;

  const value = runtimeConfig.normalize(
    rawToken.slice(separatorIndex + runtimeConfig.separator.length)
  );

  return value ? { field, value, negative } : null;
};

export const parseQuery = <TKey extends string>(
  query: string,
  config: QueryParserConfig<TKey>
): ParsedQuery<TKey> => {
  const runtimeConfig = createRuntimeConfig(config);
  const qualifierKeys = Array.from(new Set(Object.values(config.qualifiers)));
  const include = createQualifiersBucket(qualifierKeys);
  const exclude = createQualifiersBucket(qualifierKeys);
  const textParts: string[] = [];

  for (const token of tokenize(query)) {
    const parsedToken = parseQualifiedToken(token, runtimeConfig);

    if (!parsedToken) {
      textParts.push(token);
      continue;
    }

    const bucket = parsedToken.negative ? exclude : include;
    bucket[parsedToken.field].push(parsedToken.value);
  }

  return {
    text: textParts.join(' '),
    include,
    exclude
  };
};
