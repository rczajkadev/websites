import { ComponentType, ReactNode } from 'react';
import { PreviewLayoutKey } from 'sanity';

export const asString = (value: ReactNode | ComponentType<{ layout: PreviewLayoutKey }>) =>
  typeof value === 'string' ? value : undefined;
