import { InlineCode as Code } from '@/ui/inline-code';

export function SearchHelp() {
  return (
    <div className="border-t px-3 py-2 text-xs text-muted-foreground">
      Use <Code size="sm">tag:</Code> and <Code size="sm">cat:</Code> for advanced filtering (with{' '}
      <Code size="sm">-</Code> for exclusion).
    </div>
  );
}
