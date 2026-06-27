import { motion } from 'framer-motion';
import type { PasswordStrength } from '@/types';

interface StrengthMeterProps {
  password: string;
  strength: PasswordStrength;
  score: number;
}

const config: Record<PasswordStrength, { label: string; color: string }> = {
  weak: { label: 'Weak', color: 'bg-rose-400' },
  fair: { label: 'Fair', color: 'bg-amber-400' },
  good: { label: 'Good', color: 'bg-sky-400' },
  strong: { label: 'Strong', color: 'bg-emerald-500' },
};

export function StrengthMeter({ password, strength, score }: StrengthMeterProps) {
  if (!password) return null;

  const { label, color } = config[strength];
  const filled = Math.min(score, 5);

  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-150 dark:bg-white/10">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: index < filled ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ originX: 0 }}
              className={`block h-full ${color}`}
            />
          </span>
        ))}
      </div>
      <p className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">
        Password strength: <span className="text-slate-600 dark:text-slate-300">{label}</span>
      </p>
    </div>
  );
}
