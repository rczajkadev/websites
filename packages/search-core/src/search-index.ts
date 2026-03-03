export type SearchIndexPayload<TDocument> = {
  index?: unknown;
  documents?: TDocument[];
};

export type ParsedSearchIndex<TDocument> = {
  documents: TDocument[];
  indexJson: unknown | null;
};

export const parseSearchIndexPayload = <TDocument>(
  rawIndex?: string | null
): ParsedSearchIndex<TDocument> => {
  if (!rawIndex) {
    return {
      documents: [],
      indexJson: null
    };
  }

  try {
    const payload = JSON.parse(rawIndex) as SearchIndexPayload<TDocument>;

    return {
      documents: payload.documents ?? [],
      indexJson: payload.index ?? null
    };
  } catch {
    return {
      documents: [],
      indexJson: null
    };
  }
};
