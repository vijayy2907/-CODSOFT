import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
}

const pageTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-surface-light px-4 py-10 transition-colors duration-300 dark:bg-surface-dark sm:px-6">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-card bg-card-light p-7 shadow-soft transition-colors duration-300 dark:bg-card-dark dark:shadow-soft-dark sm:p-9"
    >
      {children}
    </motion.div>
  );
}
