import { FormEvent, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/auth/Logo';
import { SocialButtons } from '@/components/auth/SocialButtons';
import { Divider } from '@/components/ui/Divider';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Checkbox } from '@/components/ui/Checkbox';
import { StrengthMeter } from '@/components/ui/StrengthMeter';
import { AuthCard, AuthShell } from '@/components/layout/AuthCard';
import { useToast } from '@/context/ToastContext';
import { getPasswordStrength, hasErrors, validateSignUp } from '@/utils/validation';
import type { FormErrors, SignUpFormData, SocialProvider } from '@/types';

const initialData: SignUpFormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [data, setData] = useState<SignUpFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { strength, score } = useMemo(() => getPasswordStrength(data.password), [data.password]);

  function setField<K extends keyof SignUpFormData>(key: K, value: SignUpFormData[K]) {
    setData((prev) => {
      const next = { ...prev, [key]: value };
      if (touched[key as string]) {
        setErrors(validateSignUp(next));
      }
      return next;
    });
  }

  function handleBlur(key: keyof SignUpFormData) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validateSignUp(data));
  }

  function handleSocial(provider: SocialProvider) {
    showToast(`Connecting with ${provider === 'twitter' ? 'X' : provider}…`, 'info');
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const validationErrors = validateSignUp(data);
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeToTerms: true,
    });

    if (hasErrors(validationErrors)) {
      showToast('Please fix the highlighted fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setIsSubmitting(false);

    showToast('Account created successfully!', 'success');
    navigate('/login');
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
            <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-white">Sign Up</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Please register with email and sign up to continue using our app.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-center text-xs font-medium text-slate-400 dark:text-slate-500">
              Enter via Social Networks
            </p>
            <SocialButtons onSelect={handleSocial} disabled={isSubmitting} />
          </div>

          <Divider label="or register with email" />

          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Full Name"
              placeholder="John Doe"
              autoComplete="name"
              value={data.fullName}
              onChange={(e) => setField('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              error={touched.fullName ? errors.fullName : undefined}
              disabled={isSubmitting}
            />

            <TextField
              label="Email Address"
              type="email"
              placeholder="jhon.doe@gmail.com"
              autoComplete="email"
              value={data.email}
              onChange={(e) => setField('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              error={touched.email ? errors.email : undefined}
              disabled={isSubmitting}
            />

            <div>
              <TextField
                label="Password"
                isPassword
                placeholder="Create a password"
                autoComplete="new-password"
                value={data.password}
                onChange={(e) => setField('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                error={touched.password ? errors.password : undefined}
                disabled={isSubmitting}
              />
              <StrengthMeter password={data.password} strength={strength} score={score} />
            </div>

            <TextField
              label="Confirm Password"
              isPassword
              placeholder="Re-enter your password"
              autoComplete="new-password"
              value={data.confirmPassword}
              onChange={(e) => setField('confirmPassword', e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
              disabled={isSubmitting}
            />

            <Checkbox
              label={
                <>
                  I agree with{' '}
                  <span className="font-semibold text-primary-600 dark:text-primary-300">
                    Terms &amp; Privacy Policy
                  </span>
                </>
              }
              checked={data.agreeToTerms}
              onChange={(e) => setField('agreeToTerms', e.target.checked)}
              onBlur={() => handleBlur('agreeToTerms')}
              error={touched.agreeToTerms ? errors.agreeToTerms : undefined}
              disabled={isSubmitting}
            />

            <Button type="submit" isLoading={isSubmitting} className="mt-1">
              Create Account
            </Button>
          </form>

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
      </AuthCard>
    </AuthShell>
  );
}
