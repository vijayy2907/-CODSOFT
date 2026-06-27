import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Logo } from '@/components/auth/Logo';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { AuthCard, AuthShell } from '@/components/layout/AuthCard';
import { useToast } from '@/context/ToastContext';
import { isValidEmail } from '@/utils/validation';

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!email.trim()) {
      setError('Enter your email address.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError(undefined);

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSent(true);
    showToast('Reset link sent to your email.', 'success');
  }

  return (
    <AuthShell>
      <AuthCard>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }}
          className="flex flex-col gap-5"
        >
          <Logo />

          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">
              Reset Password
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Enter the email linked to your account and we&apos;ll send a reset link.
            </p>
          </div>

          {sent ? (
            <div className="flex flex-col items-center gap-3 py-2 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-500 dark:bg-white/5">
                <FiMail size={24} />
              </span>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Check <span className="font-semibold text-slate-700 dark:text-slate-200">{email}</span>{' '}
                for a link to reset your password.
              </p>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
              <TextField
                label="Email Address"
                type="email"
                placeholder="jhon.doe@gmail.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                disabled={isSubmitting}
              />
              <Button type="submit" isLoading={isSubmitting}>
                Send Reset Link
              </Button>
            </form>
          )}

          <Link
            to="/login"
            className="flex items-center justify-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded dark:text-primary-300"
          >
            <FiArrowLeft size={15} />
            Back to Login
          </Link>
        </motion.div>
      </AuthCard>
    </AuthShell>
  );
}
