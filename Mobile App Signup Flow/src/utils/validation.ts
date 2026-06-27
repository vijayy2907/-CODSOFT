import type { FormErrors, LoginFormData, PasswordStrength, SignUpFormData } from '@/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function getPasswordStrength(password: string): { strength: PasswordStrength; score: number } {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { strength: 'weak', score };
  if (score <= 2) return { strength: 'fair', score };
  if (score <= 3) return { strength: 'good', score };
  return { strength: 'strong', score };
}

export function validateSignUp(data: SignUpFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Enter your full name.';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Name looks too short.';
  }

  if (!data.email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!data.password) {
    errors.password = 'Create a password.';
  } else if (data.password.length < 8) {
    errors.password = 'Password needs at least 8 characters.';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords don\u2019t match.';
  }

  if (!data.agreeToTerms) {
    errors.agreeToTerms = 'Accept the terms to continue.';
  }

  return errors;
}

export function validateLogin(data: LoginFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!data.password) {
    errors.password = 'Enter your password.';
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((value) => Boolean(value));
}
