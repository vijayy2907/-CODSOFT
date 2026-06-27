import { InputHTMLAttributes, ReactNode } from 'react';
import { FiCheck } from 'react-icons/fi';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  error?: string;
}

export function Checkbox({ label, error, id, checked, className = '', ...rest }: CheckboxProps) {
  const fieldId = id ?? `checkbox-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className={className}>
      <label htmlFor={fieldId} className="flex cursor-pointer items-start gap-2.5 select-none">
        <span className="relative mt-0.5 flex-shrink-0">
          <input id={fieldId} type="checkbox" checked={checked} className="peer sr-only" {...rest} />
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors duration-150 ${
              checked
                ? 'border-primary-500 bg-primary-500'
                : 'border-slate-300 bg-white dark:border-white/20 dark:bg-card-dark'
            } peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400 peer-focus-visible:ring-offset-1`}
          >
            {checked && <FiCheck size={13} className="text-white" strokeWidth={3} />}
          </span>
        </span>
        <span className="text-sm leading-5 text-slate-600 dark:text-slate-300">{label}</span>
      </label>
      {error && <p className="mt-1 text-xs font-medium text-rose-500">{error}</p>}
    </div>
  );
}
