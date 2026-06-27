interface DividerProps {
  label: string;
}

export function Divider({ label }: DividerProps) {
  return (
    <div className="flex items-center gap-3" role="separator" aria-label={label}>
      <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
      <span className="whitespace-nowrap text-xs font-medium text-slate-400 dark:text-slate-500">
        {label}
      </span>
      <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
    </div>
  );
}
