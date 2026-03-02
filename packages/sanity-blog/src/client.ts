import { createClient, type QueryParams } from '@sanity/client';

import { apiVersion, dataset, projectId } from './env';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production'
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {}
}: {
  query: string;
  params?: QueryParams;
}): Promise<QueryResponse> {
  return sanityClient.fetch(query, params);
}
