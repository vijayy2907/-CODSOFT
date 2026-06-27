import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/auth/Logo';
import { SocialButtons } from '@/components/auth/SocialButtons';
import { Divider } from '@/components/ui/Divider';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Checkbox } from '@/components/ui/Checkbox';
import { AuthCard, AuthShell } from '@/components/layout/AuthCard';
import { useToast } from '@/context/ToastContext';
import { hasErrors, validateLogin } from '@/utils/validation';
import { getRememberedEmail, saveRememberedEmail } from '@/utils/storage';
import type { FormErrors, LoginFormData, SocialProvider } from '@/types';

const initialData: LoginFormData = {
  email: '',
  password: '',
  rememberMe: false,
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [data, setData] = useState<LoginFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const remembered = getRememberedEmail();
    if (remembered?.rememberMe) {
      setData((prev) => ({ ...prev, email: remembered.email, rememberMe: true }));
    }
  }, []);

  function setField<K extends keyof LoginFormData>(key: K, value: LoginFormData[K]) {
    setData((prev) => {
      const next = { ...prev, [key]: value };
      if (touched[key as string]) {
        setErrors(validateLogin(next));
      }
      return next;
    });
  }

  function handleBlur(key: keyof LoginFormData) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validateLogin(data));
  }

  function handleSocial(provider: SocialProvider) {
    showToast(`Connecting with ${provider === 'twitter' ? 'X' : provider}…`, 'info');
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const validationErrors = validateLogin(data);
    setErrors(validationErrors);
    setTouched({ email: true, password: true });

    if (hasErrors(validationErrors)) {
      showToast('Please fix the highlighted fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);

    saveRememberedEmail({ email: data.email, rememberMe: data.rememberMe });
    showToast('Welcome back!', 'success');
    navigate('/welcome');
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
            <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Login Now</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Please login to continue using our app.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-center text-xs font-medium text-slate-400 dark:text-slate-500">
              Enter via Social Networks
            </p>
            <SocialButtons onSelect={handleSocial} disabled={isSubmitting} />
          </div>

          <Divider label="or login with email" />

          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email"
              type="email"
              placeholder="jhon.doe@gmail.com"
              autoComplete="email"
              value={data.email}
              onChange={(e) => setField('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              error={touched.email ? errors.email : undefined}
              disabled={isSubmitting}
            />

            <TextField
              label="Password"
              isPassword
              placeholder="Enter your password"
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => setField('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              error={touched.password ? errors.password : undefined}
              disabled={isSubmitting}
            />

            <div className="flex items-center justify-between">
              <Checkbox
                label="Remember Me"
                checked={data.rememberMe}
                onChange={(e) => setField('rememberMe', e.target.checked)}
                disabled={isSubmitting}
              />
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded dark:text-primary-300"
              >
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" isLoading={isSubmitting} className="mt-1">
              Login
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded dark:text-primary-300"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </AuthCard>
    </AuthShell>
  );
}
