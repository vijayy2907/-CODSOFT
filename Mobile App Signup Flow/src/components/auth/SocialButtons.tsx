import { motion } from 'framer-motion';
import { FaFacebookF, FaXTwitter, FaGoogle } from 'react-icons/fa6';
import type { SocialProvider } from '@/types';

interface SocialButtonsProps {
  onSelect: (provider: SocialProvider) => void;
  disabled?: boolean;
}

const providers: { id: SocialProvider; label: string; icon: typeof FaFacebookF }[] = [
  { id: 'facebook', label: 'Continue with Facebook', icon: FaFacebookF },
  { id: 'twitter', label: 'Continue with X', icon: FaXTwitter },
  { id: 'google', label: 'Continue with Google', icon: FaGoogle },
];

export function SocialButtons({ onSelect, disabled = false }: SocialButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {providers.map(({ id, label, icon: Icon }) => (
        <motion.button
          key={id}
          type="button"
          aria-label={label}
          title={label}
          disabled={disabled}
          onClick={() => onSelect(id)}
          whileHover={{ y: disabled ? 0 : -2 }}
          whileTap={{ scale: disabled ? 1 : 0.94 }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-600 shadow-field transition-colors duration-150 hover:bg-primary-50 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
        >
          <Icon size={17} />
        </motion.button>
      ))}
    </div>
  );
}
