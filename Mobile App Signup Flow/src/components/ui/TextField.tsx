import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isPassword?: boolean;
  hint?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, isPassword = false, hint, id, type = 'text', className = '', ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const fieldId = id ?? `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${fieldId}-error`;
    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full">
        <label
          htmlFor={fieldId}
          className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={fieldId}
            type={resolvedType}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={`h-13 w-full rounded-field border bg-white px-4 text-[15px] text-slate-800 placeholder:text-slate-400 shadow-field transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-400 dark:bg-card-dark dark:text-slate-100 dark:placeholder:text-slate-500 ${
              error
                ? 'border-rose-400 focus:ring-rose-300'
                : 'border-slate-200 focus:border-primary-400 dark:border-white/10'
            } ${isPassword ? 'pr-12' : ''} ${className}`}
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={0}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-400 hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-field"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          )}
        </div>
        <AnimatePresence>
          {error ? (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-1.5 text-xs font-medium text-rose-500"
            >
              {error}
            </motion.p>
          ) : hint ? (
            <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">{hint}</p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }
);

TextField.displayName = 'TextField';
