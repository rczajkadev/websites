export const projectId = process.env.SANITY_PROJECT_ID;
export const dataset = process.env.SANITY_DATASET;
export const apiVersion = process.env.SANITY_API_VERSION || '2026-01-12';

if (!projectId || !dataset) {
  throw new Error('Missing SANITY_PROJECT_ID or SANITY_DATASET.');
}
