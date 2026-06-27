import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/auth/Logo';
import { WelcomeIllustration } from '@/components/auth/WelcomeIllustration';
import { SocialButtons } from '@/components/auth/SocialButtons';
import { Divider } from '@/components/ui/Divider';
import { Button } from '@/components/ui/Button';
import { AuthCard, AuthShell } from '@/components/layout/AuthCard';
import { useToast } from '@/context/ToastContext';
import type { SocialProvider } from '@/types';

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function WelcomePage() {
  const { showToast } = useToast();

  function handleSocial(provider: SocialProvider) {
    showToast(`Connecting with ${provider === 'twitter' ? 'X' : provider}…`, 'info');
  }

  return (
    <AuthShell>
      <AuthCard>
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.07, delayChildren: 0.05 }}
          className="flex flex-col gap-6"
        >
          <motion.div variants={itemVariants}>
            <Logo />
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">
              Welcome
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Please login or sign up to continue using our app.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <WelcomeIllustration />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <p className="text-center text-xs font-medium text-slate-400 dark:text-slate-500">
              Enter via Social Networks
            </p>
            <SocialButtons onSelect={handleSocial} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Divider label="or continue with email" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <Link to="/signup">
              <Button type="button">Sign Up</Button>
            </Link>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded dark:text-primary-300"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </AuthCard>
    </AuthShell>
  );
}
