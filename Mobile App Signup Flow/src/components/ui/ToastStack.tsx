import { AnimatePresence, motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import type { Toast } from '@/types';

interface ToastStackProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const icons = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  info: FiInfo,
};

const styles = {
  success: 'bg-emerald-500 text-white',
  error: 'bg-rose-500 text-white',
  info: 'bg-primary-500 text-white',
};

export function ToastStack({ toasts, onDismiss }: ToastStackProps) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4 sm:top-6"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.variant];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              role="status"
              className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl px-4 py-3 shadow-soft ${styles[toast.variant]}`}
            >
              <Icon size={18} className="flex-shrink-0" />
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                aria-label="Dismiss notification"
                className="flex-shrink-0 rounded-full p-1 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <FiX size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
