import 'server-only';

import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const readPublicFile = async (fileName: string) => {
  const filePath = path.join(process.cwd(), 'public', fileName);

  try {
    return await readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
};
