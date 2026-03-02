import 'dotenv/config';

import { defineCliConfig } from 'sanity/cli';

const TYPEGEN_PATH = '../../packages/sanity-blog';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
    dataset: process.env.SANITY_STUDIO_DATASET ?? ''
  },
  typegen: {
    path: `${TYPEGEN_PATH}/src/**/*.{ts,tsx,js,jsx}`,
    schema: './extract.json',
    generates: `${TYPEGEN_PATH}/src/types.ts`
  }
});
