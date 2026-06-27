import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { FiLoader } from 'react-icons/fi';

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
>;

interface ButtonProps extends NativeButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  className = '',
  ...rest
}: ButtonProps) {
  const base =
    'relative w-full h-13 inline-flex items-center justify-center gap-2 rounded-field font-semibold text-[15px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-60';

  const variants: Record<string, string> = {
    primary:
      'bg-primary-500 text-white shadow-soft hover:bg-primary-600 dark:focus-visible:ring-offset-card-dark',
    ghost:
      'bg-transparent text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-white/5',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <FiLoader className="h-5 w-5 animate-spin" aria-hidden="true" />
          <span>Please wait…</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
