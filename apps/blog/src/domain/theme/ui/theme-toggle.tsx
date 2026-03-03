'use client';

import { Moon, Sun } from 'lucide-react';

import { Button } from '@/ui/button';

import { useThemeToggle } from '../hooks';

export function ThemeToggle() {
  const toggleTheme = useThemeToggle();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      <Sun className="size-5 theme-dark" />
      <Moon className="size-5 theme-light" />
    </Button>
  );
}
