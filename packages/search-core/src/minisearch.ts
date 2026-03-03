import MiniSearch, {
  type AsPlainObject,
  type Options as MiniSearchOptions,
  type SearchOptions
} from 'minisearch';

export type SearchDocument = {
  id: string | number;
};

export type SearchIndexEngineConfig<TDocument extends SearchDocument> = {
  miniSearchOptions: MiniSearchOptions<TDocument>;
  searchOptions?: SearchOptions;
};

const isPlainObject = (value: unknown): value is AsPlainObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export class SearchIndexEngine<TDocument extends SearchDocument> {
  private readonly miniSearchOptions: MiniSearchOptions<TDocument>;
  private readonly searchOptions: SearchOptions | undefined;

  constructor({ miniSearchOptions, searchOptions }: SearchIndexEngineConfig<TDocument>) {
    this.miniSearchOptions = miniSearchOptions;
    this.searchOptions = searchOptions;
  }

  createIndex() {
    return new MiniSearch<TDocument>(this.miniSearchOptions);
  }

  buildIndex(documents: TDocument[]) {
    const index = this.createIndex();
    index.addAll(documents);

    return {
      index,
      documents
    };
  }

  loadFromJson(indexJson: unknown) {
    if (!isPlainObject(indexJson)) {
      throw new Error('Invalid search index JSON payload.');
    }

    return MiniSearch.loadJS(indexJson, this.miniSearchOptions);
  }

  search(
    index: MiniSearch<TDocument>,
    documents: TDocument[],
    query: string,
    options?: SearchOptions
  ) {
    if (!query.trim()) return documents;

    const results = index.search(query, {
      ...this.searchOptions,
      ...options
    });

    const documentById = new Map(documents.map((document) => [String(document.id), document]));

    return results
      .map((result) => documentById.get(String(result.id)))
      .filter((document): document is TDocument => Boolean(document));
  }
}
