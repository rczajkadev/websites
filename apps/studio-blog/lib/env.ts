export function getStudioEnv() {
  const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
  const dataset = process.env.SANITY_STUDIO_DATASET;

  if (!projectId) throw new Error('Missing SANITY_STUDIO_PROJECT_ID.');
  if (!dataset) throw new Error('Missing SANITY_STUDIO_DATASET.');

  return { projectId, dataset };
}
