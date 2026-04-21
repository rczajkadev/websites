'use client';

import { Moon, Sun } from 'lucide-react';

import { useThemeToggle } from '@/domain/theme/hooks';

import { HeaderIconButton } from './header-button';

export function ThemeToggle() {
  const toggleTheme = useThemeToggle();

  return (
    <HeaderIconButton onClick={toggleTheme} aria-label="Toggle color theme">
      <Sun className="size-5 theme-dark" />
      <Moon className="size-5 theme-light" />
    </HeaderIconButton>
  );
}
