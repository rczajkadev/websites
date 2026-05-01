import { config } from '@websites/eslint-config/reactjs';

export default [
  ...config,
  {
    ignores: ['.sanity/**', '.turbo/**', '.vercel/**', 'dist/**']
  }
];
