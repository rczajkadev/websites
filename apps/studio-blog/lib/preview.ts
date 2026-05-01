import type { ComponentType, ReactNode } from 'react';
import type { PreviewLayoutKey } from 'sanity';

type PreviewValue = ReactNode | ComponentType<{ layout: PreviewLayoutKey }>;

export const getPreviewString = (value: PreviewValue) =>
  typeof value === 'string' ? value : undefined;
