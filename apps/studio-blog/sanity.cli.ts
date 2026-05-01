import 'dotenv/config';

import { defineCliConfig } from 'sanity/cli';

import { getStudioEnv } from './lib/env';

const TYPEGEN_PATH = '../../packages/sanity-blog';
const { projectId, dataset } = getStudioEnv();

export default defineCliConfig({
  api: {
    projectId,
    dataset
  },
  typegen: {
    path: `${TYPEGEN_PATH}/src/**/*.{ts,tsx,js,jsx}`,
    schema: './extract.json',
    generates: `${TYPEGEN_PATH}/src/types.ts`
  }
});
