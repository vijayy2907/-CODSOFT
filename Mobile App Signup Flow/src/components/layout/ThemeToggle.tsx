import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-600 shadow-soft transition-colors duration-150 hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:bg-card-dark dark:text-slate-200 sm:right-6 sm:top-6"
    >
      {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </motion.button>
  );
}
